import { useParams, Link } from "react-router-dom";
import { courses } from "@/data/courses";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, Users, Briefcase, GraduationCap } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const WhoShouldChoose = () => {
  const { slug } = useParams();
  const course = courses.find((c) => c.slug === slug);

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

  const audienceCategories = [
    {
      icon: GraduationCap,
      title: "Students",
      description: "Fresh graduates and final-year students looking to gain industry-relevant skills and stand out in the job market.",
      benefits: [
        "Build a strong foundation in industry practices",
        "Gain practical knowledge beyond academics",
        "Earn a completion certificate to boost your resume",
        "Access internship opportunities"
      ]
    },
    {
      icon: Briefcase,
      title: "Working Professionals",
      description: "Career professionals seeking to upskill, switch domains, or advance in their current field.",
      benefits: [
        "Learn at your own pace with lifetime access",
        "Apply new skills directly to your job",
        "Stay updated with industry trends",
        "Enhance career growth opportunities"
      ]
    },
    {
      icon: Users,
      title: "Corporate Teams",
      description: "Organizations looking to train their workforce with practical, job-ready skills.",
      benefits: [
        "Customized learning paths for teams",
        "Track progress and completion",
        "Industry-aligned curriculum",
        "Cost-effective bulk enrollments"
      ]
    }
  ];

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

      {/* Audience Categories */}
      <section className="py-16 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {audienceCategories.map((category, index) => (
              <ScrollReveal key={category.title} delay={index * 0.1}>
                <div className="bg-card rounded-2xl p-6 shadow-lg border border-border/50 h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <category.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{category.title}</h3>
                  <p className="text-muted-foreground mb-6">{category.description}</p>
                  <ul className="space-y-3">
                    {category.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

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
