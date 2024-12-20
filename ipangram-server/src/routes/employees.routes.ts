import express from "express";
import { verifyToken, isManager } from "../middleware/auth.middleware";
import { validateRequest } from "../middleware/validate.middleware";
import { employeeController } from "../controllers/employee.controller";
import { registerSchema, updateEmployeeSchema } from "../utils/validation";

const router = express.Router();

// All employee routes require authentication
router.use(verifyToken);

// Routes accessible only by managers
router.post(
  "/",
  isManager,
  validateRequest(registerSchema),
  employeeController.create
);

router.put(
  "/:id",
  isManager,
  validateRequest(updateEmployeeSchema),
  employeeController.update
);

router.delete("/:id", isManager, employeeController.delete);

router.get("/getAll", employeeController.list);

router.get("/:id", employeeController.getById);

export default router;
