"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Star, MapPin } from "lucide-react";
import { Employee } from "@/app/types/user";

interface EmployeeCardProps {
  employee: Employee;
  isManager?: boolean;
  onDetailsClick?: (employee: any) => void;
  handleAssignTo: any;
  openAssignModal: (employee: any) => void;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({
  employee,
  isManager = false,
  onDetailsClick,
  handleAssignTo,
  openAssignModal,
}) => {
  const handleDetailsClick = () => {
    onDetailsClick?.(employee);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="w-12 h-12 text-gray-500" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">
                {employee.firstName} {employee.lastName}
              </h3>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />
              </div>
            </div>

            <div className="flex items-center text-gray-600 mt-1">
              <span className="mr-2">{employee.jobRole}</span>
            </div>

            <div className="flex items-center text-gray-600 mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{employee.location}</span>
            </div>

            <div className="flex items-center justify-end space-x-2 mt-3">
              {isManager && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-azure-700 hover:text-sky-700"
                    onClick={() => openAssignModal(employee)}
                  >
                    Assign To
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-blue-600 hover:text-blue-700"
                    onClick={handleDetailsClick}
                  >
                    Details
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeeCard;
