



import { NextFunction, Request, Response } from "express";
import { createGenreService } from "./genre.service";


const createGenre = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { name } = req.body;
        const result = await createGenreService.createGenre(name)
        res.status(201).json({ success: true, data: result });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }

}
export const genreController = {
    createGenre,
    
}