import { Request, Response } from "express";
import { userService } from "./user.service";




export const updateUserRole = async (req: Request, res: Response) => {
    try {
        const { userId, role } = req.body; // role: 'admin' or 'user'
        const result = await userService.updateUserRole(userId as string, role as string)
        res.status(200).json({ success: true, message: "Role updated successfully", result });
    } catch (error) {
        console.log(error);
    }
};





export const userController = {
    updateUserRole
}