"use client";

import React from "react";
import { LoginForm } from "@/components/auth/login-form";

const LoginPage = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center px-4 bg-[url('/hji.webp')] bg-cover bg-center bg-no-repeat bg-white">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
