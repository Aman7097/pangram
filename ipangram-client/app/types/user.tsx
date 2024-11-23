// types/index.ts

// User related types
export type UserType = "employee" | "manager";

export type UserAvailability = "Available" | "Unavailable";

export interface BaseUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  userType: UserType;
  createdAt?: string;
  updatedAt?: string;
}

export interface Employee extends BaseUser {
  employeeID: string;
  jobRole: string;
  location: string;
  department?: string;
}

// Department related types
export interface Department {
  _id: string;
  name: string;
  description?: string;
  managerId?: string;
  createdAt: string;
  updatedAt: string;
  employees?: Employee[];
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface EmployeeCardProps {
  employee: Employee;
  isManager: boolean;
  onSelectEmployee: (employee: Employee) => void;
}
// Pagination Props
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
  className?: string;
}
