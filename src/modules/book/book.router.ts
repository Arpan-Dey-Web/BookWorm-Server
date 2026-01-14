import { Router } from "express";
import { bookController } from "./book.controller";

const router = Router();

// get all books
router.get("/", bookController.getAllBooks)

// create a book
router.post("/create-book", bookController.createBooks);

// update a book 
router.patch("/update-book/:id", bookController.updateBook);

//delete a book 
router.delete("/delete-book/:id", bookController.deleteBook);





export const bookRoutes = router;