import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { GraduationCap, Briefcase, Building2 } from "lucide-react";
import { courses } from "@/data/courses";
import type { CarouselApi } from "@/components/ui/carousel";

import heroInsurance from "@/assets/hero-insurance.jpg";
import heroAnalytics from "@/assets/hero-analytics.jpg";
import heroCoding from "@/assets/hero-coding.jpg";
import heroHmis from "@/assets/hero-hmis.jpg";
import heroStrategic from "@/assets/hero-strategic.jpg";
import heroHrm from "@/assets/hero-hrm.jpg";
import heroQuality from "@/assets/hero-quality.jpg";
import heroHrAnalytics from "@/assets/hero-hr-analytics.jpg";

const courseImages: Record<string, string> = {
  "healthcare-insurance": heroInsurance,
  "healthcare-analytics": heroAnalytics,
  "medical-coding": heroCoding,
  "hmis": heroHmis,
  "strategic-management": heroStrategic,
  "human-resource-management": heroHrm,
  "quality-management": heroQuality,
  "hr-analytics": heroHrAnalytics,
};

const HeroCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="relative overflow-hidden">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {/* First Slide - Who Should Choose Us */}
          <CarouselItem>
            <div className="relative h-[600px] flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10">
              <div className="container z-10 text-center space-y-8 px-4">
                <h2 className="text-4xl lg:text-5xl font-bold">Who Should Choose Us</h2>
                <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-8">
                  {[
                    {
                      icon: GraduationCap,
                      title: "Students",
                      description: "Graduate and postgraduate students looking to build job-ready skills and gain practical industry experience"
                    },
                    {
                      icon: Briefcase,
                      title: "Professionals",
                      description: "Working professionals seeking to upskill, transition careers, or stay updated with latest industry trends"
                    },
                    {
                      icon: Building2,
                      title: "Corporate",
                      description: "Organizations looking to train their workforce with specialized skills in healthcare, analytics, and management"
                    }
                  ].map((audience, index) => (
                    <Card key={index} className="h-full bg-card/80 backdrop-blur-sm">
                      <CardContent className="pt-6 text-center">
                        <audience.icon className="h-12 w-12 mb-4 text-primary mx-auto" />
                        <h3 className="font-semibold text-lg mb-2">{audience.title}</h3>
                        <p className="text-muted-foreground text-sm">{audience.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </CarouselItem>

          {/* Course Slides */}
          {courses.map((course) => (
            <CarouselItem key={course.id}>
              <div className="relative h-[600px] flex items-center">
                <img
                  src={courseImages[course.slug]}
                  alt={course.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-transparent" />
                <div className="container relative z-10 px-4">
                  <div className="max-w-2xl space-y-6">
                    <h2 className="text-5xl lg:text-6xl font-bold leading-tight">
                      {course.title}
                    </h2>
                    <p className="text-xl text-muted-foreground">
                      {course.shortDescription}
                    </p>
                    <div className="flex gap-4">
                      <Button size="lg" asChild className="hover-scale">
                        <Link to={`/courses/${course.slug}`}>Enroll Now</Link>
                      </Button>
                      <Button size="lg" variant="outline" asChild className="hover-scale">
                        <Link to={`/courses/${course.slug}`}>Learn More</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 lg:left-8" />
        <CarouselNext className="right-4 lg:right-8" />
      </Carousel>

      {/* Mobile Info Section */}
      <div className="block md:hidden bg-gradient-to-br from-primary/5 to-secondary/5 py-12 border-t">
        <div className="container px-4 text-center space-y-4">
          <h3 className="text-2xl font-bold">India's Premier Learning Platform</h3>
          <p className="text-muted-foreground">
            Learn practical, industry-relevant courses with completion certificates and internship support.
          </p>
          <p className="text-lg font-semibold">
            Empowering India's Future Workforce with Job-Ready Skills
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
