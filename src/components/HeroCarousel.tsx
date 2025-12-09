import { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { courses } from "@/data/courses";
import { courseImages } from "@/data/courseImages";
import { whoShouldChooseData } from "@/data/whoShouldChooseData";
import type { CarouselApi } from "@/components/ui/carousel";
import { GraduationCap, Building2, CheckCheck, ChevronDown, Users } from "lucide-react";
import bannerBackground from "@/assets/who-should-choose-banner.jpg";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";


/* ------------------------------------------------------------------------------------------------
   PW.live style Mobile Who Should Choose Banner
---------------------------------------------------------------------------------------------------*/

const WhoShouldChooseBanner = () => (
  <section className="w-full bg-white px-4">
    <div className="relative w-full max-w-6xl mx-auto mt-2 sm:mt-0 border border-border/60 shadow-md overflow-hidden rounded-none">

      {/* Desktop premium badge */}
      <div className="hidden sm:block absolute top-4 right-4 z-20">
        <div className="premium-badge">
          <span className="premium-pill-text">
            Starting at <strong>₹999</strong> only
          </span>
        </div>
      </div>

      {/* Mobile premium */}
      <div className="sm:hidden pt-1 flex justify-center z-20">
        <div className="premium-badge inline-block px-3 py-1 text-[11px]">
          Starting at <strong>₹999</strong> only
        </div>
      </div>

      {/* Banner */}
      <div className="relative min-h-[55vh] sm:min-h-[65vh] bg-card flex flex-col sm:flex-row items-center justify-center">

        {/* Mobile image */}
        <div className="w-full sm:hidden">
          <img
            src={bannerBackground}
            alt="Professional"
            className="w-full max-h-[260px] object-cover rounded-md mt-3"
          />
        </div>

        {/* Desktop image background */}
        <div className="absolute inset-0 hidden sm:block">
          <img
            src={bannerBackground}
            alt="Professional"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute hidden sm:block inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/60" />

        {/* CONTENT */}
        <div className="relative w-full py-6 sm:py-10 px-2 sm:px-8">

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight text-center sm:text-left">
            Who Should Choose Us
          </h2>

          <p className="text-sm sm:text-base text-muted-foreground text-center sm:text-left mt-2">
            Empowering students & professionals with industry-ready skills.
          </p>

          {/* CTA */}
          <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center sm:justify-start ">
            <Button size="sm" asChild className="px-5 py-3 text-sm ">
              <Link to="/students-professionals">
                Students & Professionals
              </Link>
            </Button>

            <Button
              size="sm"
              variant="secondary"
              asChild
              className="px-5 py-3 text-sm bg-primary/20 hover:bg-primary/30"
            >
              <Link to="/corporate">
                Corporate
              </Link>
            </Button>
          </div>

          {/* Explore */}
          <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center sm:justify-start">
            <Button size="sm" asChild className="px-6 py-3 text-sm">
              <Link to="/courses">Explore Courses</Link>
            </Button>

            <span className="px-4 py-2 bg-accent/80 text-accent-foreground rounded-full text-xs font-medium inline-block self-center sm:self-auto">
              ZERO COST EMI AVAILABLE
            </span>
          </div>

          {/* benefits */}
          <div className="mt-4 flex flex-wrap justify-center sm:hidden gap-2">
            {[
              "Placement Assistance",
              "Mock Interviews",
              "Hands-on Training",
              "Certificates",
              "Recordings",
            ].map((b, i) => (
              <span key={i} className="bg-card/80 text-[10px] px-2 py-1 rounded-full border">
                {b}
              </span>
            ))}
          </div>

        </div>
      </div>
    </div>
  </section>
);


/* ------------------------------------------------------------------------------------------------
   Dropdown (unchanged)
---------------------------------------------------------------------------------------------------*/

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
          className="text-xs px-4 py-3 bg-primary/90 text-primary-foreground hover:bg-primary"
          onMouseEnter={() => window.innerWidth >= 768 && setIsOpen(true)}
          onMouseLeave={() => window.innerWidth >= 768 && setIsOpen(false)}
          onClick={() => window.innerWidth < 768 && setIsOpen(!isOpen)}
        >
          <Users className="w-4 h-4 mr-2" />
          Who Should Choose?
          <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-72 p-4 bg-card border shadow-xl">
        <h4 className="font-semibold text-sm flex items-center gap-2 mb-3">
          <Users className="w-4 h-4 text-primary" />
          This course is ideal for:
        </h4>
        <ul className="space-y-2">
          {targetAudience.map((a, i) => (
            <li key={i} className="flex gap-2 text-xs text-muted-foreground">
              <CheckCheck className="w-4 h-4 text-primary mt-0.5" />
              {a}
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};


/* ------------------------------------------------------------------------------------------------
   Course Slide
---------------------------------------------------------------------------------------------------*/

const CourseSlide = ({
  course,
  courseBenefits,
}: {
  course: typeof courses[0];
  courseBenefits: Record<string, string>;
}) => (
  <CarouselItem>
    <div className="relative h-[55vh] sm:h-[50vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={courseImages[course.slug]}
          alt={course.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
      </div>

      <div className="relative h-full container flex items-center px-4">
        <div className="max-w-xl space-y-3">
          <h2 className="text-lg sm:text-2xl font-bold">
            {course.title}
          </h2>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {courseBenefits[course.slug]}
          </p>

          <div className="flex flex-wrap gap-2">
            <Button size="sm" asChild>
              <Link to={`/courses/${course.slug}`}>Enroll Now</Link>
            </Button>
            <WhoShouldChooseButton courseSlug={course.slug} />
          </div>
        </div>
      </div>
    </div>
  </CarouselItem>
);


/* ------------------------------------------------------------------------------------------------
   Hero Carousel main
---------------------------------------------------------------------------------------------------*/

const HeroCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [isPaused, setIsPaused] = useState(false);

  const courseBenefits = {
    "healthcare-insurance": "Master Health Insurance Operations & TPA Management",
    "healthcare-analytics": "Transform Healthcare Data into Strategic Insights",
    "medical-coding": "Start Your Career in Medical Coding & Billing",
    "hmis": "Become a Hospital Information Systems Expert",
    "strategic-management": "Lead with Strategic Business Acumen",
    "human-resource-management": "Excel in Modern HR Practices",
    "quality-management": "Drive Quality Excellence in Organizations",
    "hr-analytics": "Leverage Data for HR Decision Making",
  };

  return (
    <div className="relative w-full bg-white">
      <WhoShouldChooseBanner />

      <div className="relative mt-10">
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

          <CarouselPrevious className="hidden sm:flex left-2" />
          <CarouselNext className="hidden sm:flex right-2" />
        </Carousel>
      </div>
    </div>
  );
};

export default HeroCarousel;
