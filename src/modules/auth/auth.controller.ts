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


const handleLogin = async (req: Request, res: Response) => {
    try {
        const result = await authService.loginUser(req.body);

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: {
                user: result.user,
                accessToken: result.token,
            },
        });
    } catch (error: any) {
        console.log(error);
        res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};




export const authController = {
    handleRegister, // existing
    handleLogin,
};





