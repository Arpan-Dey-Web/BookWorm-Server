import { ObjectId } from "mongodb";
import { db } from "../../shared/config/db";

const userShelvesCollection = db.collection("userShelves");
const booksCollection = db.collection("books");

const addToShelf = async (data: any) => {
    const { userId, bookId, shelfType } = data;

    return await userShelvesCollection.updateOne(
        { userId: new ObjectId(userId), bookId: new ObjectId(bookId) },
        {
            $set: {
                shelfType,
                updatedAt: new Date(),
            },
            $setOnInsert: {
                pagesRead: 0,
                percentage: 0,
                createdAt: new Date(),
            },
        },
        { upsert: true }
    );
};

const updateProgress = async (data: any) => {
    const { userId, bookId, pagesRead } = data;

    // Must convert string ID to ObjectId for the query to work
    const book = await booksCollection.findOne({ _id: new ObjectId(bookId) });
    if (!book) throw new Error("Book not found");

    const totalPages = book.totalPages || 100; // Fallback to avoid division by zero
    const percentage = Math.min(Math.round((Number(pagesRead) / totalPages) * 100), 100);

    const updateData: any = {
        pagesRead: Number(pagesRead),
        percentage,
        updatedAt: new Date(),
    };

    // Requirement: Move to 'read' if progress is 100%
    if (Number(pagesRead) >= totalPages) {
        updateData.shelfType = "read";
        updateData.finishedAt = new Date();
    }

    return await userShelvesCollection.updateOne(
        { userId: new ObjectId(userId), bookId: new ObjectId(bookId) },
        { $set: updateData }
    );
};

export const shelvesService = { addToShelf, updateProgress };