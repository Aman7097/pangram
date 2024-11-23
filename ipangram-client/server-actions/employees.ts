/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axios from "axios";
import { cookies } from "next/headers";

const baseURL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:7097/api/v1";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getEmployees(page: number = 1, filters?: string) {
  try {
    const token = cookies().get("token")?.value;

    console.log(filters, "filers");
    const response = await api.get("/employees/getAll", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
        filters,
      },
    });
    return response.data;
  } catch (error: any) {
    console.log(error, "error");
    return {
      success: false,
      error: error.response?.data?.message || "Failed to fetch employees",
    };
  }
}

export async function updateEmployee(employeeId: string, data: any) {
  try {
    const token = cookies().get("token")?.value;

    const response = await api.put(`/employees/${employeeId} `, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.log(error, "error");
    return {
      success: false,
      error: error.response?.data?.message || "Failed to update employee",
    };
  }
}

export async function deleteEmployee(employeeId: string) {
  try {
    const token = cookies().get("token")?.value;

    const response = await api.delete(`/employees/${employeeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.log(error, "error");
    return {
      success: false,
      error: error.response?.data?.message || "Failed to delete employee",
    };
  }
}

export async function createEmployee(data: any) {
  try {
    const token = cookies().get("token")?.value;

    const response = await api.post("/employees", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.log(error, "error");
    return {
      success: false,
      error: error.response?.data?.message || "Failed to create employee",
    };
  }
}
