import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Target, Heart, Award, Users } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5 border-b">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold">About EdHere Academy</h1>
            <p className="text-xl text-muted-foreground">
              Empowering India's workforce with practical, job-ready skills in healthcare and management
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="group hover:shadow-2xl hover:scale-105 hover:-translate-y-2 hover:border-primary/30 transition-all duration-300 ease-out cursor-default">
              <CardContent className="pt-6 space-y-4">
                <Target className="h-12 w-12 text-primary group-hover:scale-110 transition-transform duration-300" />
                <h2 className="text-2xl font-bold">Our Vision</h2>
                <p className="text-muted-foreground">
                  To become India's most trusted online learning platform, bridging the gap between education and employment by delivering world-class, practical courses that transform careers and empower individuals to achieve their professional dreams.
                </p>
              </CardContent>
            </Card>
            <Card className="group hover:shadow-2xl hover:scale-105 hover:-translate-y-2 hover:border-primary/30 transition-all duration-300 ease-out cursor-default">
              <CardContent className="pt-6 space-y-4">
                <Heart className="h-12 w-12 text-primary group-hover:scale-110 transition-transform duration-300" />
                <h2 className="text-2xl font-bold">Our Mission</h2>
                <p className="text-muted-foreground">
                  To provide affordable, accessible, and industry-relevant education to every aspiring professional in India. We are committed to delivering hands-on training, recognized certifications, and comprehensive career support that helps our students secure meaningful employment in their chosen fields.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Founder's Message */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Card className="group hover:shadow-2xl hover:scale-105 hover:-translate-y-2 hover:border-primary/30 transition-all duration-300 ease-out cursor-default">
              <CardContent className="pt-8 space-y-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Founder's Message</h2>
                    <p className="text-muted-foreground">Leading the way to skill development</p>
                  </div>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    "Education should be a bridge to opportunity, not a barrier. At SkillEdge Academy, we believe that every individual deserves access to quality education that translates directly into career success."
                  </p>
                  <p>
                    "Having witnessed the challenges faced by job seekers in healthcare and management sectors, we created a platform that focuses on practical skills, real-world applications, and industry-recognized certifications. Our courses are designed by professionals who understand what employers actually need."
                  </p>
                  <p>
                    "We're not just an online learning platform – we're your career partners. From the moment you enroll to the day you secure your dream job, we're with you every step of the way with internship support, career guidance, and a lifetime learning community."
                  </p>
                  <p className="font-semibold text-foreground">
                    Join us in building a skilled, confident, and successful India.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose SkillEdge Academy</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We go beyond traditional online learning to ensure your success
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Award,
                title: "Industry-Relevant",
                description: "Courses designed by professionals with real-world expertise"
              },
              {
                icon: Users,
                title: "Career Support",
                description: "Internship connections and job placement assistance"
              },
              {
                icon: Target,
                title: "Practical Focus",
                description: "Hands-on projects and simulated work environments"
              },
              {
                icon: Heart,
                title: "Affordable Access",
                description: "Quality education accessible to everyone"
              }
            ].map((feature, index) => (
              <Card key={index} className="group hover:shadow-2xl hover:scale-105 hover:-translate-y-2 hover:border-primary/30 transition-all duration-300 ease-out cursor-default">
                <CardContent className="pt-6 text-center space-y-4">
                  <feature.icon className="h-12 w-12 mx-auto text-primary group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors duration-300">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Career?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of students who have already started their journey to success
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/courses">Explore Our Courses</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
