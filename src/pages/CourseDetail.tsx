import { useParams, Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { courses } from "@/data/courses";
import { Award, Clock, CheckCircle, Users, TrendingUp } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const CourseDetail = () => {
  const { slug } = useParams();
  const course = courses.find((c) => c.slug === slug);
  const { user } = useAuth();
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
      // TODO: Integrate Razorpay payment
      toast({
        title: "Coming Soon",
        description: "Payment integration will be available soon",
      });
    }
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Banner */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/10 border-b">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Award className="h-3 w-3" />
                Certificate Included
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {course.duration}
              </Badge>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold">{course.title}</h1>
            <p className="text-xl text-muted-foreground">{course.fullDescription}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={handleEnrollClick}>
                Enroll Now
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact">Contact Us</Link>
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
              <div>
                <h2 className="text-2xl font-bold mb-4">Who Should Take This Course</h2>
                <ul className="space-y-3">
                  {course.whoShouldTake.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What You Will Learn */}
              <div>
                <h2 className="text-2xl font-bold mb-4">What You Will Learn</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {course.whatYouWillLearn.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Course Curriculum */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Course Curriculum</h2>
                <div className="space-y-2">
                  {course.modules.map((module, index) => (
                    <Card key={index} className="group hover:shadow-lg hover:scale-105 hover:border-primary/30 transition-all duration-300 ease-out cursor-default">
                      <CardContent className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
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
              <div>
                <h2 className="text-2xl font-bold mb-4">Course Benefits</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {course.benefits.map((benefit, index) => (
                    <Card key={index} className="group hover:shadow-lg hover:scale-105 hover:border-primary/30 transition-all duration-300 ease-out cursor-default">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>{benefit}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* FAQs */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full">
                  {course.faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="sticky top-20 group hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-out">
                <CardHeader>
                  <CardTitle>Course Highlights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
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
                      <div className="text-sm text-muted-foreground">Lifetime access</div>
                    </div>
                  </div>
                  <Button 
                    className="w-full mt-4 group-hover:scale-110 transition-transform duration-300 ease-out" 
                    size="lg"
                    onClick={handleEnrollClick}
                  >
                    Enroll Now
                  </Button>
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
