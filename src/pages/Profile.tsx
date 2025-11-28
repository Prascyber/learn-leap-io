import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, BookOpen, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Enrollment {
  id: string;
  course_title: string;
  course_slug: string;
  enrolled_at: string;
  payment_status: string;
}

interface Profile {
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
}

const Profile = () => {
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchProfileData();
      fetchEnrollments();
    }
  }, [user]);

  const fetchProfileData = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user!.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load profile data",
        variant: "destructive",
      });
    }
  };

  const fetchEnrollments = async () => {
    try {
      const { data, error } = await supabase
        .from("course_enrollments")
        .select("*")
        .eq("user_id", user!.id)
        .order("enrolled_at", { ascending: false });

      if (error) throw error;
      setEnrollments(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load enrollments",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !profile) {
    return null;
  }

  const initials = profile.full_name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() || "U";

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5 border-b">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Card className="transition-all duration-300 hover:scale-[1.01] hover:shadow-xl">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20 transition-transform duration-300 hover:scale-110">
                    <AvatarImage src={profile.avatar_url || ""} alt={profile.full_name || ""} />
                    <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-2xl">{profile.full_name || "Student"}</CardTitle>
                    <p className="text-muted-foreground">{profile.email}</p>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 flex-1">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold">My Enrolled Courses</h2>
            
            {enrollments.length === 0 ? (
              <Card className="transition-all duration-300 hover:scale-[1.01]">
                <CardContent className="py-12 text-center">
                  <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg text-muted-foreground mb-4">
                    You haven't enrolled in any courses yet
                  </p>
                  <Button asChild>
                    <Link to="/courses">Browse Courses</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {enrollments.map((enrollment) => (
                  <Card 
                    key={enrollment.id}
                    className="transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:border-primary"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-2">
                            {enrollment.course_title}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>
                              Enrolled on {new Date(enrollment.enrolled_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <Button 
                          asChild
                          className="transition-all duration-300 hover:scale-110"
                        >
                          <Link to={`/course/${enrollment.course_slug}`}>
                            Go to Course
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Profile;
