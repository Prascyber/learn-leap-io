import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { GraduationCap, Briefcase, Target, TrendingUp, Award, BookOpen, ArrowLeft } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const StudentsProfessionals = () => {
  const studentBenefits = [
    { icon: BookOpen, title: "Industry-Ready Curriculum", description: "Learn skills that employers actually need" },
    { icon: Award, title: "Completion Certificates", description: "Get certified credentials for your resume" },
    { icon: Target, title: "Internship Support", description: "Gain real-world experience opportunities" },
  ];

  const professionalBenefits = [
    { icon: TrendingUp, title: "Career Advancement", description: "Upskill to reach the next level in your career" },
    { icon: Target, title: "Specialized Knowledge", description: "Master domain-specific expertise" },
    { icon: Award, title: "Professional Recognition", description: "Enhance your professional credibility" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-primary/10 to-background">
        <div className="container px-4">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                For Students & Professionals
              </h1>
              <p className="text-lg text-muted-foreground">
                Whether you're starting your career or advancing it, our courses are designed to help you succeed
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Students Section */}
      <section className="py-16">
        <div className="container px-4">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-primary/10 rounded-full">
                <GraduationCap className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold">For Students</h2>
            </div>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-3 gap-6">
            {studentBenefits.map((benefit, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 space-y-4">
                    <benefit.icon className="w-10 h-10 text-primary" />
                    <h3 className="text-xl font-semibold">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Professionals Section */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-primary/10 rounded-full">
                <Briefcase className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold">For Professionals</h2>
            </div>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-3 gap-6">
            {professionalBenefits.map((benefit, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 space-y-4">
                    <benefit.icon className="w-10 h-10 text-primary" />
                    <h3 className="text-xl font-semibold">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container px-4 text-center">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explore our courses and take the first step towards your career goals
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link to="/courses">Explore Courses</Link>
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

export default StudentsProfessionals;
