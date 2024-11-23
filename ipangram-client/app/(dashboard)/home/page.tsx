// app/(authenticated)/dashboard/page.tsx
"use client";

import { useCallback, useEffect, useState } from "react";
import EmployeeDashboard from "./employeeDashboard";
import { getEmployees } from "@/server-actions/employees";
import { useAuth } from "@/app/context/userContext";

const DashboardPage = () => {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [employees, setEmployees] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchEmployees = useCallback(async (page: number) => {
    setLoading(true);
    try {
      const response = await getEmployees(page);

      if (response.success) {
        console.log(response, "VERVE");
        setEmployees(response.data);
        setTotalPages(response.data.pagination.pages);
      }
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployees(currentPage);
  }, [currentPage, fetchEmployees]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
    />
  );
};

export default DashboardPage;
