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

router.get("/", departmentController.list);

router.get("/:id", departmentController.getById);

router.post(
  "/:id/assign/employee",
  isManager,
  // validateRequest(updateEmployeeSchema),
  departmentController.assignEmployees
);

router.delete(
  "/:id/delete/:employeeId",
  isManager,
  departmentController.removeEmployee
);

export default router;
