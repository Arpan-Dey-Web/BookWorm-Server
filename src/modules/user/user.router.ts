

import { Router } from "express";
import { userController } from "./user.controller";


const router = Router();

router.patch("/update-role", userController.updateUserRole)





export const userRoutes = router;
