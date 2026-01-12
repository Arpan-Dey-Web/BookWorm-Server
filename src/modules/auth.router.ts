
import { Router } from "express";
import { authController } from "./auth.controller";


const router = Router();

// Endpoint: POST /api/v1/auth/register
router.post("/register", authController.handleRegister);



export const authRoutes = router;