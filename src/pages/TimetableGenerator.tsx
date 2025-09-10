import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, Home, Plus, Eye, Edit, ArrowLeft, Zap, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const TimetableGenerator = () => {
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTimetable, setGeneratedTimetable] = useState(null);
  const { toast } = useToast();

  const branches = [
    { value: "bed", label: "B.Ed (Bachelor of Education)" },
    { value: "med", label: "M.Ed (Master of Education)" },
    { value: "fyup", label: "FYUP (Four Year Undergraduate Programme)" },
    { value: "itep", label: "ITEP (Integrated Teacher Education Programme)" }
  ];

  const divisions = [
    { value: "div-a", label: "Division A" },
    { value: "div-b", label: "Division B" },
    { value: "div-c", label: "Division C" }
  ];

  const handleGenerateTimetable = async () => {
    if (!selectedBranch || !selectedDivision) {
      toast({
        title: "Selection Required",
        description: "Please select both branch and division to generate timetable.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setGeneratedTimetable({
      branch: selectedBranch,
      division: selectedDivision,
      generatedAt: new Date().toLocaleString()
    });
    
    setIsGenerating(false);
    
    toast({
      title: "Timetable Generated Successfully!",
      description: "Conflict-free timetable has been created with AI optimization.",
    });
  };

  // Sample generated timetable data
  const sampleTimetable = [
    { 
      day: "Monday", 
      slots: [
        { time: "9:00-10:00", subject: "Educational Psychology", faculty: "Dr. Johnson", room: "Room 101" },
        { time: "10:00-11:00", subject: "Mathematics Methods", faculty: "Dr. Smith", room: "Room 203" },
        { time: "11:00-12:00", subject: "English Literature", faculty: "Prof. Williams", room: "Room 105" },
        { time: "2:00-4:00", subject: "Teaching Practice", faculty: "Dr. Brown", room: "Practice School" }
      ]
    },
    { 
      day: "Tuesday", 
      slots: [
        { time: "9:00-10:00", subject: "History of Education", faculty: "Dr. Davis", room: "Room 102" },
        { time: "10:00-11:00", subject: "Child Psychology", faculty: "Dr. Johnson", room: "Room 101" },
        { time: "11:00-12:00", subject: "Research Methodology", faculty: "Dr. Patel", room: "Room 201" },
        { time: "2:00-3:00", subject: "Art & Craft", faculty: "Ms. Taylor", room: "Art Studio" }
      ]
    },
    { 
      day: "Wednesday", 
      slots: [
        { time: "9:00-10:00", subject: "Mathematics Methods", faculty: "Dr. Smith", room: "Room 203" },
        { time: "10:00-11:00", subject: "Educational Technology", faculty: "Prof. Kumar", room: "Computer Lab" },
        { time: "11:00-12:00", subject: "Physical Education", faculty: "Mr. Wilson", room: "Gymnasium" },
        { time: "2:00-4:00", subject: "Science Lab", faculty: "Dr. Brown", room: "Lab A" }
      ]
    }
  ];

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
              <Link to="/admin">
                <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Admin
                </Button>
              </Link>
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
          <h1 className="text-4xl font-bold text-primary mb-2">Timetable Generator</h1>
          <p className="text-muted-foreground">Create optimized, NEP 2020 compliant timetables with AI</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Selection Panel */}
          <Card className="bg-card/50 backdrop-blur-sm shadow-card">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <CardTitle className="text-primary">Generate New Timetable</CardTitle>
                  <CardDescription>Select branch and division to create AI-optimized schedule</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium text-primary mb-2 block">Select Branch/Program</label>
                <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a program" />
                  </SelectTrigger>
                  <SelectContent>
                    {branches.map((branch) => (
                      <SelectItem key={branch.value} value={branch.value}>
                        {branch.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-primary mb-2 block">Select Division</label>
                <Select value={selectedDivision} onValueChange={setSelectedDivision}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a division" />
                  </SelectTrigger>
                  <SelectContent>
                    {divisions.map((division) => (
                      <SelectItem key={division.value} value={division.value}>
                        {division.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col space-y-3 pt-4">
                <Button 
                  onClick={handleGenerateTimetable}
                  disabled={isGenerating}
                  className="bg-primary hover:bg-primary-light"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Generate New Timetable
                    </>
                  )}
                </Button>
                
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  <Eye className="w-4 h-4 mr-2" />
                  View Existing Timetables
                </Button>
                
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  <Edit className="w-4 h-4 mr-2" />
                  Modify Existing Timetable
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* AI Features Panel */}
          <Card className="bg-card/50 backdrop-blur-sm shadow-card">
            <CardHeader>
              <CardTitle className="text-primary">AI-Powered Features</CardTitle>
              <CardDescription>Advanced timetable optimization capabilities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Conflict Detection",
                    description: "Automatically prevents faculty and room scheduling conflicts",
                    status: "active"
                  },
                  {
                    title: "NEP 2020 Compliance",
                    description: "Ensures credit distribution aligns with new education policy",
                    status: "active"
                  },
                  {
                    title: "Workload Optimization",
                    description: "Balances faculty teaching hours and distribution",
                    status: "active"
                  },
                  {
                    title: "Preference Learning",
                    description: "Adapts to institutional scheduling preferences over time",
                    status: "coming-soon"
                  }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-accent/30">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-primary">{feature.title}</span>
                        <Badge 
                          variant={feature.status === 'active' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {feature.status === 'active' ? 'Active' : 'Coming Soon'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Generated Timetable Preview */}
        {generatedTimetable && (
          <Card className="bg-card/50 backdrop-blur-sm shadow-card mt-8">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-primary">Generated Timetable Preview</CardTitle>
                <CardDescription>
                  {branches.find(b => b.value === generatedTimetable.branch)?.label} - {divisions.find(d => d.value === generatedTimetable.division)?.label}
                </CardDescription>
                <p className="text-xs text-muted-foreground mt-1">Generated: {generatedTimetable.generatedAt}</p>
              </div>
              <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 min-w-[900px]">
                  {sampleTimetable.map((day) => (
                    <Card key={day.day} className="bg-accent/30">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg text-primary text-center">{day.day}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {day.slots.map((slot, index) => (
                          <div key={index} className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-sm">
                            <div className="font-medium text-primary mb-1">{slot.time}</div>
                            <div className="text-foreground font-medium">{slot.subject}</div>
                            <div className="text-muted-foreground text-xs">{slot.faculty}</div>
                            <div className="text-muted-foreground text-xs">{slot.room}</div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <h4 className="text-primary font-medium mb-2">AI Optimization Results:</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Conflicts Resolved:</span>
                    <span className="ml-2 font-medium text-primary">12</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Faculty Utilization:</span>
                    <span className="ml-2 font-medium text-primary">94%</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Room Efficiency:</span>
                    <span className="ml-2 font-medium text-primary">87%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TimetableGenerator;