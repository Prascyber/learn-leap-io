import { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { courses } from "@/data/courses";
import { courseImages } from "@/data/courseImages";
import { whoShouldChooseData } from "@/data/whoShouldChooseData";
import type { CarouselApi } from "@/components/ui/carousel";
import { GraduationCap, Building2, CheckCheck, ChevronDown, Users } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Component for "Who Should Choose Us" slide
const WhoShouldChooseSlide = () => (
  <CarouselItem>
    <div className="relative h-[55vh] sm:h-[45vh] md:h-[50vh] w-full overflow-hidden">
      {/* Abstract Background Design */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20">
        {/* Decorative shapes */}
        <div className="absolute top-5 right-5 sm:top-10 sm:right-10 w-32 sm:w-64 h-32 sm:h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-5 left-5 sm:bottom-10 sm:left-20 w-40 sm:w-80 h-40 sm:h-80 bg-accent/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/3 w-20 sm:w-40 h-20 sm:h-40 bg-primary/5 rounded-full blur-2xl" />
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>
      <div className="relative h-full container flex items-center px-3 sm:px-6">
        <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-12 animate-fade-in">
          {/* Left Side */}
          <div className="space-y-3 sm:space-y-4 max-w-xl">
            <div className="space-y-1 sm:space-y-2">
              <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold leading-tight">
                Who Should Choose Us
              </h2>
              <p className="text-xs sm:text-sm md:text-lg text-muted-foreground">
                Empowering careers with industry-ready skills
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <Button 
                size="sm"
                asChild
                className="min-h-[40px] sm:min-h-[44px] px-3 sm:px-6 text-xs sm:text-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                <Link to="/students-professionals">
                  <GraduationCap className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Students & Professionals
                </Link>
              </Button>
              <Button 
                size="sm"
                variant="secondary"
                asChild
                className="min-h-[40px] sm:min-h-[44px] px-3 sm:px-5 text-xs sm:text-sm bg-primary/20 hover:bg-primary/30 text-foreground transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                <Link to="/corporate">
                  <Building2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Corporate
                </Link>
              </Button>
            </div>

            {/* Explore Courses + EMI */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 pt-1">
              <Button 
                size="sm" 
                asChild
                className="min-h-[40px] sm:min-h-[48px] px-4 sm:px-8 text-xs sm:text-lg transition-all duration-300 hover:shadow-[0_10px_40px_rgba(59,130,246,0.5)] hover:-translate-y-1"
              >
                <Link to="/courses">Explore Courses</Link>
              </Button>
              <span className="px-2 py-1 sm:px-4 sm:py-2 bg-accent/80 text-accent-foreground rounded-full text-[10px] sm:text-sm font-semibold animate-pulse">
                ZERO COST EMI AVAILABLE
              </span>
            </div>

            {/* Mobile Benefits - Visible only on mobile */}
            <div className="flex md:hidden flex-wrap gap-1.5 pt-2">
              {[
                "Placement Assistance",
                "Mock Interviews",
                "Hands-on Training",
                "Certificates",
                "Recordings"
              ].map((benefit, index) => (
                <span key={index} className="flex items-center gap-1 text-[10px] bg-card/80 px-2 py-1 rounded-full border border-border/50">
                  <CheckCheck className="w-3 h-3 text-primary shrink-0" strokeWidth={3} />
                  {benefit}
                </span>
              ))}
            </div>
          </div>

          {/* Right Side - Benefits (Desktop only) */}
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
                  <CheckCheck className="w-5 h-5 text-primary shrink-0" strokeWidth={3} />
                  <span className="font-medium">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </CarouselItem>
);

// Who Should Choose Dropdown Button component
const WhoShouldChooseButton = ({ courseSlug }: { courseSlug: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const courseData = whoShouldChooseData.find(item => item.courseSlug === courseSlug);
  const targetAudience = courseData?.targetAudience || [];

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          size="sm" 
          variant="secondary"
          className="text-xs sm:text-base px-4 py-3 sm:px-8 sm:py-6 min-h-[40px] sm:min-h-[48px] transition-all duration-300 hover:shadow-[0_10px_40px_rgba(59,130,246,0.4)] hover:-translate-y-1 bg-primary/90 text-primary-foreground hover:bg-primary"
          onMouseEnter={() => {
            if (window.innerWidth >= 768) {
              setIsOpen(true);
            }
          }}
          onMouseLeave={() => {
            if (window.innerWidth >= 768) {
              setIsOpen(false);
            }
          }}
          onClick={() => {
            if (window.innerWidth < 768) {
              setIsOpen(!isOpen);
            }
          }}
        >
          <Users className="w-4 h-4 mr-2" />
          Who Should Choose?
          <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 sm:w-96 p-4 bg-card border border-border shadow-xl z-50"
        align="start"
        sideOffset={8}
        onMouseEnter={() => {
          if (window.innerWidth >= 768) {
            setIsOpen(true);
          }
        }}
        onMouseLeave={() => {
          if (window.innerWidth >= 768) {
            setIsOpen(false);
          }
        }}
      >
        <div className="space-y-3">
          <h4 className="font-semibold text-sm sm:text-base flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            This course is ideal for:
          </h4>
          <ul className="space-y-2">
            {targetAudience.map((audience, index) => (
              <li key={index} className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground">
                <CheckCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" strokeWidth={3} />
                <span>{audience}</span>
              </li>
            ))}
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  );
};

// Component for Course slide
const CourseSlide = ({ course, courseBenefits }: { course: typeof courses[0], courseBenefits: Record<string, string> }) => (
  <CarouselItem>
    <div className="relative h-[55vh] sm:h-[45vh] md:h-[50vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={courseImages[course.slug]}
          alt={course.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
      </div>
      <div className="relative h-full container flex items-center px-3 sm:px-6">
        <div className="max-w-2xl space-y-3 sm:space-y-6 animate-fade-in">
          <div className="space-y-1 sm:space-y-4">
            <h2 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-bold leading-tight">
              {course.title}
            </h2>
            <p className="text-sm sm:text-base md:text-xl text-muted-foreground line-clamp-2">
              {courseBenefits[course.slug as keyof typeof courseBenefits]}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <Button 
              size="sm" 
              asChild
              className="text-xs sm:text-base px-4 py-3 sm:px-8 sm:py-6 min-h-[40px] sm:min-h-[48px] transition-all duration-300 hover:shadow-[0_10px_40px_rgba(59,130,246,0.5)] hover:-translate-y-1"
            >
              <Link to={`/courses/${course.slug}`}>Enroll Now</Link>
            </Button>
            <WhoShouldChooseButton courseSlug={course.slug} />
          </div>
        </div>
      </div>
    </div>
  </CarouselItem>
);

const HeroCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoSlide = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      api?.scrollNext();
    }, 5000);
  }, [api]);

  const stopAutoSlide = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!api) return;

    if (!isPaused) {
      startAutoSlide();
    }

    return () => {
      stopAutoSlide();
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, [api, isPaused, startAutoSlide, stopAutoSlide]);

  const handleMouseEnter = () => {
    setIsPaused(true);
    stopAutoSlide();
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
  };

  const handleMouseLeave = () => {
    resumeTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 5000);
  };

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

  // Build slides array: insert "Who Should Choose Us" after every 3 courses
  const buildSlidesArray = () => {
    const slides: { type: 'promo' | 'course', course?: typeof courses[0] }[] = [];
    
    // Start with promo slide
    slides.push({ type: 'promo' });
    
    courses.forEach((course, index) => {
      slides.push({ type: 'course', course });
      
      // After every 3 courses, add the promo slide
      if ((index + 1) % 3 === 0 && index < courses.length - 1) {
        slides.push({ type: 'promo' });
      }
    });
    
    return slides;
  };

  const slides = buildSlidesArray();
  const totalSlides = slides.length;

  return (
    <div className="relative w-full" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Carousel setApi={setApi} className="w-full" opts={{ loop: true }}>
        <CarouselContent>
          {slides.map((slide, index) => (
            slide.type === 'promo' ? (
              <WhoShouldChooseSlide key={`promo-${index}`} />
            ) : (
              <CourseSlide 
                key={slide.course!.id} 
                course={slide.course!} 
                courseBenefits={courseBenefits} 
              />
            )
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex left-2 md:left-8" />
        <CarouselNext className="hidden sm:flex right-2 md:right-8" />
      </Carousel>

      {/* Carousel Dots Indicator */}
      <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 z-10 max-w-[90vw] overflow-x-auto">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-foreground/30 hover:bg-foreground/50 transition-colors shrink-0"
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;