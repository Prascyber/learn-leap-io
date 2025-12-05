import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { courses } from "@/data/courses";
import { courseImages } from "@/data/courseImages";
import type { CarouselApi } from "@/components/ui/carousel";
import whoShouldChooseBanner from "@/assets/who-should-choose-banner.jpg";
import { GraduationCap, Briefcase, Building2, CheckCircle } from "lucide-react";

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

  const totalSlides = courses.length + 1; // courses + who should choose us slide

  return (
    <div className="relative w-full">
      <Carousel setApi={setApi} className="w-full" opts={{ loop: true }}>
        <CarouselContent>
          {/* Who Should Choose Us Slide */}
          <CarouselItem>
            <div className="relative h-[40vh] sm:h-[45vh] md:h-[55vh] w-full overflow-hidden">
              <div className="absolute inset-0">
                <img
                  src={whoShouldChooseBanner}
                  alt="Students, Professionals and Corporate learners"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background/98 via-background/85 to-background/50" />
              </div>
              <div className="relative h-full container flex items-center px-4 sm:px-6">
                <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-12 animate-fade-in">
                  {/* Left Side */}
                  <div className="space-y-4 sm:space-y-5 max-w-xl">
                    <div className="space-y-2">
                      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                        Who Should Choose Us
                      </h2>
                      <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
                        Empowering careers with industry-ready skills
                      </p>
                    </div>
                    
                    {/* CTA Buttons */}
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-3">
                        <Button 
                          size="lg"
                          className="min-h-[44px] px-5 sm:px-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                        >
                          <GraduationCap className="w-4 h-4 mr-2" />
                          Students
                        </Button>
                        <Button 
                          size="lg"
                          className="min-h-[44px] px-5 sm:px-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                        >
                          <Briefcase className="w-4 h-4 mr-2" />
                          Professionals
                        </Button>
                      </div>
                      <Button 
                        size="lg"
                        variant="secondary"
                        className="min-h-[44px] px-5 sm:px-6 bg-primary/20 hover:bg-primary/30 text-foreground transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                      >
                        <Building2 className="w-4 h-4 mr-2" />
                        Corporate
                      </Button>
                    </div>

                    {/* Explore Courses + EMI */}
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
                      <Button 
                        size="lg" 
                        asChild
                        className="min-h-[48px] px-6 sm:px-8 text-base sm:text-lg transition-all duration-300 hover:shadow-[0_10px_40px_rgba(59,130,246,0.5)] hover:-translate-y-1"
                      >
                        <Link to="/courses">Explore Courses</Link>
                      </Button>
                      <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-accent/80 text-accent-foreground rounded-full text-xs sm:text-sm font-semibold animate-pulse">
                        ZERO COST EMI OPTIONS AVAILABLE
                      </span>
                    </div>
                  </div>

                  {/* Right Side - Benefits */}
                  <div className="hidden md:block bg-card/80 backdrop-blur-sm rounded-xl p-5 lg:p-6 border border-border/50 shadow-lg">
                    <ul className="space-y-3 lg:space-y-4">
                      {[
                        "Placement Assistance",
                        "Mock Interviews",
                        "Hands-on Training",
                        "Internship Certificates",
                        "Recording Access"
                      ].map((benefit, index) => (
                        <li key={index} className="flex items-center gap-3 text-sm lg:text-base">
                          <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                          <span className="font-medium">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>

          {/* Course Slides */}
          {courses.map((course) => (
            <CarouselItem key={course.id}>
              <div className="relative h-[40vh] sm:h-[45vh] md:h-[50vh] w-full overflow-hidden">
                <div className="absolute inset-0">
                  <img
                    src={courseImages[course.slug]}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
                </div>
                <div className="relative h-full container flex items-center px-4 sm:px-6">
                  <div className="max-w-2xl space-y-4 sm:space-y-6 animate-fade-in">
                    <div className="space-y-2 sm:space-y-4">
                      <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
                        {course.title}
                      </h2>
                      <p className="text-base sm:text-lg md:text-2xl text-muted-foreground">
                        {courseBenefits[course.slug as keyof typeof courseBenefits]}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Button 
                        size="lg" 
                        asChild
                        className="text-base sm:text-lg px-6 py-5 sm:px-8 sm:py-6 min-h-[48px] transition-all duration-300 hover:shadow-[0_10px_40px_rgba(59,130,246,0.5)] hover:-translate-y-1"
                      >
                        <Link to={`/courses/${course.slug}`}>Enroll Now</Link>
                      </Button>
                      <Button 
                        size="lg" 
                        variant="secondary"
                        asChild
                        className="text-base sm:text-lg px-6 py-5 sm:px-8 sm:py-6 min-h-[48px] transition-all duration-300 hover:shadow-[0_10px_40px_rgba(59,130,246,0.4)] hover:-translate-y-1 bg-primary/90 text-primary-foreground hover:bg-primary"
                      >
                        <Link to={`/who-should-choose/${course.slug}`}>Who Should Choose?</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex left-2 md:left-8" />
        <CarouselNext className="hidden sm:flex right-2 md:right-8" />
      </Carousel>

      {/* Carousel Dots Indicator */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className="w-2.5 h-2.5 sm:w-2 sm:h-2 rounded-full bg-foreground/30 hover:bg-foreground/50 transition-colors"
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
