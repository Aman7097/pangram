"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/app/context/userContext";

const PageHeader = () => {
  const { user } = useAuth();

  const pathname = usePathname();

  const isActiveLink = (path: string) => {
    return pathname === path
      ? "bg-azure-500 font-bold text-ocean-50"
      : "bg-ocean-50";
  };

  return (
    <div className="bg-[#F8F9FA] p-4 w-full rounded-lg mb-8 bg-[url('/hji.webp')] bg-cover bg-center bg-no-repeat ">
      <div className="w-full flex items-center justify-between">
        <div className="w-full flex gap-4">
          {user?.userType === "manager" && (
            <Link href="/departments" className="w-full">
              <Button
                variant="ghost"
                className={`${isActiveLink(
                  "/departments"
                )} w-full hover:bg-gray-50 hover:text-gray-700 px-6 py-2 rounded-full shadow-sm`}
              >
                Departments
              </Button>
            </Link>
          )}
          <Link href="/home" className="w-full">
            <Button
              variant="ghost"
              className={`${isActiveLink(
                "/home"
              )} w-full hover:bg-gray-50  hover:text-gray-700 px-6 py-4 rounded-full shadow-sm`}
            >
              All Employees
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
