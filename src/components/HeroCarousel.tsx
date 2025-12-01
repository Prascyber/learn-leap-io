import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { courses } from "@/data/courses";
import { courseImages } from "@/data/courseImages";
import type { CarouselApi } from "@/components/ui/carousel";

const HeroCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) {
      return;
    }

    const intervalId = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [api]);

  const courseBenefits = {
    "healthcare-insurance": "Master Health Insurance Operations & TPA Management",
    "healthcare-analytics": "Transform Healthcare Data into Strategic Insights",
    "medical-coding": "Start Your Career in Medical Coding & Billing",
    "hmis": "Become a Hospital Information Systems Expert",
    "strategic-management": "Lead with Strategic Business Acumen",
    "human-resource-management": "Excel in Modern HR Practices",
    "quality-management": "Drive Quality Excellence in Organizations",
    "hr-analytics": "Leverage Data for HR Decision Making"
  };

  return (
    <div className="relative w-full">
      <Carousel setApi={setApi} className="w-full" opts={{ loop: true }}>
        <CarouselContent>
          {courses.map((course) => (
            <CarouselItem key={course.id}>
              <div className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full overflow-hidden">
                {/* Course Image with Overlay */}
                <div className="absolute inset-0">
                  <img
                    src={courseImages[course.slug]}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
                </div>

                {/* Content */}
                <div className="relative h-full container flex items-center">
                  <div className="max-w-2xl space-y-6 animate-fade-in">
                    <div className="space-y-4">
                      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                        {course.title}
                      </h2>
                      <p className="text-xl md:text-2xl text-muted-foreground">
                        {courseBenefits[course.slug as keyof typeof courseBenefits]}
                      </p>
                    </div>
                    <Button 
                      size="lg" 
                      asChild
                      className="text-lg px-8 py-6 transition-all duration-300 hover:shadow-[0_10px_40px_rgba(59,130,246,0.5)] hover:-translate-y-1"
                    >
                      <Link to={`/courses/${course.slug}`}>Enroll Now</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 md:left-8" />
        <CarouselNext className="right-4 md:right-8" />
      </Carousel>

      {/* Carousel Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {courses.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className="w-2 h-2 rounded-full bg-foreground/30 hover:bg-foreground/50 transition-colors"
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
