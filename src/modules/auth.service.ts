import bcrypt from "bcrypt";
import { db } from "../shared/config/db";
const userCollection = db.collection("users");


const registerUser = async (userData: any) => {
    // 1. Check if user exists
    // console.log( "this is user data",userData);
    const existingUser = await userCollection.findOne({ email: userData.email });
    if (existingUser) throw new Error("User already exists");

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // 3. Insert into MongoDB
    const newUser = {
        ...userData,
        password: hashedPassword,
        role: "user", // Default role as per requirements
        createdAt: new Date(),
    };
    const result = await userCollection.insertOne(newUser);

    return result;
};

export const authService = {
    registerUser,
}