import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";

interface CourseCardProps {
  title: string;
  description: string;
  duration: string;
  slug: string;
  image?: string;
}

const CourseCard = ({ title, description, duration, slug, image }: CourseCardProps) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateXValue = ((y - centerY) / centerY) * -10;
    const rotateYValue = ((x - centerX) / centerX) * 10;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div 
      ref={cardRef}
      className="h-full perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1000px',
      }}
    >
      <Card 
        className="h-full flex flex-col group hover:shadow-2xl hover:border-primary/30 transition-all duration-300 ease-out cursor-pointer overflow-hidden"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.1s ease-out',
        }}
      >
      {image && (
        <div className="relative h-48 w-full overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </div>
      )}
      <CardHeader>
        <div className="flex items-start justify-between gap-2 mb-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Award className="h-3 w-3" />
            Certificate
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {duration}
          </Badge>
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
            Industry-driven curriculum
          </li>
          <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
            Practical assignments
          </li>
          <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
            Internship support
          </li>
           <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
            Placement assistance
          </li>
           <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
            Expereince Letter
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          asChild 
          className="w-full transition-all duration-300 ease-out hover:shadow-lg"
          style={{
            transform: 'translateZ(30px)',
          }}
        >
          <Link to={`/course/${slug}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
    </div>
  );
};

export default CourseCard;
