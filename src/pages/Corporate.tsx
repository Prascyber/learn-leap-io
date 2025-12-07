import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Building2, Users, Target, TrendingUp, Award, Check, ArrowLeft } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const Corporate = () => {
  const benefits = [
    { icon: Users, title: "Team Training", description: "Upskill your entire workforce with customized learning paths" },
    { icon: Target, title: "Custom Programs", description: "Tailored training solutions to meet your business objectives" },
    { icon: TrendingUp, title: "ROI Focused", description: "Measurable outcomes that impact your bottom line" },
    { icon: Award, title: "Certification", description: "Industry-recognized certificates for your employees" },
  ];

  const features = [
    "Bulk enrollment discounts",
    "Progress tracking dashboard",
    "Dedicated account manager",
    "Custom content development",
    "Flexible scheduling options",
    "Performance analytics",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-primary/10 to-background">
        <div className="container px-4">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
                <Building2 className="w-5 h-5 text-primary" />
                <span className="font-medium">Corporate Training</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Empower Your Workforce
              </h1>
              <p className="text-lg text-muted-foreground">
                Transform your organization with industry-leading training programs
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container px-4">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">Why Choose Us for Corporate Training?</h2>
          </ScrollReveal>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <Card className="h-full hover:shadow-lg transition-shadow text-center">
                  <CardContent className="p-6 space-y-4">
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <benefit.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">What's Included</h2>
            </ScrollReveal>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <ScrollReveal key={index} delay={index * 50}>
                  <div className="flex items-center gap-3 p-4 bg-card rounded-lg border">
                    <Check className="w-5 h-5 text-primary shrink-0" strokeWidth={3} />
                    <span className="font-medium">{feature}</span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container px-4 text-center">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Transform Your Team?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Contact us to discuss your corporate training needs
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Corporate;
