/* eslint-disable @typescript-eslint/no-explicit-any */
// app/actions/departments.ts
"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:7097/api/v1";

interface Department {
  _id: string;
  name: string;
  description: string;
  manager: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  employees: Array<{
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  }>;
}

// Helper function to get auth header
const getAuthHeader = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Create department
export async function createDepartment(data: {
  name: string;
  description: string;
}) {
  try {
    const response = await axios.post(
      `${API_URL}/departments`,
      data,
      getAuthHeader()
    );
    revalidatePath("/departments");
    return { success: true, data: response.data.data };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Failed to create department",
    };
  }
}

// Update department
export async function updateDepartment(
  id: string,
  data: { name: string; description: string }
) {
  try {
    const response = await axios.put(
      `${API_URL}/departments/${id}`,
      data,
      getAuthHeader()
    );
    revalidatePath("/departments");
    return { success: true, data: response.data.data };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Failed to update department",
    };
  }
}

// Delete department
export async function deleteDepartment(id: string) {
  try {
    await axios.delete(`${API_URL}/departments/${id}`, getAuthHeader());
    revalidatePath("/departments");
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Failed to delete department",
    };
  }
}

// List departments with pagination
export async function listDepartments(page = 1, limit = 6) {
  try {
    const response = await axios.get<any>(
      `${API_URL}/departments?page=${page}&limit=${limit}`,
      getAuthHeader()
    );
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Failed to fetch departments",
    };
  }
}

// Get department by ID
export async function getDepartmentById(id: string) {
  try {
    const response = await axios.get<{ success: boolean; data: Department }>(
      `${API_URL}/departments/${id}`,
      getAuthHeader()
    );
    return { success: true, data: response.data.data };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Failed to fetch department",
    };
  }
}

// Assign employees to department
export async function assignEmployeesToDepartment(
  id: string,
  employeeIds: string[]
) {
  try {
    const response = await axios.post(
      `${API_URL}/departments/${id}/assign/employee`,
      { employeeIds },
      getAuthHeader()
    );
    revalidatePath("/departments");
    return { success: true, data: response.data.data };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Failed to assign employees",
    };
  }
}

// Remove employee from department
export async function removeEmployeeFromDepartment(
  departmentId: string,
  employeeId: string
) {
  try {
    const response = await axios.delete(
      `${API_URL}/departments/${departmentId}/employees/${employeeId}`,
      getAuthHeader()
    );
    revalidatePath("/departments");
    return { success: true, data: response.data.data };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Failed to remove employee",
    };
  }
}
