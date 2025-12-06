import { useParams, Link } from "react-router-dom";
import { courses } from "@/data/courses";
import { whoShouldChooseData } from "@/data/whoShouldChooseData";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const WhoShouldChoose = () => {
  const { slug } = useParams();
  const course = courses.find((c) => c.slug === slug);
  const whoShouldData = whoShouldChooseData.find((w) => w.courseSlug === slug);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Course not found</h1>
          <Button asChild>
            <Link to="/courses">Back to Courses</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto">
          <ScrollReveal>
            <Button variant="ghost" asChild className="mb-6 group">
              <Link to={`/course/${slug}`}>
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to Course
              </Link>
            </Button>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Who Should Choose
            </h1>
            <h2 className="text-2xl sm:text-3xl text-primary font-semibold mb-6">
              {course.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Discover if this course is the right fit for your career goals and learning journey.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Target Audience Section */}
      {whoShouldData && (
        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6">
            <ScrollReveal>
              <div className="text-center mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                  Ideal Candidates for This Course
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  This course is specifically designed for the following profiles
                </p>
              </div>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {whoShouldData.targetAudience.map((audience, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <Card className="h-full border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                    <CardContent className="p-6 flex items-start gap-4">
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-foreground">{audience}</p>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 bg-primary/5">
        <div className="container mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join thousands of learners who have transformed their careers with our industry-relevant courses.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild className="px-8">
                <Link to={`/course/${slug}`}>Enroll Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="px-8">
                <Link to="/courses">Explore All Courses</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WhoShouldChoose;