import React from "react";
import { useState } from "react";
import { User, LogOut, ChevronDown, Building2 } from "lucide-react";
import Link from "next/link";
import UserProfileModal from "../userModal";
import { useAuth } from "@/app/context/userContext";
import { logoutUser } from "@/server-actions/auth";

interface NavbarProps {
  userRole?: "manager" | "employee";
  userName?: string;
  userEmail?: string;
}

const TopNavbar = ({ userRole, userName, userEmail }: NavbarProps) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const { user } = useAuth();

  const handleUserLogout = async () => {
    const response = await logoutUser();
  };

  return (
    <nav className="bg-white border-b border-gray-200 p-2 fixed w-full z-30 top-0 left-0 bg-[url('/hji.webp')] bg-cover bg-center bg-no-repeat ">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center md:mx-2">
            <Link href="/home" className="flex items-center">
              <Building2 className="h-8 w-8 text-blue-600 mr-2" />
              <span className="text-xl font-semibold text-gray-800">
                Employee Manager
              </span>
            </Link>
          </div>

          {/* Profile Dropdown */}
          <div className="relative md:mx-2">
            <button
              type="button"
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none"
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            >
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <span className="hidden md:inline-block">{userName}</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">
                    {userName}
                  </p>
                  <p className="text-sm text-gray-500">{userEmail}</p>
                  <p className="text-xs text-gray-500 mt-1 capitalize">
                    {userRole}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setIsProfileModalOpen(true);
                    setIsProfileDropdownOpen(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <User className="w-4 h-4 mr-2" />
                  Profile Details
                </button>

                <button
                  onClick={() => {
                    handleUserLogout();
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden mt-3 border-t pt-3">
          {userRole === "manager" ? (
            <div className="space-y-1">
              <Link
                href="/departments"
                className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
              >
                Departments
              </Link>
              <Link
                href="/employees"
                className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
              >
                Employees
              </Link>
            </div>
          ) : (
            <Link
              href="/home"
              className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
            >
              My Dashboard
            </Link>
          )}
        </div>
        <UserProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          userData={user}
        />
      </div>
    </nav>
  );
};

export default TopNavbar;
