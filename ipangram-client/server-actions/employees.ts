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

export async function getEmployees(
  page: number = 1,
  filters?: Record<string, any>
) {
  try {
    const token = cookies().get("token")?.value;

    const response = await api.get("/employees/getAll", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
        ...filters,
      },
    });

    return {
      success: true,
      data: response.data.data,
    };
  } catch (error: any) {
    console.log(error, "error");
    return {
      success: false,
      error: error.response?.data?.message || "Failed to fetch employees",
    };
  }
}
