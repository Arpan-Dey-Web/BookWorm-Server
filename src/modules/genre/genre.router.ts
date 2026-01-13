
import { Router } from "express";
import { genreController } from "./genre.controller";

const router = Router();


// Endpoint: GET /api/genres
router.get("/", genreController.getAllGenres);


// Endpoint: POST /api/create-genre
router.post("/create-genre", genreController.createGenre);




export const genreRoutes = router;