import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../../shared/config/db";



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


const loginUser = async (credentials: any) => {
    const { email, password } = credentials;

    // 1. Find user by email
    const user = await userCollection.findOne({ email });
    if (!user) {
        throw new Error("Invalid email or password");
    }

    // 2. Compare passwords
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new Error("Invalid email or password");
    }

    // 3. Create JWT Payload
    const jwtPayload = {
        id: user._id,
        email: user.email,
        role: user.role, // "admin" or "user"
    };

    // 4. Generate Token (Set an expiry like 7 days)
    const token = jwt.sign(jwtPayload, process.env.JWT_ACCESS_SECRET as string, {
        expiresIn: "7d",
    });

    // Remove password from user object before returning
    const { password: _, ...userWithoutPassword } = user;

    return {
        user: userWithoutPassword,
        token,
    };
};

export const authService = {
    registerUser,
    loginUser,
};