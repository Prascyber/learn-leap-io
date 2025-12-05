import { useParams, Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { courses } from "@/data/courses";
import { Award, Clock, CheckCircle, Users, TrendingUp, ShoppingCart, Sparkles, IndianRupee } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

const CourseDetail = () => {
  const { slug } = useParams();
  const course = courses.find((c) => c.slug === slug);
  const { user } = useAuth();
  const { addToCart, isInCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleEnrollClick = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to enroll in this course",
        variant: "destructive",
      });
      navigate("/auth");
    } else {
      // Add to cart and go to checkout
      if (!isInCart(course!.id)) {
        addToCart({
          id: course!.id,
          title: course!.title,
          slug: course!.slug,
          price: course!.price,
        });
      }
      navigate("/checkout");
    }
  };

  const handleAddToCart = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to add items to cart",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }
    
    addToCart({
      id: course!.id,
      title: course!.title,
      slug: course!.slug,
      price: course!.price,
    });
  };

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
            <Button asChild>
              <Link to="/courses">Back to Courses</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const discountPercent = Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);
  const alreadyInCart = isInCart(course.id);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Banner */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/10 border-b">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex flex-wrap gap-2 animate-fade-in">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Award className="h-3 w-3" />
                Certificate Included
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {course.duration}
              </Badge>
              <Badge className="bg-green-500/90 hover:bg-green-500 flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                {discountPercent}% OFF
              </Badge>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold animate-fade-in">{course.title}</h1>
            <p className="text-xl text-muted-foreground animate-fade-in">{course.fullDescription}</p>
            
            {/* Price Display */}
            <div className="flex items-center gap-4 animate-fade-in">
              <div className="flex items-center">
                <IndianRupee className="h-8 w-8 text-primary" />
                <span className="text-4xl font-bold text-primary">{course.price.toLocaleString()}</span>
              </div>
              <div className="flex items-center text-muted-foreground line-through">
                <IndianRupee className="h-5 w-5" />
                <span className="text-xl">{course.originalPrice.toLocaleString()}</span>
              </div>
              <Badge variant="destructive" className="text-sm">Save ₹{(course.originalPrice - course.price).toLocaleString()}</Badge>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
              <Button 
                size="lg" 
                onClick={handleEnrollClick}
                className="gap-2 group hover:scale-105 transition-all duration-300 hover:shadow-lg"
              >
                <Sparkles className="h-5 w-5 group-hover:animate-pulse" />
                Enroll Now
              </Button>
              <Button 
                size="lg" 
                variant={alreadyInCart ? "secondary" : "outline"}
                onClick={handleAddToCart}
                disabled={alreadyInCart}
                className="gap-2 hover:scale-105 transition-all duration-300"
              >
                <ShoppingCart className="h-5 w-5" />
                {alreadyInCart ? "Added to Cart" : "Add to Cart"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Course Overview */}
      <section className="py-16">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Who Should Take This Course */}
              <div className="animate-fade-in">
                <h2 className="text-2xl font-bold mb-4">Who Should Take This Course</h2>
                <ul className="space-y-3">
                  {course.whoShouldTake.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 group">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What You Will Learn */}
              <div className="animate-fade-in">
                <h2 className="text-2xl font-bold mb-4">What You Will Learn</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {course.whatYouWillLearn.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 group">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Course Curriculum */}
              <div className="animate-fade-in">
                <h2 className="text-2xl font-bold mb-4">Course Curriculum</h2>
                <div className="space-y-2">
                  {course.modules.map((module, index) => (
                    <Card key={index} className="group hover:shadow-lg hover:scale-[1.02] hover:border-primary/30 transition-all duration-300 ease-out cursor-default">
                      <CardContent className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold group-hover:scale-110 transition-transform">
                            {index + 1}
                          </div>
                          <span className="font-medium">{module}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="animate-fade-in">
                <h2 className="text-2xl font-bold mb-4">Course Benefits</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {course.benefits.map((benefit, index) => (
                    <Card key={index} className="group hover:shadow-lg hover:scale-105 hover:border-primary/30 transition-all duration-300 ease-out cursor-default">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                          <span>{benefit}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* FAQs */}
              <div className="animate-fade-in">
                <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full">
                  {course.faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="hover:text-primary transition-colors">{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="sticky top-24 group hover:shadow-2xl transition-all duration-300 ease-out border-primary/20">
                <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Course Highlights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                  {/* Price in Sidebar */}
                  <div className="text-center pb-4 border-b">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-3xl font-bold text-primary">₹{course.price.toLocaleString()}</span>
                      <span className="text-lg text-muted-foreground line-through">₹{course.originalPrice.toLocaleString()}</span>
                    </div>
                    <Badge variant="destructive" className="mt-2">{discountPercent}% OFF - Limited Time</Badge>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">Duration</div>
                      <div className="text-sm text-muted-foreground">{course.duration}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Award className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">Certificate</div>
                      <div className="text-sm text-muted-foreground">Upon completion</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">Internship Support</div>
                      <div className="text-sm text-muted-foreground">Partner organizations</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">Access</div>
                      <div className="text-sm text-muted-foreground">1 year Validity</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3 pt-4">
                    <Button 
                      className="w-full gap-2 h-12 text-lg group" 
                      size="lg"
                      onClick={handleEnrollClick}
                    >
                      <Sparkles className="h-5 w-5 group-hover:animate-pulse" />
                      Enroll Now
                    </Button>
                    <Button 
                      className="w-full gap-2" 
                      variant={alreadyInCart ? "secondary" : "outline"}
                      onClick={handleAddToCart}
                      disabled={alreadyInCart}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      {alreadyInCart ? "Added to Cart" : "Add to Cart"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CourseDetail;
