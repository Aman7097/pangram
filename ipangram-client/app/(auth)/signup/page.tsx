"use client";

import { SignupForm } from "@/components/auth/signup-form";
import React from "react";

const SignupPage = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center px-4 bg-[url('/hji.webp')] bg-cover bg-center bg-no-repeat bg-white">
      <SignupForm />
    </div>
  );
};

export default SignupPage;
