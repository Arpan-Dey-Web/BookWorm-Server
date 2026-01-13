import { NextFunction, Request, Response } from "express";
import { genreService } from "./genre.service";


const createGenre = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { name } = req.body;
        const result = await genreService.createGenre(name)
        res.status(201).json({ success: true, data: result });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }

}

const getAllGenres = async (req: Request, res:Response, next: NextFunction ) => {
    const genres = await genreService.getAllGenres()
    res.status(200).json({ success: true, data: genres });
}

export const genreController = {
    createGenre,
    getAllGenres,
}