// app/(authenticated)/departments/page.tsx
"use client";

import { useCallback, useEffect, useState } from "react";
import DepartmentDashboard from "./departmentDashboard";
import {
  createDepartment,
  deleteDepartment,
  updateDepartment,
  listDepartments,
} from "@/server-actions/departments";
import toast from "react-hot-toast";

interface Department {
  _id: string;
  name: string;
  description: string;
  employeeCount: number;
}

const DepartmentsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchDepartments = useCallback(async (page: number) => {
    setLoading(true);
    try {
      const response = await listDepartments(page);

      if (response.success) {
        setDepartments(response.data);
        setTotalPages(response.data.pagination.pages);
      }
    } catch (error) {
      console.error("Failed to fetch departments:", error);
      toast.error("Failed to load departments");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDepartments(currentPage);
  }, [currentPage, fetchDepartments]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleAddDepartment = async (data: {
    name: string;
    description: string;
  }) => {
    try {
      const result = await createDepartment(data);
      if (result.success) {
        toast.success("Department created successfully");
        fetchDepartments(currentPage);
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("Failed to create department");
    }
  };

  const handleUpdateDepartment = async (
    _id: string,
    data: { name: string; description: string }
  ) => {
    try {
      const result = await updateDepartment(_id, data);
      if (result.success) {
        toast.success("Department updated successfully");
        fetchDepartments(currentPage);
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("Failed to update department");
    }
  };

  const handleDeleteDepartment = async (id: string) => {
    try {
      const result = await deleteDepartment(id);
      if (result.success) {
        toast.success("Department deleted successfully");
        fetchDepartments(currentPage);
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("Failed to delete department");
    }
  };

  return (
    <DepartmentDashboard
      departments={departments}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      onAddDepartment={handleAddDepartment}
      onUpdateDepartment={handleUpdateDepartment}
      onDeleteDepartment={handleDeleteDepartment}
      loading={loading}
    />
  );
};

export default DepartmentsPage;
