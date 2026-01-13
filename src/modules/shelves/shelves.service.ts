import { db } from "../../shared/config/db";

const userShelvesCollection = db.collection("userShelves");
const booksCollection = db.collection("books");

type ShelfPayload = {
    userId: string;
    bookId: string;
    shelfType: "want" | "current" | "read";
};

// Add or update shelf
const addToShelf = async (data: ShelfPayload) => {
    const { userId, bookId, shelfType } = data;

    return await userShelvesCollection.updateOne(
        { userId, bookId },
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

// Update reading progress
const updateProgress = async (data: any) => {
    const { userId, bookId, pagesRead } = data;

    const book = await booksCollection.findOne({ _id: bookId });
    if (!book) throw new Error("Book not found");

    const totalPages = book.totalPages;
    const percentage = Math.round((pagesRead / totalPages) * 100);

    // Auto move to READ if completed
    const updateData: any = {
        pagesRead,
        percentage,
        updatedAt: new Date(),
    };

    if (pagesRead >= totalPages) {
        updateData.shelfType = "read";
        updateData.finishedAt = new Date();
    }

    return await userShelvesCollection.updateOne(
        { userId, bookId, shelfType: "current" },
        { $set: updateData }
    );
};

export const shelvesService = {
    addToShelf,
    updateProgress,
};
