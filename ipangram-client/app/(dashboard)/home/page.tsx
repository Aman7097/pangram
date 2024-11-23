// app/(authenticated)/dashboard/page.tsx
"use client";

import { useCallback, useEffect, useState } from "react";
import EmployeeDashboard from "./employeeDashboard";
import { getEmployees } from "@/server-actions/employees";
import { useAuth } from "@/app/context/userContext";
import { Employee } from "@/app/types/user";

type FilterOption = "locationAsc" | "locationDesc" | "nameAsc" | "nameDesc";

type GetEmployeesFunction = (
  page: number,
  filter?: FilterOption | null
) => Promise<any>;
const DashboardPage = () => {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentFilter, setCurrentFilter] = useState<FilterOption | null>(null);

  const fetchEmployees = useCallback(
    async (page: number, filter: FilterOption | null = null) => {
      setLoading(true);
      try {
        const response: any = await (getEmployees as GetEmployeesFunction)(
          page,
          filter
        );

        console.log(response, "fdebedf");
        if (response.success) {
          setEmployees(response.data);
          setTotalPages(response.pagination.pages);
        } else {
          // Handle unsuccessful response
          console.error("Failed to fetch employees:", response);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
        // Optionally set an error state here
      } finally {
        setLoading(false);
      }
    },
    [currentPage]
  );

  useEffect(() => {
    fetchEmployees(currentPage, currentFilter);
  }, [currentPage, currentFilter, fetchEmployees]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleFilterChange = useCallback((filter: FilterOption) => {
    setCurrentFilter(filter);
    setCurrentPage(1); // Reset to first page when changing filter
  }, []);

  // Function to refresh the employee list
  const refreshEmployees = useCallback(() => {
    fetchEmployees(currentPage, currentFilter);
  }, [currentPage, currentFilter, fetchEmployees]);
  if (loading && employees.length === 0) {
    return <div>Loading...</div>; // Or a better loading component
  }

  return (
    <EmployeeDashboard
      isManager={user?.role === "manager"}
      employees={employees}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      loading={loading}
      handleFilterChange={handleFilterChange}
    />
  );
};

export default DashboardPage;
