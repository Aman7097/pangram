"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Pencil, Trash2 } from "lucide-react";

interface Department {
  _id: string;
  name: string;
  description: string;
  employeeCount: number;
}

interface DepartmentCardProps {
  department: Department;
  onEdit: (department: Department) => void;
  onDelete: (department: Department) => void;
}

const DepartmentCard: React.FC<DepartmentCardProps> = ({
  department,
  onEdit,
  onDelete,
}) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-xl text-gray-800">
                {department.name}
              </h3>
              <p className="text-gray-600 mt-1">{department.description}</p>
            </div>
          </div>

          <div className="flex items-center text-gray-600">
            <Users className="w-5 h-5 mr-2" />
            <span>{department.employeeCount} Employees</span>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <Button
              variant="outline"
              size="sm"
              className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
              onClick={() => onEdit(department)}
            >
              <Pencil className="w-4 h-4" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-red-600 hover:text-red-700 flex items-center gap-2"
              onClick={() => onDelete(department)}
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DepartmentCard;
