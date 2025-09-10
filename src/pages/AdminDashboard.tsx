import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, MessageSquare, Plus, Eye, Edit, Home, Bell } from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [messages] = useState([
    { id: 1, faculty: "Dr. Smith", message: "Not available Monday 10-11 AM", time: "2 hours ago", status: "unread" },
    { id: 2, faculty: "Prof. Johnson", message: "Lab unavailable Friday afternoon", time: "5 hours ago", status: "read" },
    { id: 3, faculty: "Dr. Williams", message: "Requesting schedule change for Tuesday", time: "1 day ago", status: "unread" },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent via-secondary to-muted">
      {/* Header */}
      <header className="bg-primary shadow-elegant">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-primary-foreground" />
                </div>
                <h1 className="text-2xl font-bold text-primary-foreground">Timetable AI</h1>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-primary-foreground/10 text-primary-foreground">
                Admin Panel
              </Badge>
              <Link to="/">
                <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage timetables and faculty communications</p>
        </div>

        {/* Main Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Timetable Management */}
          <Card className="bg-card/50 backdrop-blur-sm shadow-card hover:shadow-elegant transition-all duration-300">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <CardTitle className="text-primary">Timetable Management</CardTitle>
                  <CardDescription>Generate and manage academic schedules</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/admin/generate-timetable">
                <Button className="w-full justify-start bg-primary hover:bg-primary-light">
                  <Plus className="w-4 h-4 mr-2" />
                  Generate New Timetable
                </Button>
              </Link>
              <Button variant="outline" className="w-full justify-start border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Eye className="w-4 h-4 mr-2" />
                View Existing Timetables
              </Button>
              <Button variant="outline" className="w-full justify-start border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Edit className="w-4 h-4 mr-2" />
                Modify Timetables
              </Button>
            </CardContent>
          </Card>

          {/* Faculty Inbox */}
          <Card className="bg-card/50 backdrop-blur-sm shadow-card hover:shadow-elegant transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-light to-primary-lighter rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-primary">Faculty Inbox</CardTitle>
                    <CardDescription>Messages from faculty members</CardDescription>
                  </div>
                </div>
                <Badge variant="destructive" className="bg-destructive">
                  {messages.filter(m => m.status === 'unread').length} New
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`p-3 rounded-lg border transition-colors ${
                      msg.status === 'unread' 
                        ? 'bg-accent border-primary/20' 
                        : 'bg-muted/50 border-border'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-primary">{msg.faculty}</span>
                      <span className="text-xs text-muted-foreground">{msg.time}</span>
                    </div>
                    <p className="text-sm text-foreground">{msg.message}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card/30 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Total Programs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">8</div>
              <p className="text-xs text-muted-foreground">B.Ed, M.Ed, FYUP, ITEP</p>
            </CardContent>
          </Card>
          <Card className="bg-card/30 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Active Faculty</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">45</div>
              <p className="text-xs text-muted-foreground">Across all departments</p>
            </CardContent>
          </Card>
          <Card className="bg-card/30 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">1,250</div>
              <p className="text-xs text-muted-foreground">Enrolled this semester</p>
            </CardContent>
          </Card>
          <Card className="bg-card/30 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Timetables</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">12</div>
              <p className="text-xs text-muted-foreground">Generated this month</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-card/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-primary">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Button variant="outline" className="justify-start border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Users className="w-4 h-4 mr-2" />
                Manage Faculty
              </Button>
              <Button variant="outline" className="justify-start border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Calendar className="w-4 h-4 mr-2" />
                Academic Calendar
              </Button>
              <Button variant="outline" className="justify-start border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Bell className="w-4 h-4 mr-2" />
                Send Notifications
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;