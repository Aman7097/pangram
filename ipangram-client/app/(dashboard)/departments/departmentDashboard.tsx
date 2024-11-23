import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Users } from "lucide-react";
import { AddDepartmentModal } from "@/components/departments/addDepartmentModal";
import { EditDepartmentModal } from "@/components/departments/editDepartmentModal";
import { DeleteDepartmentModal } from "@/components/departments/deleteDepartmentModal";
import { usePathname } from "next/navigation";
import DepartmentCard from "@/components/dashboard/departmentCard";

interface Department {
  _id: string;
  name: string;
  description: string;
  employeeCount: number;
}

interface DepartmentDashboardProps {
  departments: Department[];
  currentPage: number;
  totalPages: number;
  loading: boolean;
  onPageChange: (page: number) => void;
  onAddDepartment: (data: {
    name: string;
    description: string;
  }) => Promise<void>;
  onUpdateDepartment: (
    _id: string,
    data: { name: string; description: string }
  ) => Promise<void>;
  onDeleteDepartment: (_id: string) => Promise<void>;
}

const DepartmentDashboard: React.FC<DepartmentDashboardProps> = ({
  departments,
  currentPage,
  totalPages,
  loading,
  onPageChange,
  onAddDepartment,
  onUpdateDepartment,
  onDeleteDepartment,
}) => {
  const pathname = usePathname();

  const isActiveLink = (path: string) => {
    return pathname === path ? "bg-gray-100" : "bg-white";
  };

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] =
    useState<Department | null>(null);
  const [isModalLoading, setIsModalLoading] = useState(false);

  const handleAdd = async (data: { name: string; description: string }) => {
    setIsModalLoading(true);
    try {
      await onAddDepartment(data);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Error adding department:", error);
    } finally {
      setIsModalLoading(false);
    }
  };

  const handleEdit = (department: Department) => {
    setSelectedDepartment(department);
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (data: { name: string; description: string }) => {
    if (!selectedDepartment) return;
    setIsModalLoading(true);
    try {
      console.log(selectedDepartment, "");
      await onUpdateDepartment(selectedDepartment._id, data);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating department:", error);
    } finally {
      setIsModalLoading(false);
    }
  };

  const handleDelete = (department: Department) => {
    setSelectedDepartment(department);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedDepartment) return;
    setIsModalLoading(true);
    try {
      await onDeleteDepartment(selectedDepartment._id);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting department:", error);
    } finally {
      setIsModalLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex items-end w-full justify-end py-4">
        <Button
          variant="ghost"
          className="bg-blue-500  text-white px-4 py-2 rounded-full shadow-sm flex items-center gap-2"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus className="w-4 h-4" />
          Add Department
        </Button>
      </div>

      {/* Department Cards Grid */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`}>
        {departments.map((department) => (
          <DepartmentCard
            key={department._id}
            department={department}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Modals */}
      <AddDepartmentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAdd}
        isLoading={isModalLoading}
      />

      {selectedDepartment && (
        <>
          <EditDepartmentModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            department={{
              _id: selectedDepartment._id,
              name: selectedDepartment.name,
              description: selectedDepartment.description,
            }}
            onSubmit={handleUpdate}
            isLoading={isModalLoading}
          />

          <DeleteDepartmentModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            department={{
              _id: selectedDepartment._id,
              name: selectedDepartment.name,
              description: selectedDepartment.description,
            }}
            onConfirm={handleConfirmDelete}
            isLoading={isModalLoading}
          />
        </>
      )}
    </div>
  );
};

export default DepartmentDashboard;
