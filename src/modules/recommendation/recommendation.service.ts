import { ObjectId } from "mongodb";
import { db } from "../../shared/config/db";

const getRecommendationsFromDB = async (userId: string) => {
    const userObjectId = new ObjectId(userId);

    // 1. Get the list of books the user has already read
    const readBooks = await db.collection("userShelves")
        .find({ userId: userObjectId, shelfType: "Read" })
        .toArray();

    const readBookIds = readBooks.map(b => b.bookId);

    // FALLBACK: Requirement - If user has read < 3 books, show popular books
    if (readBooks.length < 3) {
        return await db.collection("books")
            .find({ _id: { $nin: readBookIds } })
            .sort({ averageRating: -1 }) // Sort by highest rating
            .limit(12)
            .toArray();
    }

    // 2. AGGREGATION: Find favorite genres based on "Read" shelf
    const favoriteGenres = await db.collection("userShelves").aggregate([
        { $match: { userId: userObjectId, shelfType: "Read" } },
        {
            $lookup: {
                from: "books",
                localField: "bookId",
                foreignField: "_id",
                as: "bookDetails"
            }
        },
        { $unwind: "$bookDetails" },
        { $group: { _id: "$bookDetails.genreId", count: { $sum: 1 } } },
        { $sort: { count: -1 } }
    ]).toArray();

    if (favoriteGenres.length === 0) {
        return await db.collection("books").find().limit(12).toArray();
    }

    const topGenreId = favoriteGenres[0]._id;

    // 3. Return books from that genre that the user hasn't read yet
    return await db.collection("books")
        .find({
            genreId: topGenreId,
            _id: { $nin: readBookIds }
        })
        .sort({ averageRating: -1 })
        .limit(18)
        .toArray();
};

export const recommendationService = {
    getRecommendationsFromDB
};