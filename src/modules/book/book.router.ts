import { Router } from "express";
import { bookController } from "./book.controller";

const router = Router();


router.get("/", bookController.getAllBooks)

router.post("/create-book", bookController.createBooks);



export const bookRoutes = router;