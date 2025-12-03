import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface VerifyPaymentRequest {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  orderId: string;
  userEmail: string;
  courses: { title: string; slug: string }[];
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      orderId,
      userEmail,
      courses
    }: VerifyPaymentRequest = await req.json();

    const keySecret = Deno.env.get('RAZORPAY_KEY_SECRET');
    const resendApiKey = Deno.env.get('RESEND_API_KEY');

    if (!keySecret) {
      throw new Error('Payment configuration error');
    }

    // Verify signature
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(keySecret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    
    const data = encoder.encode(`${razorpay_order_id}|${razorpay_payment_id}`);
    const signature = await crypto.subtle.sign('HMAC', key, data);
    const expectedSignature = Array.from(new Uint8Array(signature))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    if (expectedSignature !== razorpay_signature) {
      console.error('Invalid payment signature');
      throw new Error('Invalid payment signature');
    }

    console.log('Payment signature verified successfully');

    // Initialize Supabase client with service role
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Update order status
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .update({
        payment_status: 'completed',
        razorpay_order_id: razorpay_order_id,
        razorpay_payment_id: razorpay_payment_id,
      })
      .eq('id', orderId)
      .select()
      .single();

    if (orderError) {
      console.error('Error updating order:', orderError);
      throw orderError;
    }

    // Create course enrollments
    for (const course of courses) {
      const { error: enrollError } = await supabase
        .from('course_enrollments')
        .insert({
          user_id: order.user_id,
          course_id: course.slug,
          course_slug: course.slug,
          course_title: course.title,
          payment_status: 'completed',
        });

      if (enrollError && enrollError.code !== '23505') {
        console.error('Error creating enrollment:', enrollError);
      }
    }

    console.log('Course enrollments created');

    // Send confirmation email
    if (resendApiKey && userEmail) {
      try {
        const resend = new Resend(resendApiKey);
        
        const coursesList = courses.map(c => `<li style="padding: 8px 0;">${c.title}</li>`).join('');
        
        await resend.emails.send({
          from: 'LearnSkills India <onboarding@resend.dev>',
          to: [userEmail],
          subject: `Order Confirmed - ${order.order_number}`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #0d9488, #0f766e); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f9fafb; padding: 30px; }
                .order-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
                .courses-list { list-style: none; padding: 0; }
                .courses-list li { background: #f0fdfa; padding: 12px 16px; margin: 8px 0; border-radius: 6px; border-left: 4px solid #0d9488; }
                .total { font-size: 24px; font-weight: bold; color: #0d9488; }
                .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
                .button { display: inline-block; background: #0d9488; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; margin-top: 20px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1 style="margin: 0;">🎉 Order Confirmed!</h1>
                  <p style="margin: 10px 0 0;">Thank you for your purchase</p>
                </div>
                <div class="content">
                  <div class="order-details">
                    <h2 style="margin-top: 0;">Order Details</h2>
                    <p><strong>Order Number:</strong> ${order.order_number}</p>
                    <p><strong>Date:</strong> ${new Date().toLocaleDateString('en-IN', { dateStyle: 'long' })}</p>
                    
                    <h3>Courses Purchased:</h3>
                    <ul class="courses-list">
                      ${coursesList}
                    </ul>
                    
                    <p class="total">Total Paid: ₹${Number(order.total).toLocaleString()}</p>
                  </div>
                  
                  <p>You can now access your courses from your profile dashboard.</p>
                  
                  <center>
                    <a href="${Deno.env.get('SITE_URL') || 'https://lovable.dev'}/profile" class="button">
                      Go to My Courses
                    </a>
                  </center>
                </div>
                <div class="footer">
                  <p>If you have any questions, please contact our support team.</p>
                  <p>© ${new Date().getFullYear()} LearnSkills India. All rights reserved.</p>
                </div>
              </div>
            </body>
            </html>
          `,
        });

        console.log('Confirmation email sent to:', userEmail);
      } catch (emailError) {
        console.error('Error sending email:', emailError);
        // Don't throw - payment is already verified
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Payment verified and enrollment completed' }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
} catch (error: unknown) {
    console.error('Error verifying payment:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
