
import { NextFunction, Request, Response } from "express";
import { shelvesService } from "./shelves.service";

const addToShelf = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user.id; // From verifyToken middleware
        const result = await shelvesService.addToShelf({ ...req.body, userId });

        res.status(200).json({
            success: true,
            message: `Book added to ${req.body.shelfType} shelf`,
            data: result
        });
    } catch (error) {
        next(error);
    }
};

const updateProgress = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user.id;
        const result = await shelvesService.updateProgress({ ...req.body, userId });

        res.status(200).json({ success: true, message: "Progress updated", data: result });
    } catch (error) {
        next(error);
    }
}

export const shelvesController = {
    addToShelf,
    updateProgress
}