
import { NextFunction, Request, Response } from "express";
import { shelvesService } from "./shelves.service";




type shelfType = {
    userId: string,
    bookId: string,
    shelfType: string
}

// Add or Update shelf
const addToShelf = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const result = await shelvesService.addToShelf(req.body)
        // here i have to send a response 
        res.status(200).json({
            success: true,
            message: "Book added to shelf successfully",
            result
        });

    } catch (error) {
        next(error);
    }
};

// Update Pages Read
const updateProgress = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const result = await shelvesService.updateProgress(req.body)
        res.status(200).json({ success: true, message: "Reading progress updated", result });
    } catch (error) {
        next(error);
    }
}



export const shelvesController = {
    addToShelf,
    updateProgress
}