import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CourseCard from "@/components/CourseCard";
import AnimatedBackground from "@/components/AnimatedBackground";
import { courses } from "@/data/courses";
import { courseImages } from "@/data/courseImages";
import { CheckCircle, Award, BookOpen, Users, TrendingUp, Clock } from "lucide-react";
import heroImage from "@/assets/hero-education.jpg";

const Index = () => {
  const featuredCourses = courses.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Hero Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Students learning together" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background/95 to-secondary/10" />
        </div>
        
        {/* Animated Background */}
        <AnimatedBackground />
        
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <Badge variant="secondary" className="text-sm">
              India's Premier Online Learning Platform
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight animate-fade-in [animation-delay:200ms]">
              Empowering India's Future Workforce with{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-[gradient_3s_ease-in-out_infinite] bg-clip-text text-transparent font-extrabold">
                Job-Ready Skills
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Learn practical, industry-relevant courses with certificates and internship support
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/courses">Explore Courses</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary">8+</div>
              <div className="text-sm text-muted-foreground">Professional Courses</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Certification</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">∞</div>
              <div className="text-sm text-muted-foreground">Lifetime Access</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Featured Courses</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Start your journey with our most popular healthcare and management programs
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredCourses.map((course) => (
              <CourseCard
                key={course.id}
                title={course.title}
                description={course.shortDescription}
                duration={course.duration}
                slug={course.slug}
                image={courseImages[course.slug]}
              />
            ))}
          </div>
          <div className="text-center">
            <Button size="lg" variant="outline" asChild>
              <Link to="/courses">View All Courses</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to succeed in your career journey
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: BookOpen,
                title: "Industry-Driven Curriculum",
                description: "Learn skills that employers actually need, designed by industry experts"
              },
              {
                icon: CheckCircle,
                title: "Practical Assignments",
                description: "Work on real-world projects and build a portfolio that stands out"
              },
              {
                icon: Award,
                title: "Completion Certificates",
                description: "Earn recognized certificates to showcase your achievements"
              },
              {
                icon: Users,
                title: "Internship Support",
                description: "Get connected with partner organizations for hands-on experience"
              },
              {
                icon: TrendingUp,
                title: "Affordable Pricing",
                description: "Quality education accessible to everyone with flexible payment options"
              },
              {
                icon: Clock,
                title: "Lifetime Access",
                description: "Learn at your own pace with permanent access to course materials"
              }
            ].map((feature, index) => (
              <Card key={index} className="group hover:shadow-2xl hover:scale-105 hover:-translate-y-2 hover:border-primary/30 transition-all duration-300 ease-out cursor-default">
                <CardContent className="pt-6">
                  <feature.icon className="h-12 w-12 mb-4 text-primary group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors duration-300">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Student Success Stories</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from students who transformed their careers with SkillEdge Academy
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Priya Sharma",
                course: "Healthcare Insurance",
                text: "The course gave me confidence to work in the insurance sector. Got placed in a TPA company within 2 months of completion!"
              },
              {
                name: "Rahul Verma",
                course: "Medical Coding",
                text: "Best decision for my career. Now working remotely as a medical coder with international clients. Excellent support from instructors."
              },
              {
                name: "Anjali Patel",
                course: "Healthcare Analytics",
                text: "Learned Power BI and healthcare KPIs from scratch. The real datasets made all the difference. Highly recommend!"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="group hover:shadow-2xl hover:scale-105 hover:-translate-y-2 hover:border-primary/30 transition-all duration-300 ease-out cursor-default">
                <CardContent className="pt-6 space-y-4">
                  <p className="text-muted-foreground italic group-hover:text-foreground transition-colors duration-300">"{testimonial.text}"</p>
                  <div>
                    <div className="font-semibold group-hover:text-primary transition-colors duration-300">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.course}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of students building successful careers in healthcare and management
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/courses">Start Learning Today</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
