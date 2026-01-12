import { Request, Response } from "express";
import { authService } from "./auth.service";


const handleRegister = async (req: Request, res: Response) => {
    try {
        // console.log("this is reqbody",req.body);
        const result = await authService.registerUser(req.body);
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result,
        });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const authController = {
    handleRegister,
}
