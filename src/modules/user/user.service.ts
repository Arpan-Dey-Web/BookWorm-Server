import { ObjectId } from "mongodb";
import { db } from "../../shared/config/db";

const userCollection = db.collection("users");



const updateUserRole = async (userId: string, role: string) => {
    const result = await userCollection.updateOne(
        { _id: new ObjectId(userId) },
        { $set: { role } }
    );
    return result;
}


export const userService = {
    updateUserRole,

}