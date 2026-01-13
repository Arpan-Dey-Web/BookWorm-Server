import { Router } from "express";
import { bookController } from "./book.controller";

const router = Router();


router.post("/create-book", bookController.createBooks);



export const bookRoutes = router;