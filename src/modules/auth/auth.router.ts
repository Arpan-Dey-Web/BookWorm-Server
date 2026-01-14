import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

// Endpoint: POST /api/auth/register
router.post("/register", authController.handleRegister);


// Endpoint: POST /api/v1/auth/login
router.post("/login", authController.handleLogin);


export const authRoutes = router;