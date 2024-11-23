/* eslint-disable prefer-const */
// types.ts
export interface Employee {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  availability: "Available" | "Unavailable";
  imageUrl: string;
  department?: string;
  email: string;
  joinDate: string;
  projects: string[];
}

// dummyData.ts
export const employees: Employee[] = [
  {
    id: "emp001",
    name: "Sarah Johnson",
    role: "Senior Developer",
    location: "New York",
    rating: 4.8,
    availability: "Available",
    imageUrl: "/api/placeholder/150/150",
    department: "Engineering",
    email: "sarah.j@company.com",
    joinDate: "2022-03-15",
    projects: ["Project Alpha", "Cloud Migration"],
  },
  {
    id: "emp002",
    name: "Michael Chen",
    role: "UX Designer",
    location: "San Francisco",
    rating: 4.9,
    availability: "Unavailable",
    imageUrl: "/api/placeholder/150/150",
    department: "Design",
    email: "michael.c@company.com",
    joinDate: "2021-08-22",
    projects: ["Mobile App Redesign"],
  },
  {
    id: "emp003",
    name: "Emily Rodriguez",
    role: "Product Manager",
    location: "Austin",
    rating: 4.7,
    availability: "Available",
    imageUrl: "/api/placeholder/150/150",
    department: "Product",
    email: "emily.r@company.com",
    joinDate: "2023-01-10",
    projects: ["Customer Portal", "Analytics Dashboard"],
  },
  {
    id: "emp004",
    name: "David Kim",
    role: "Backend Developer",
    location: "Boston",
    rating: 4.6,
    availability: "Available",
    imageUrl: "/api/placeholder/150/150",
    department: "Engineering",
    email: "david.k@company.com",
    joinDate: "2022-11-05",
    projects: ["API Infrastructure"],
  },
  {
    id: "emp005",
    name: "Lisa Wang",
    role: "Data Scientist",
    location: "Seattle",
    rating: 4.9,
    availability: "Available",
    imageUrl: "/api/placeholder/150/150",
    department: "Data",
    email: "lisa.w@company.com",
    joinDate: "2023-02-28",
    projects: ["ML Pipeline", "Predictive Analytics"],
  },
  {
    id: "emp006",
    name: "James Wilson",
    role: "Frontend Developer",
    location: "Chicago",
    rating: 4.5,
    availability: "Unavailable",
    imageUrl: "/api/placeholder/150/150",
    department: "Engineering",
    email: "james.w@company.com",
    joinDate: "2022-07-19",
    projects: ["Website Redesign"],
  },
  {
    id: "emp007",
    name: "Anna Martinez",
    role: "QA Engineer",
    location: "Miami",
    rating: 4.7,
    availability: "Available",
    imageUrl: "/api/placeholder/150/150",
    department: "Quality Assurance",
    email: "anna.m@company.com",
    joinDate: "2023-04-01",
    projects: ["Test Automation", "Mobile Testing"],
  },
  {
    id: "emp008",
    name: "Robert Taylor",
    role: "DevOps Engineer",
    location: "Denver",
    rating: 4.8,
    availability: "Available",
    imageUrl: "/api/placeholder/150/150",
    department: "Operations",
    email: "robert.t@company.com",
    joinDate: "2022-09-12",
    projects: ["CI/CD Pipeline", "Cloud Infrastructure"],
  },
  {
    id: "emp009",
    name: "Sofia Garcia",
    role: "Technical Lead",
    location: "Portland",
    rating: 4.9,
    availability: "Available",
    imageUrl: "/api/placeholder/150/150",
    department: "Engineering",
    email: "sofia.g@company.com",
    joinDate: "2021-12-03",
    projects: ["System Architecture", "Team Management"],
  },
];

// Utility function to get paginated data
export const getPaginatedEmployees = (
  page: number,
  limit: number,
  sortBy?: "name" | "location",
  sortOrder?: "asc" | "desc"
) => {
  let sortedEmployees = [...employees];

  if (sortBy) {
    sortedEmployees.sort((a, b) => {
      const compareValue = sortOrder === "asc" ? 1 : -1;
      return a[sortBy] > b[sortBy] ? compareValue : -compareValue;
    });
  }

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  return {
    data: sortedEmployees.slice(startIndex, endIndex),
    total: employees.length,
    totalPages: Math.ceil(employees.length / limit),
  };
};

// Example departments data
export const departments = [
  {
    id: "dept001",
    name: "Engineering",
    description: "Software development and technical implementation",
    employeeCount: 4,
  },
  {
    id: "dept002",
    name: "Design",
    description: "User experience and interface design",
    employeeCount: 1,
  },
  {
    id: "dept003",
    name: "Product",
    description: "Product management and strategy",
    employeeCount: 1,
  },
  {
    id: "dept004",
    name: "Data",
    description: "Data science and analytics",
    employeeCount: 1,
  },
  {
    id: "dept005",
    name: "Quality Assurance",
    description: "Software testing and quality control",
    employeeCount: 1,
  },
  {
    id: "dept006",
    name: "Operations",
    description: "DevOps and infrastructure management",
    employeeCount: 1,
  },
];
