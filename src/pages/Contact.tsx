import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form handling will be added when backend is integrated
    alert("Thank you for contacting us! We'll get back to you soon.");
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/919876543210?text=Hi, I'd like to know more about SkillEdge Academy courses", "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5 border-b">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold">Contact Us</h1>
            <p className="text-xl text-muted-foreground">
              Have questions? We're here to help you start your learning journey
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info Cards */}
            <div className="space-y-6">
              <Card className="group hover:shadow-2xl hover:scale-105 hover:-translate-y-2 hover:border-primary/30 transition-all duration-300 ease-out cursor-default">
                <CardContent className="pt-6 space-y-4">
                  <Phone className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <h3 className="font-semibold mb-2">Phone</h3>
                    <p className="text-muted-foreground">+91 98765 43210</p>
                    <p className="text-sm text-muted-foreground mt-1">Mon-Sat, 9 AM - 6 PM IST</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-2xl hover:scale-105 hover:-translate-y-2 hover:border-primary/30 transition-all duration-300 ease-out cursor-default">
                <CardContent className="pt-6 space-y-4">
                  <Mail className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <h3 className="font-semibold mb-2">Email</h3>
                    <p className="text-muted-foreground">info@skilledge.in</p>
                    <p className="text-sm text-muted-foreground mt-1">We'll respond within 24 hours</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-2xl hover:scale-105 hover:-translate-y-2 hover:border-primary/30 transition-all duration-300 ease-out cursor-default">
                <CardContent className="pt-6 space-y-4">
                  <MessageCircle className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <h3 className="font-semibold mb-2">WhatsApp</h3>
                    <Button onClick={handleWhatsApp} variant="outline" className="w-full group-hover:scale-110 transition-transform duration-300">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Chat on WhatsApp
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-2xl hover:scale-105 hover:-translate-y-2 hover:border-primary/30 transition-all duration-300 ease-out cursor-default">
                <CardContent className="pt-6 space-y-4">
                  <MapPin className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <h3 className="font-semibold mb-2">Location</h3>
                    <p className="text-muted-foreground">Serving students across India</p>
                    <p className="text-sm text-muted-foreground mt-1">Online learning platform</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="group hover:shadow-2xl hover:scale-[1.02] hover:border-primary/30 transition-all duration-300 ease-out">
                <CardHeader>
                  <CardTitle>Send Us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input id="name" placeholder="Your name" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input id="email" type="email" placeholder="your.email@example.com" required />
                      </div>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input id="phone" type="tel" placeholder="+91 98765 43210" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="course">Interested Course</Label>
                        <Input id="course" placeholder="e.g., Healthcare Insurance" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Tell us how we can help you..." 
                        rows={6}
                        required 
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full group-hover:scale-105 transition-transform duration-300">
                      Send Message
                    </Button>

                    <p className="text-sm text-muted-foreground text-center">
                      By submitting this form, you agree to our privacy policy and terms of service.
                    </p>
                  </form>
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

export default Contact;
