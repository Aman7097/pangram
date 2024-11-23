import express from "express";
import { validateRequest } from "../middleware/validate.middleware";
import { loginSchema, registerSchema } from "../utils/validation";
import { authController } from "../controllers/auth.controller";
import { verifyToken } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/login", validateRequest(loginSchema), authController.login);
router.post(
  "/register",
  validateRequest(registerSchema),
  authController.register
);
router.post("/logout", verifyToken, authController.logout);
router.get("/me", verifyToken, authController.getCurrentUser);

export default router;
