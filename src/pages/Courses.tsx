import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CourseCard from "@/components/CourseCard";
import { courses } from "@/data/courses";
import { courseImages } from "@/data/courseImages";

const Courses = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5 border-b">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold">Our Courses</h1>
            <p className="text-xl text-muted-foreground">
              Comprehensive programs designed to make you industry-ready with practical skills and certifications
            </p>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                title={course.title}
                description={course.shortDescription}
                duration={course.duration}
                slug={course.slug}
                image={courseImages[course.slug]}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Courses;
