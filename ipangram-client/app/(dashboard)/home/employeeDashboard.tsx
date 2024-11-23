"use client";
import { useEffect, useState } from "react";
import Pagination from "@/components/dashboard/paginationBar";
import EmployeeCard from "@/components/dashboard/employeeCard";
import FilterDropdown from "@/components/dashboard/filter";
import EmployeeDetailsModal from "@/components/dashboard/employeeDetailsModal";
import { Employee } from "@/app/types/user";
import toast from "react-hot-toast";
import { deleteEmployee, updateEmployee } from "@/server-actions/employees";
import AssignDepartmentModal from "@/components/dashboard/assignModal";
import {
  assignEmployeesToDepartment,
  listDepartments,
} from "@/server-actions/departments";

interface EmployeeDashboardProps {
  isManager: boolean;
  employees: Employee[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  handleFilterChange: any;
  loading: boolean;
}

const EmployeeDashboard = ({
  isManager,
  employees,
  currentPage,
  totalPages,
  onPageChange,
  handleFilterChange,
  loading,
}: EmployeeDashboardProps) => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [departments, setDepartments] = useState<any[]>([]);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isAssigning, setIsAssigning] = useState(false);

  const handleUpdateEmployee = async (employeeId: string, data: any) => {
    try {
      const response = await updateEmployee(employeeId, data);
      toast.success("Employee updated successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to update employee");
    }
  };

  const handleDeleteEmployee = async (employeeId: string) => {
    try {
      await deleteEmployee(employeeId);
      toast.success("Employee deleted successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to delete employee");
    }
  };

  const onDetailsClick = async (employee: any) => {
    // Call your API to delete the employee
    setSelectedEmployee(employee);
  };

  const openAssignModal = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsAssignModalOpen(true);
  };

  const handleAssignTo = async (departmentId: string) => {
    if (!selectedEmployee) return;

    setIsAssigning(true);
    try {
      const response = await assignEmployeesToDepartment(departmentId, [
        selectedEmployee._id,
      ]);

      if (response.success) {
      } else {
        console.error(response.error);
      }
    } catch (error) {
      console.error("Failed to assign department:", error);
    } finally {
      setIsAssigning(false);
    }
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await listDepartments();
        if (response.success) {
          setDepartments(response.data);
        } else {
          console.error("Failed to fetch departments:", response.error);
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
      } finally {
      }
    };

    if (isAssignModalOpen) {
      fetchDepartments();
    }
  }, [isAssignModalOpen]);

  return (
    <div className="container mx-auto px-4">
      <div className="flex items-end w-full justify-end">
        <FilterDropdown onFilterChange={handleFilterChange} />
      </div>

      {loading ? (
        <div className="opacity-50"></div>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {employees.map((employee) => (
              <EmployeeCard
                key={employee._id}
                employee={employee}
                isManager={isManager}
                onDetailsClick={onDetailsClick}
                handleAssignTo={handleAssignTo}
                openAssignModal={openAssignModal}
              />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            maxVisiblePages={1}
            className="mt-8"
          />
        </div>
      )}

      {selectedEmployee && !isAssignModalOpen && (
        <EmployeeDetailsModal
          isOpen={!!selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
          employee={selectedEmployee}
          isManager={isManager}
          onUpdate={handleUpdateEmployee}
          onDelete={handleDeleteEmployee}
        />
      )}

      {selectedEmployee && isAssignModalOpen && (
        <AssignDepartmentModal
          isOpen={isAssignModalOpen}
          onClose={() => {
            setIsAssignModalOpen(false);
            setSelectedEmployee(null);
          }}
          employeeName={`${selectedEmployee.firstName} ${selectedEmployee.lastName}`}
          currentDepartment={selectedEmployee.department || "NONE"}
          departments={departments}
          onAssign={handleAssignTo}
          loading={isAssigning}
        />
      )}
    </div>
  );
};

export default EmployeeDashboard;
