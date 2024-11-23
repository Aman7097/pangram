import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Users } from "lucide-react";

interface Department {
  id: string;
  name: string;
  description: string;
  employeeCount: number;
}

interface DepartmentDashboardProps {
  departments: Department[];
  onAdd: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const DepartmentDashboard = ({
  departments,
  onAdd,
  onEdit,
  onDelete,
}: DepartmentDashboardProps) => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="bg-[#F8F9FA] p-4 w-full rounded-lg mb-8">
        <div className=" w-full flex items-center justify-between">
          <div className="w-full flex gap-4">
            {/* {isManager && ( */}
            <Button
              variant="ghost"
              className="bg-white w-full hover:bg-gray-50 text-gray-700 px-6 py-2 rounded-full shadow-sm"
            >
              Departments
            </Button>
            {/* )} */}
            <Button
              variant="ghost"
              className="bg-white w-full hover:bg-gray-50 text-gray-700 px-6 py-2 rounded-full shadow-sm"
            >
              All Employees
            </Button>
          </div>
        </div>
      </div>

      <div className="flex items-end w-full justify-end py-4">
        <Button
          variant="ghost"
          className="bg-blue-400 hover:bg-gray-50 text-white px-4 py-2 rounded-full shadow-sm flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Department
        </Button>
      </div>

      {/* Department Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((department) => (
          <Card
            key={department.id}
            className="overflow-hidden hover:shadow-lg transition-shadow"
          >
            <CardContent className="p-6">
              <div className="flex flex-col space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-xl text-gray-800">
                      {department.name}
                    </h3>
                    <p className="text-gray-600 mt-1">
                      {department.description}
                    </p>
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
                    onClick={() => onEdit(department.id)}
                  >
                    <Pencil className="w-4 h-4" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700 flex items-center gap-2"
                    onClick={() => onDelete(department.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DepartmentDashboard;
