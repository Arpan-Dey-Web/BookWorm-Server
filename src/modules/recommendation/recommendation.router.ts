import { Router } from "express";
import { recommendationController } from "./recommendation.controller";

const router = Router()


// get recommendations
router.get("/", recommendationController.getUserRecommendations);

export const recommendationRoutes = router;