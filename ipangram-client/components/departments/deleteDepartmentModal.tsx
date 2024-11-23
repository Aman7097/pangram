/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface DeleteDepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  department: any;
  onConfirm: () => Promise<void>;
  isLoading?: boolean;
}

export const DeleteDepartmentModal: React.FC<DeleteDepartmentModalProps> = ({
  isOpen,
  onClose,
  department,
  onConfirm,
  isLoading = false,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Department</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <p className="text-center text-gray-600">
            Are you sure you want to delete the department &quot;
            {department.name}&quot;? This action cannot be undone.
          </p>
        </div>

        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete Department"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
