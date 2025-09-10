import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, BookOpen, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-timetable.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-accent via-secondary to-muted">
      {/* Header */}
      <header className="bg-primary shadow-elegant">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-primary-foreground">Timetable AI</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <span className="text-primary-foreground/80">Features</span>
              <span className="text-primary-foreground/80">About</span>
              <span className="text-primary-foreground/80">Contact</span>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-primary mb-6 leading-tight">
                Automated, Conflict-Free, 
                <span className="text-primary-light block">Flexible Schedules</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Built for NEP 2020 — trusted by colleges and teacher education institutes. 
                Generate optimized timetables with AI-powered conflict resolution.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary text-primary-foreground shadow-lg">
                  Generate My Timetable
                </Button>
                <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  See Demo
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Timetable Generation Interface" 
                className="rounded-2xl shadow-elegant w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Login Cards */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Access Your Dashboard</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="bg-card/50 backdrop-blur-sm shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-2">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-primary">Admin Dashboard</CardTitle>
                <CardDescription>
                  Generate timetables, manage faculty requests, and oversee schedules
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/admin">
                  <Button className="w-full bg-primary hover:bg-primary-light">
                    Admin Login
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-2">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-light to-primary-lighter rounded-full mx-auto mb-4 flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-primary">Faculty Dashboard</CardTitle>
                <CardDescription>
                  View your schedule and communicate availability to admin
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/faculty">
                  <Button className="w-full bg-primary-light hover:bg-primary-lighter">
                    Faculty Login
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-2">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-lighter to-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Clock className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-primary">Student Dashboard</CardTitle>
                <CardDescription>
                  Access your personalized class schedule and timetable
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/student">
                  <Button className="w-full bg-primary-lighter hover:bg-secondary text-primary">
                    Student Login
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">NEP 2020 Compliant Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Calendar, title: "Flexible Schedules", desc: "Accommodates Major, Minor, and Skill-based courses" },
              { icon: Users, title: "Faculty Management", desc: "Optimized workload distribution and availability" },
              { icon: BookOpen, title: "Multi-Program Support", desc: "B.Ed, M.Ed, FYUP, and ITEP programs" },
              { icon: Clock, title: "Conflict Resolution", desc: "AI-powered clash detection and prevention" }
            ].map((feature, index) => (
              <Card key={index} className="text-center bg-card/30 backdrop-blur-sm">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg text-primary">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8 px-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Timetable AI. Built for NEP 2020 compliance.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;