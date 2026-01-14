import express, { Application, Request, Response } from "express";
import cors from "cors";
import { authRoutes } from "./modules/auth/auth.router";
import { genreRoutes } from "./modules/genre/genre.router";
import { bookRoutes } from "./modules/book/book.router";
import { reviewRoutes } from "./modules/reviews/review.router";
import { shelvesRoutes } from "./modules/shelves/shelves.router";
import { recommendationRoutes } from "./modules/recommendation/recommendation.router";
import { userRoutes } from "./modules/user/user.router";
import globalErrorHandler from "./shared/middleware/globalErrorHandler";
import notFound from "./shared/middleware/notfound";

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

// recommendation routes
app.use("/api/recomendation", recommendationRoutes);

// Promote user Role
app.use("/api/user", userRoutes);

app.get("/", (req: Request, res: Response) => {
    res.send("Bookworm Server API is running!");
});


// Global Error Handler (Must be after routes)
app.use(globalErrorHandler);

// Not Found Route (Must be the last middleware)
app.use(notFound);

export default app;