import express from "express";
import { verifyToken, isManager } from "../middleware/auth.middleware";
import { validateRequest } from "../middleware/validate.middleware";
import { departmentSchema } from "../utils/validation";
import { departmentController } from "../controllers/department.controller";

const router = express.Router();

// All department routes require authentication
router.use(verifyToken);

// Routes accessible only by managers
router.post(
  "/",
  isManager,
  validateRequest(departmentSchema),
  departmentController.create
);

router.put(
  "/:id",
  isManager,
  validateRequest(departmentSchema),
  departmentController.update
);

router.delete("/:id", isManager, departmentController.delete);

// Routes accessible by both managers and employees
router.get("/", departmentController.list);

router.get("/:id", departmentController.getById);

router.post(
  "/:id/employees",
  isManager,
  // validateRequest(updateEmployeeSchema),
  departmentController.assignEmployees
);

router.delete(
  "/:id/employees/:employeeId",
  isManager,
  departmentController.removeEmployee
);

export default router;
