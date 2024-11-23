import express from "express";
import authRoutes from "./auth.routes";
import departmentRoutes from "./department.routes";
import employeeRoutes from "./employees.routes";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/departments", departmentRoutes);
router.use("/employees", employeeRoutes);

// Health check route
router.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

export default router;
