import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Mail,
  MapPin,
  Calendar,
  Briefcase,
  Users,
  User,
  Building,
} from "lucide-react";

interface User {
  _id: string;
  employeeID: string;
  email: string;
  userType: string;
  jobRole: string;
  firstName: string;
  lastName: string;
  location: string;
  role: string;
  createdAt: string;
}

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: User | null;
}

const UserProfileModal = ({
  isOpen,
  onClose,
  userData,
}: UserProfileModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-ocean-50 text-azure-900">
        <DialogHeader>
          <DialogTitle>Employee Profile</DialogTitle>
        </DialogHeader>

        {/* Profile Header */}
        <div className="flex items-start space-x-6 pb-6">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="w-12 h-12 text-gray-500" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-semibold">
              {userData?.firstName} {userData?.lastName}
            </h2>
            <div className="flex items-center mt-1 text-gray-600">
              <Briefcase className="w-4 h-4 mr-2" />
              <span>{userData?.jobRole}</span>
            </div>
            <div className="flex items-center mt-1 text-gray-600">
              <Building className="w-4 h-4 mr-2" />
              <span>{userData?.employeeID}</span>
            </div>
            <div className="flex items-center mt-1 text-gray-600">
              <Users className="w-4 h-4 mr-2" />
              <span className="capitalize">{userData?.userType}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Contact Information */}
        <div className="space-y-4">
          <h3 className="font-medium text-lg">Contact Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center text-gray-600">
              <Mail className="w-4 h-4 mr-2" />
              <span>{userData?.email}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{userData?.location}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              <span>
                Joined {new Date(userData?.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfileModal;
