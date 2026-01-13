import { NextFunction, Request, Response } from "express";
import { reviewService } from "./review.service";


const postReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reviewData = {
            ...req.body,
            status: "pending",
            createdAt: new Date()
        };
        const result = await reviewService.postReview(reviewData);
        res.status(201).json({ success: true, data: result });
    } catch (error) {
        console.log(error);
    }


}


const getAllPendingReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const pendingReviews = await reviewService.getPendingReview()
        res.status(200).json({ success: true, data: pendingReviews });
    } catch (error) {
        console.log(error);
    }

}


export const reviewController = {
    postReview,
    getAllPendingReview
}