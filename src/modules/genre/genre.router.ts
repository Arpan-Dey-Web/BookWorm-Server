
import { Router } from "express";
import { genreController } from "./genre.controller";
const router = Router();


// Endpoint: POST /api/v1/auth/create-genre
router.post("/create-genre", genreController.createGenre);


export const genreRoutes = router;