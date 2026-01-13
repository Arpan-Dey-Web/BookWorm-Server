import { Request, Response } from "express";
import { recommendationService } from "./recommendation.service";

const getUserRecommendations = async (req: Request, res: Response) => {
    try {
        // Assuming your auth middleware attaches user to req.user
        const userId = (req as any).user.id;

        const result = await recommendationService.getRecommendationsFromDB(userId);

        res.status(200).json({
            success: true,
            message: "Personalized recommendations fetched successfully",
            data: result
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch recommendations"
        });
    }
};

export const recommendationController = {
    getUserRecommendations
};