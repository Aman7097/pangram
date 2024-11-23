"use client";

import { departments } from "@/dummyData/employees";
import DepartmentDashboard from "./departmentDashboard";

// import { useState } from "react";

const DepartmentsPage = () => {
  const handleAdd = () => {
    // Open add department modal/form
  };

  const handleEdit = (id: string) => {
    console.log(id);
    // Open edit department modal/form
  };

  const handleDelete = (id: string) => {
    console.log(id);

    // Show confirmation dialog and delete
  };

  return (
    <DepartmentDashboard
      departments={departments}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
};

export default DepartmentsPage;
