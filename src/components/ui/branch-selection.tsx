import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BranchSelectionProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userRole: "student" | "faculty";
  onSelection: (branch: string, division?: string) => void;
}

const branches = [
  "Computer Engineering",
  "Information Technology", 
  "Electronics Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Data Science"
];

const divisions = ["A", "B", "C", "D"];

export const BranchSelection = ({ open, onOpenChange, userRole, onSelection }: BranchSelectionProps) => {
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [selectedDivision, setSelectedDivision] = useState<string>("");

  const handleProceed = () => {
    if (selectedBranch && (userRole === "faculty" || selectedDivision)) {
      onSelection(selectedBranch, selectedDivision);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-primary text-xl">
            {userRole === "student" ? "Student Portal" : "Faculty Portal"}
          </DialogTitle>
        </DialogHeader>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Select Your Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Branch/Department
              </label>
              <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                <SelectTrigger>
                  <SelectValue placeholder="Select branch" />
                </SelectTrigger>
                <SelectContent>
                  {branches.map((branch) => (
                    <SelectItem key={branch} value={branch}>
                      {branch}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {userRole === "student" && (
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Division
                </label>
                <Select value={selectedDivision} onValueChange={setSelectedDivision}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select division" />
                  </SelectTrigger>
                  <SelectContent>
                    {divisions.map((division) => (
                      <SelectItem key={division} value={division}>
                        Division {division}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <Button 
              onClick={handleProceed}
              disabled={!selectedBranch || (userRole === "student" && !selectedDivision)}
              className="w-full bg-primary hover:bg-primary-light"
            >
              Proceed to Dashboard
            </Button>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};