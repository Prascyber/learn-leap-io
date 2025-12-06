import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut, ChevronDown, ChevronRight } from "lucide-react";
import logo from "@/assets/logo-edhere.png";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuPortal } from "@/components/ui/dropdown-menu";
import CartButton from "@/components/CartButton";
import { courses } from "@/data/courses";
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  const location = useLocation();
  const {
    user,
    signOut
  } = useAuth();
  const handleSignOut = async () => {
    await signOut();
  };
  const isActive = (path: string) => location.pathname === path;
  const navLinks = [{
    path: "/",
    label: "Home"
  }, {
    path: "/courses",
    label: "Courses"
  }, {
    path: "/about",
    label: "About Us"
  }, {
    path: "/contact",
    label: "Contact"
  }];
  return <nav className="sticky top-0 z-50 border-b border-border/50 bg-white">
      <div className="container flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center -ml-16 mr-4">
          <img src={logo} alt="EdHere Academy" className="h-20 w-36 border-0 rounded-none object-cover" />
        </Link> 

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(link => {
            if (link.path === "/courses") {
              return (
                <DropdownMenu key={link.path}>
                  <DropdownMenuTrigger asChild>
                    <button className={`text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 ${isActive(link.path) ? "text-primary" : "text-muted-foreground"}`}>
                      {link.label}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-64 bg-background border border-border shadow-lg z-50">
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link to="/courses" className="w-full font-medium">
                        View All Courses
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {courses.map((course) => (
                      <DropdownMenuSub key={course.id}>
                        <DropdownMenuSubTrigger className="cursor-pointer">
                          <span className="truncate">{course.title}</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent className="bg-background border border-border shadow-lg z-50">
                            <DropdownMenuItem asChild className="cursor-pointer">
                              <Link to={`/who-should-choose/${course.slug}`} className="w-full">
                                Who Should Choose
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild className="cursor-pointer">
                              <Link to={`/course/${course.slug}`} className="w-full">
                                View Course
                              </Link>
                            </DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            }
            return (
              <Link key={link.path} to={link.path} className={`text-sm font-medium transition-colors hover:text-primary ${isActive(link.path) ? "text-primary" : "text-muted-foreground"}`}>
                {link.label}
              </Link>
            );
          })}
          
          {user && <CartButton />}
          
          {user ? <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.user_metadata?.avatar_url} alt={user.user_metadata?.full_name || user.email} />
                    <AvatarFallback>
                      {user.user_metadata?.full_name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild className="cursor-pointer transition-colors hover:bg-accent">
                  <Link to="/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer transition-colors hover:bg-accent">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> : <Button size="sm" asChild>
              <Link to="/auth">Login</Link>
            </Button>}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && <div className="md:hidden border-t bg-background">
          <div className="container py-4 flex flex-col gap-2">
            {navLinks.map(link => {
              if (link.path === "/courses") {
                return (
                  <div key={link.path} className="flex flex-col">
                    <button 
                      onClick={() => setIsCoursesOpen(!isCoursesOpen)}
                      className={`text-sm font-medium transition-colors hover:text-primary flex items-center justify-between py-2 ${isActive(link.path) ? "text-primary" : "text-muted-foreground"}`}
                    >
                      {link.label}
                      <ChevronDown className={`h-4 w-4 transition-transform ${isCoursesOpen ? "rotate-180" : ""}`} />
                    </button>
                    
                    {isCoursesOpen && (
                      <div className="pl-4 flex flex-col gap-1 border-l-2 border-primary/20 ml-2">
                        <Link 
                          to="/courses" 
                          onClick={() => setIsMenuOpen(false)}
                          className="text-sm font-medium py-2 text-primary hover:text-primary/80"
                        >
                          View All Courses
                        </Link>
                        
                        {courses.map((course) => (
                          <div key={course.id} className="flex flex-col">
                            <button
                              onClick={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}
                              className="text-sm py-2 text-muted-foreground hover:text-primary flex items-center justify-between"
                            >
                              <span className="truncate pr-2">{course.title}</span>
                              <ChevronRight className={`h-4 w-4 flex-shrink-0 transition-transform ${expandedCourse === course.id ? "rotate-90" : ""}`} />
                            </button>
                            
                            {expandedCourse === course.id && (
                              <div className="pl-4 flex flex-col gap-1 border-l border-border ml-2">
                                <Link 
                                  to={`/who-should-choose/${course.slug}`}
                                  onClick={() => setIsMenuOpen(false)}
                                  className="text-sm py-2 text-muted-foreground hover:text-primary"
                                >
                                  Who Should Choose
                                </Link>
                                <Link 
                                  to={`/course/${course.slug}`}
                                  onClick={() => setIsMenuOpen(false)}
                                  className="text-sm py-2 text-muted-foreground hover:text-primary"
                                >
                                  View Course
                                </Link>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link key={link.path} to={link.path} onClick={() => setIsMenuOpen(false)} className={`text-sm font-medium transition-colors hover:text-primary py-2 ${isActive(link.path) ? "text-primary" : "text-muted-foreground"}`}>
                  {link.label}
                </Link>
              );
            })}
            
            {user ? <>
                <Button size="sm" variant="outline" asChild className="w-full">
                  <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </Button>
                <Button size="sm" variant="outline" onClick={() => {
            handleSignOut();
            setIsMenuOpen(false);
          }} className="w-full">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </> : <Button size="sm" asChild className="w-full">
                <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
              </Button>}
          </div>
        </div>}
    </nav>;
};
export default Navigation;