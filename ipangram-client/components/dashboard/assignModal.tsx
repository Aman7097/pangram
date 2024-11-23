"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

interface Department {
  _id: string;
  name: string;
}

interface AssignDepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  employeeName: string;
  currentDepartment?: string;
  departments: Department[];
  onAssign: (departmentId: string) => Promise<void>;
  loading?: boolean;
}

const AssignDepartmentModal = ({
  isOpen,
  onClose,
  employeeName,
  currentDepartment,
  departments,
  onAssign,
  loading = false,
}: AssignDepartmentModalProps) => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>(
    currentDepartment || ""
  );

  const handleAssign = async () => {
    if (selectedDepartment) {
      await onAssign(selectedDepartment);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-ocean-50">
        <DialogHeader>
          <DialogTitle>Assign Department</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Employee</Label>
            <p className="text-sm text-muted-foreground">{employeeName}</p>
          </div>

          <div className="space-y-2">
            <Label>Current Department</Label>
            <p className="text-sm text-muted-foreground">
              {currentDepartment || "No department assigned"}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="department">Select Department</Label>
            <Select
              value={selectedDepartment}
              onValueChange={setSelectedDepartment}
            >
              <SelectTrigger id="department" className="w-full">
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((department) => (
                  <SelectItem key={department._id} value={department._id}>
                    {department.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="flex space-x-2 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleAssign}
            disabled={!selectedDepartment || loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Assigning...
              </>
            ) : (
              "Assign Department"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssignDepartmentModal;
