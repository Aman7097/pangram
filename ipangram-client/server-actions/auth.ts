/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import axios from "axios";

const baseURL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:7097/api/v1";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  location: string;
  jobRole: string;
  userType: "employee" | "manager";
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  success: boolean;
  data: any;
}

export async function registerUser(data: RegisterData) {
  try {
    const response = await api.post<AuthResponse>("/auth/register", data);

    // Set the token in an HTTP-only cookie
    cookies().set("token", response.data.data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return {
      success: true,
      user: response.data.data.user,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Registration failed",
    };
  }
}

export async function loginUser(data: LoginData) {
  try {
    const response = await api.post<AuthResponse>("/auth/login", data);

    cookies().set("token", response.data.data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return {
      success: true,
      user: response.data.data.user,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Login failed",
    };
  }
}

export async function logoutUser() {
  cookies().delete("token");
  redirect("/login");
}

export async function getCurrentUser(token: string) {
  try {
    const res = await axios.get(`${baseURL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}
