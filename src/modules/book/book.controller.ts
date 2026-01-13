import { NextFunction, Request, Response } from "express";
import { bookService } from "./book.service";

const createBooks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookData = {
            ...req.body,
            createdAt: new Date(),
            averageRating: 0,
            reviewCount: 0
        };
        const result = await bookService.createBooks(bookData);
        res.status(201).json({ success: true, message: "Book added!", data: result });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
}



export const bookController = {
    createBooks,

}