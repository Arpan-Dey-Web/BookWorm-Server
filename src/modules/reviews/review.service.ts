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


export const reviewService = {
    postReview,
    getPendingReview
}