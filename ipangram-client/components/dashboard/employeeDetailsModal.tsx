import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Trash2 } from "lucide-react";
import { Department, Employee } from "@/app/types/user";

interface EmployeeDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee;
  isManager: boolean;
  onUpdate: (employeeId: string, data: any) => Promise<void>;
  onDelete: (employeeId: string) => Promise<void>;
}

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  jobRole: z.string().min(2, "Job role is required"),
  location: z.string().min(2, "Location is required"),
});

const EmployeeDetailsModal = ({
  isOpen,
  onClose,
  employee,
  isManager,
  onUpdate,
  onDelete,
}: EmployeeDetailsModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employeeID: employee.employeeID,
      firstName: employee.firstName,
      lastName: employee.lastName,
      jobRole: employee.jobRole,
      location: employee.location,
    },
  });

  const handleUpdate = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      await onUpdate(employee._id, data);
      onClose();
    } catch (error) {
      console.error("Failed to update employee:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await onDelete(employee._id);
      onClose();
    } catch (error) {
      console.error("Failed to delete employee:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-ocean-50">
        <DialogHeader>
          <DialogTitle>Employee Details</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4">
          <div className="grid w-full gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="employeeID">Employee Id</Label>
              <Input
                id="employeeID"
                disabled={true}
                {...register("employeeID")}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                disabled={!isManager}
                {...register("firstName")}
              />
              {errors.firstName && (
                <p className="text-sm text-red-500">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                disabled={!isManager}
                {...register("lastName")}
              />
              {errors.lastName && (
                <p className="text-sm text-red-500">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="jobRole">Job Role</Label>
              <Input
                id="jobRole"
                disabled={!isManager}
                {...register("jobRole")}
              />
              {errors.jobRole && (
                <p className="text-sm text-red-500">{errors.jobRole.message}</p>
              )}
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                disabled={!isManager}
                {...register("location")}
              />
              {errors.location && (
                <p className="text-sm text-red-500">
                  {errors.location.message}
                </p>
              )}
            </div>
          </div>

          <DialogFooter className="flex justify-between">
            {isManager ? (
              <>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDelete}
                  className=" bg-red-600 text-white"
                  disabled={isDeleting || isLoading}
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Deleting
                    </>
                  ) : (
                    <>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </>
                  )}
                </Button>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className=" bg-gray-300"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className=" bg-ocean-300"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating
                      </>
                    ) : (
                      "Update"
                    )}
                  </Button>
                </div>
              </>
            ) : (
              <Button type="button" onClick={onClose}>
                Close
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeDetailsModal;
