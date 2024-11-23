"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Filter, MapPin, Star, User } from "lucide-react";

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  jobRole: string;
  userType: string;
  location: string;
  rating: number;
  availability: "Available" | "Unavailable";
  imageUrl: string;
}

interface EmployeeDashboardProps {
  isManager: boolean;
  employees: Employee[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  loading: boolean;
}

const EmployeeDashboard = ({
  isManager,
  employees,
  currentPage,
  totalPages,
  onPageChange,
  loading,
}: EmployeeDashboardProps) => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="bg-[#F8F9FA] p-4 w-full rounded-lg mb-8">
        <div className=" w-full flex items-center justify-between">
          <div className="w-full flex gap-4">
            {isManager && (
              <Button
                variant="ghost"
                className="bg-white w-full hover:bg-gray-50 text-gray-700 px-6 py-2 rounded-full shadow-sm"
              >
                Departments
              </Button>
            )}
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
          className="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-full shadow-sm flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </div>

      {/* Employee Cards Grid */}
      {loading ? (
        <div className="opacity-50">
          {/* Your existing content - will be shown with opacity */}
        </div>
      ) : (
        <div>
          {/* Your existing content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {employees.map((employee) => (
              <Card
                key={employee.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
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
                          <span>{employee.rating}</span>
                        </div>
                      </div>

                      <div className="flex items-center text-gray-600 mt-1">
                        <span className="mr-2">{employee.jobRole}</span>
                      </div>

                      <div className="flex items-center text-gray-600 mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{employee.location}</span>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <span
                          className={`text-sm ${
                            employee.availability === "Available"
                              ? "text-green-500"
                              : "text-gray-500"
                          }`}
                        >
                          {employee.availability}
                        </span>
                        {isManager && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-blue-600 hover:text-blue-700"
                          >
                            Details
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-8 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => onPageChange(page)}
              >
                {page}
              </Button>
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDashboard;
