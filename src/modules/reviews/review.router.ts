
import { Router } from "express";
import { reviewController } from "./review.controller";

const router = Router();


// get all pending routes
router.get("/pending", reviewController.getAllPendingReview )


// post review 
router.post("/review-post", reviewController.postReview)

// admin approves a review 
router.patch("/approve/:id", reviewController.approvedPendingReview)




export const reviewRoutes = router;