import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ShoppingCart, Trash2, Tag, CreditCard, Check, Sparkles, ArrowRight } from "lucide-react";

interface Coupon {
  code: string;
  discount_percent: number;
}

const Checkout = () => {
  const { items, removeFromCart, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  const discount = 0; // Base discount (can be used for special offers)
  const couponDiscount = appliedCoupon ? (subtotal * appliedCoupon.discount_percent) / 100 : 0;
  const total = subtotal - discount - couponDiscount;

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    
    setIsApplyingCoupon(true);
    try {
      const { data, error } = await supabase
        .from('coupons')
        .select('code, discount_percent')
        .eq('code', couponCode.toUpperCase())
        .eq('is_active', true)
        .maybeSingle();

      if (error) throw error;
      
      if (data) {
        setAppliedCoupon(data);
        toast({
          title: "Coupon Applied!",
          description: `${data.discount_percent}% discount applied`,
        });
      } else {
        toast({
          title: "Invalid Coupon",
          description: "This coupon code is not valid or has expired",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error applying coupon:', error);
      toast({
        title: "Error",
        description: "Failed to apply coupon",
        variant: "destructive",
      });
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
  };

  const handleProceedToPay = async () => {
    if (items.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Please add courses to your cart before checkout",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      // Generate order number
      const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      
      // Create order in database
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user!.id,
          order_number: orderNumber,
          subtotal: subtotal,
          discount: discount,
          coupon_code: appliedCoupon?.code || null,
          coupon_discount: couponDiscount,
          total: total,
          payment_status: 'pending',
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = items.map(item => ({
        order_id: order.id,
        course_id: item.course_id,
        course_title: item.course_title,
        course_slug: item.course_slug,
        price: item.price,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Create Razorpay order
      const { data: razorpayData, error: razorpayError } = await supabase.functions.invoke('create-razorpay-order', {
        body: {
          amount: total * 100, // Razorpay expects amount in paise
          currency: 'INR',
          orderId: order.id,
          orderNumber: orderNumber,
        },
      });

      if (razorpayError) throw razorpayError;

      // Load Razorpay script and open payment modal
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        const options = {
          key: razorpayData.keyId,
          amount: total * 100,
          currency: 'INR',
          name: 'LearnSkills India',
          description: `Payment for ${items.length} course(s)`,
          order_id: razorpayData.razorpayOrderId,
          handler: async function (response: any) {
            // Verify payment
            const { error: verifyError } = await supabase.functions.invoke('verify-razorpay-payment', {
              body: {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderId: order.id,
                userEmail: user?.email,
                courses: items.map(item => ({ title: item.course_title, slug: item.course_slug })),
              },
            });

            if (verifyError) {
              toast({
                title: "Payment Verification Failed",
                description: "Please contact support if amount was deducted",
                variant: "destructive",
              });
              return;
            }

            // Clear cart and redirect
            await clearCart();
            toast({
              title: "Payment Successful!",
              description: "You have been enrolled in the course(s). Check your email for confirmation.",
            });
            navigate('/profile');
          },
          prefill: {
            email: user?.email,
          },
          theme: {
            color: '#0d9488',
          },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      };
      document.body.appendChild(script);

    } catch (error) {
      console.error('Error processing payment:', error);
      toast({
        title: "Error",
        description: "Failed to process payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-secondary/20 to-background">
      <Navigation />
      
      <main className="flex-1 py-12">
        <div className="container max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <ShoppingCart className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">Secure Checkout</span>
            </div>
            <h1 className="text-4xl font-bold mb-2">Order Summary</h1>
            <p className="text-muted-foreground">Complete your purchase and start learning</p>
          </div>

          {items.length === 0 ? (
            <Card className="text-center py-16 animate-scale-in">
              <CardContent>
                <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
                <p className="text-muted-foreground mb-6">Browse our courses and add them to your cart</p>
                <Button onClick={() => navigate('/courses')} className="gap-2">
                  <Sparkles className="h-4 w-4" />
                  Explore Courses
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item, index) => (
                  <Card 
                    key={item.id} 
                    className="group hover:shadow-xl hover:border-primary/30 transition-all duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                            {item.course_title}
                          </h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">Certificate Included</Badge>
                            <Badge variant="outline" className="text-xs">Lifetime Access</Badge>
                          </div>
                        </div>
                        <div className="text-right flex items-center gap-4">
                          <div>
                            <p className="text-2xl font-bold text-primary">₹{Number(item.price).toLocaleString()}</p>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => removeFromCart(item.course_id)}
                            className="text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Coupon Section */}
                <Card className="border-dashed border-2 hover:border-primary/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Tag className="h-5 w-5 text-primary" />
                      <span className="font-medium">Have a coupon code?</span>
                    </div>
                    {appliedCoupon ? (
                      <div className="flex items-center justify-between bg-primary/10 p-3 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Check className="h-5 w-5 text-primary" strokeWidth={3} />
                          <span className="font-medium">{appliedCoupon.code}</span>
                          <Badge variant="secondary">{appliedCoupon.discount_percent}% OFF</Badge>
                        </div>
                        <Button variant="ghost" size="sm" onClick={handleRemoveCoupon}>
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Input
                          placeholder="Enter coupon code"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                          className="flex-1"
                        />
                        <Button 
                          onClick={handleApplyCoupon} 
                          disabled={isApplyingCoupon}
                          variant="secondary"
                        >
                          {isApplyingCoupon ? "Applying..." : "Apply"}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24 shadow-xl border-primary/20">
                  <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-t-lg">
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Payment Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal ({items.length} course{items.length > 1 ? 's' : ''})</span>
                        <span>₹{subtotal.toLocaleString()}</span>
                      </div>
                      
                      {discount > 0 && (
                        <div className="flex justify-between text-sm text-green-600">
                          <span>Discount</span>
                          <span>-₹{discount.toLocaleString()}</span>
                        </div>
                      )}
                      
                      {appliedCoupon && (
                        <div className="flex justify-between text-sm text-green-600">
                          <span>Coupon ({appliedCoupon.code})</span>
                          <span>-₹{couponDiscount.toLocaleString()}</span>
                        </div>
                      )}
                    </div>

                    <Separator />

                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Total</span>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-primary">₹{total.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Inclusive of all taxes</p>
                      </div>
                    </div>

                    <Button 
                      className="w-full h-14 text-lg gap-2 group mt-6" 
                      size="lg"
                      onClick={handleProceedToPay}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        "Processing..."
                      ) : (
                        <>
                          Proceed to Pay
                          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>

                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-4">
                      <Check className="h-4 w-4 text-green-600" strokeWidth={3} />
                      <span>Secure payment powered by Razorpay</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
