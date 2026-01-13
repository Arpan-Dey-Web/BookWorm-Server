import { ObjectId } from "mongodb";
import { db } from "../../shared/config/db";



const reviewCollection = db.collection("review")

const postReview = async (reviewData: any) => {
    const result = await reviewCollection.insertOne(reviewData)
    return result;
}


const getPendingReview = async () => {
    const result = reviewCollection.find({ status: "pending" }).toArray();
    return result;
}



const approvedPendingReview = async (id: string) => {
    const result = reviewCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { status: "approved" } }
    );
    return result;

}
export const reviewService = {
    postReview,
    getPendingReview,
    approvedPendingReview
}