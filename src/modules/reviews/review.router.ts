
import { Router } from "express";
import { reviewController } from "./review.controller";

const router = Router();


// get all pending routes
router.get("/pending", reviewController.getAllPendingReview )


// post review 
router.post("/review-post", reviewController.postReview)






export const reviewRoutes = router;