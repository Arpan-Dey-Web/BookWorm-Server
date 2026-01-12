import express, { Application, Request, Response } from "express";
import cors from "cors";
// import authRoutes from "./modules/auth/auth.router"; 

const app: Application = express();


app.use(express.json());
app.use(cors());

// Modular Routes
// app.use("/api/v1/auth", authRoutes);

app.get("/", (req: Request, res: Response) => {
    res.send("Bookworm Server API is running!");
});

export default app;