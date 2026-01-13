import express, { Application, Request, Response } from "express";
import cors from "cors";
import { authRoutes } from "./modules/auth/auth.router";
import { genreRoutes } from "./modules/genre/genre.router";
import { bookRoutes } from "./modules/book/book.router";
import { reviewRoutes } from "./modules/reviews/review.router";
import { shelvesRoutes } from "./modules/shelves/shelves.router";

const app: Application = express();


app.use(express.json());
app.use(cors());

// Modular Routes
app.use("/api/auth", authRoutes);

// genre routes
app.use("/api/genres", genreRoutes);

// book routes
app.use("/api/books", bookRoutes);

// review routes
app.use("/api/review", reviewRoutes);

// shelves routes
app.use("/api/shelves", shelvesRoutes);




app.get("/", (req: Request, res: Response) => {
    res.send("Bookworm Server API is running!");
});

export default app;