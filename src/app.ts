import express, { Application, Request, Response } from "express";
import cors from "cors";
import { authRoutes } from "./modules/auth.router";
import { genreRoutes } from "./modules/genre/genre.router";


const app: Application = express();


app.use(express.json());
app.use(cors());

// Modular Routes
app.use("/api/v1/auth", authRoutes);

// genre routes
app.use("/api/genre", genreRoutes);



app.get("/", (req: Request, res: Response) => {
    res.send("Bookworm Server API is running!");
});

export default app;