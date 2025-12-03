import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CreateOrderRequest {
  amount: number;
  currency: string;
  orderId: string;
  orderNumber: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { amount, currency, orderId, orderNumber }: CreateOrderRequest = await req.json();

    const keyId = Deno.env.get('RAZORPAY_KEY_ID');
    const keySecret = Deno.env.get('RAZORPAY_KEY_SECRET');

    if (!keyId || !keySecret) {
      console.error('Razorpay credentials not found');
      throw new Error('Payment configuration error');
    }

    console.log('Creating Razorpay order:', { amount, currency, orderId, orderNumber });

    const auth = btoa(`${keyId}:${keySecret}`);
    
    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`,
      },
      body: JSON.stringify({
        amount: Math.round(amount),
        currency: currency,
        receipt: orderNumber,
        notes: {
          order_id: orderId,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Razorpay API error:', errorData);
      throw new Error('Failed to create Razorpay order');
    }

    const razorpayOrder = await response.json();
    console.log('Razorpay order created:', razorpayOrder.id);

    return new Response(
      JSON.stringify({
        razorpayOrderId: razorpayOrder.id,
        keyId: keyId,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
} catch (error: unknown) {
    console.error('Error creating Razorpay order:', error);
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
