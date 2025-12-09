import { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { courses } from "@/data/courses";
import { courseImages } from "@/data/courseImages";
import { whoShouldChooseData } from "@/data/whoShouldChooseData";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  GraduationCap,
  Building2,
  CheckCheck,
  ChevronDown,
  Users,
} from "lucide-react";
import bannerBackground from "@/assets/who-should-choose-banner.jpg";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// ✅ STANDALONE "Who Should Choose Us" BANNER
const WhoShouldChooseBanner = () => (
  <section className="w-full bg-white px-3 sm:px-0">
    {/* square corners, centered, with border */}
    <div className="relative w-full max-w-6xl mx-auto mt-2 sm:mt-0 border border-border/60 shadow-md overflow-hidden">
      {/* Premium Badge – desktop absolute */}
      <div className="hidden sm:block absolute top-3 sm:top-4 right-3 sm:right-4 z-20">
        <div className="premium-badge">
          <span className="premium-pill-text">
            Starting at <strong>₹999</strong> only
          </span>
        </div>
      </div>

      {/* Banner area – height + vertical center */}
      <div className="relative min-h-[55vh] md:min-h-[70vh] bg-card flex items-center">
        {/* Background AI image (professional girl with book) */}
        <img
          src={bannerBackground}
          alt="Professional woman holding a book"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Soft overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/60" />

        {/* Content */}
        <div className="relative w-full px-4 sm:px-8 lg:px-10 py-8 sm:py-10 md:py-12">
          <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-10">
            {/* LEFT SIDE – HEADING + CTAs */}
            <div className="space-y-3 sm:space-y-4 max-w-xl mx-auto lg:mx-0">
              {/* Mobile premium badge inside content */}
              <div className="sm:hidden mb-2 flex justify-center">
                <div className="premium-badge px-3 py-1 text-[11px]">
                  Starting at <strong>₹999</strong> only
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-center lg:text-left">
                  Who Should Choose Us
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground text-center lg:text-left">
                  Empowering students, professionals and corporates with
                  industry-ready skills.
                </p>
              </div>

              {/* Primary CTAs */}
              <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start">
                <Button
                  size="sm"
                  asChild
                  className="min-h-[38px] sm:min-h-[44px] px-3 sm:px-6 text-xs sm:text-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
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
                  className="min-h-[38px] sm:min-h-[44px] px-3 sm:px-5 text-xs sm:text-sm bg-primary/20 hover:bg-primary/30 text-foreground transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                >
                  <Link to="/corporate">
                    <Building2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    Corporate
                  </Link>
                </Button>
              </div>

              {/* Explore Courses + EMI */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 pt-1 justify-center lg:justify-start">
                <Button
                  size="sm"
                  asChild
                  className="min-h-[40px] sm:min-h-[46px] px-4 sm:px-8 text-xs sm:text-sm md:text-base transition-all duration-300 hover:shadow-[0_10px_40px_rgba(59,130,246,0.5)] hover:-translate-y-1"
                >
                  <Link to="/courses">Explore Courses</Link>
                </Button>
                <span className="px-2 py-1 sm:px-4 sm:py-2 bg-accent/80 text-accent-foreground rounded-full text-[11px] sm:text-sm font-semibold">
                  ZERO COST EMI AVAILABLE
                </span>
              </div>

              {/* Mobile-only benefits (chips) */}
              <div className="flex md:hidden flex-wrap gap-1.5 pt-3 justify-center">
                {[
                  "Placement Assistance",
                  "Mock Interviews",
                  "Hands-on Training",
                  "Certificates",
                  "Recordings",
                ].map((benefit, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-1 text-[11px] bg-card/80 px-2 py-1 rounded-full border border-border/50"
                  >
                    <CheckCheck
                      className="w-3 h-3 text-primary shrink-0"
                      strokeWidth={3}
                    />
                    {benefit}
                  </span>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE – BENEFITS CARD (DESKTOP / TABLET ONLY) */}
            <div className="hidden md:block bg-card/80 backdrop-blur-sm rounded-xl p-4 lg:p-6 border border-border/50 shadow-lg min-w-[240px] max-w-xs">
              <ul className="space-y-3 lg:space-y-4">
                {[
                  "Placement Assistance",
                  "Mock Interviews",
                  "Hands-on Training",
                  "Internship Certificates",
                  "Recording Access",
                ].map((benefit, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-sm lg:text-base"
                  >
                    <CheckCheck
                      className="w-5 h-5 text-primary shrink-0"
                      strokeWidth={3}
                    />
                    <span
                      className="
                        font-medium 
                        text-foreground 
                        drop-shadow-[0_0_6px_rgba(255,220,0,0.6)]
                        hover:drop-shadow-[0_0_10px_rgba(255,220,0,0.9)]
                        transition-all
                      "
                    >
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);


/* ============================
   WHO SHOULD CHOOSE BUTTON (COURSE)
============================ */

const WhoShouldChooseButton = ({ courseSlug }: { courseSlug: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const courseData = whoShouldChooseData.find(
    (item) => item.courseSlug === courseSlug
  );
  const targetAudience = courseData?.targetAudience || [];

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="secondary"
          className="text-xs sm:text-sm md:text-base px-4 py-2.5 sm:px-6 md:px-8 sm:py-5 md:py-6 min-h-[36px] sm:min-h-[46px] md:min-h-[48px] transition-all duration-300 hover:shadow-[0_10px_40px_rgba(59,130,246,0.4)] hover:-translate-y-1 bg-primary/90 text-primary-foreground hover:bg-primary"
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
          <ChevronDown
            className={`w-4 h-4 ml-2 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-72 sm:w-80 md:w-96 p-4 bg-card border border-border shadow-xl z-50"
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
              <li
                key={index}
                className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground"
              >
                <CheckCheck
                  className="w-4 h-4 text-primary shrink-0 mt-0.5"
                  strokeWidth={3}
                />
                <span>{audience}</span>
              </li>
            ))}
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  );
};

/* ============================
   COURSE SLIDE
============================ */

const CourseSlide = ({
  course,
  courseBenefits,
}: {
  course: typeof courses[0];
  courseBenefits: Record<string, string>;
}) => (
  <CarouselItem>
    <div className="relative h-[55vh] sm:h-[50vh] md:h-[50vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={courseImages[course.slug]}
          alt={course.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
      </div>
      <div className="relative h-full container flex items-center px-3 sm:px-6">
        <div className="max-w-2xl space-y-3 sm:space-y-5 animate-fade-in">
          <div className="space-y-1 sm:space-y-3">
            <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
              {course.title}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground line-clamp-2">
              {courseBenefits[course.slug as keyof typeof courseBenefits]}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <Button
              size="sm"
              asChild
              className="text-xs sm:text-sm md:text-base px-4 py-2.5 sm:px-6 md:px-8 sm:py-5 md:py-6 min-h-[36px] sm:min-h-[46px] md:min-h-[48px] transition-all duration-300 hover:shadow-[0_10px_40px_rgba(59,130,246,0.5)] hover:-translate-y-1"
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

/* ============================
   HERO CAROUSEL WRAPPER
============================ */

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
    "healthcare-insurance":
      "Master Health Insurance Operations & TPA Management",
    "healthcare-analytics": "Transform Healthcare Data into Strategic Insights",
    "medical-coding": "Start Your Career in Medical Coding & Billing",
    hmis: "Become a Hospital Information Systems Expert",
    "strategic-management": "Lead with Strategic Business Acumen",
    "human-resource-management": "Excel in Modern HR Practices",
    "quality-management": "Drive Quality Excellence in Organizations",
    "hr-analytics": "Leverage Data for HR Decision Making",
  };

  const totalSlides = courses.length;

  return (
    <div className="relative w-full bg-white">
      {/* 🔹 TOP: Big Who Should Choose Banner */}
      <WhoShouldChooseBanner />

      {/* 🔹 BOTTOM: only course sliding banner, with some gap */}
      <div
        className="relative mt-10 sm:mt-14 md:mt-20"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Carousel setApi={setApi} className="w-full" opts={{ loop: true }}>
          <CarouselContent>
            {courses.map((course) => (
              <CourseSlide
                key={course.id}
                course={course}
                courseBenefits={courseBenefits}
              />
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex left-2 md:left-8" />
          <CarouselNext className="hidden sm:flex right-2 md:right-8" />
        </Carousel>

        {/* Carousel Dots Indicator – attached to slider part only */}
        <div className="pointer-events-none absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 z-10 max-w-[90vw] overflow-x-auto">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className="pointer-events-auto w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-foreground/30 hover:bg-foreground/50 transition-colors shrink-0"
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
