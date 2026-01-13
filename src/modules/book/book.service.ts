import { db } from "../../shared/config/db"


const bookCollection = db.collection("books")

const createBooks = async (bookData: any) => {
    const result = await bookCollection.insertOne(bookData);
    return result;
}

const getAllBooks = async (filters: any) => {
    let query: any = {};

    // 1. Search by title or author
    if (filters.searchTerm) {
        query.$or = [
            { title: { $regex: filters.searchTerm, $options: "i" } },
            { author: { $regex: filters.searchTerm, $options: "i" } }
        ];
    }

    // 2. Filter by Genre (linked to Genre ID)
    if (filters.genre) {
        const genreArray = (filters.genre as string).split(",");
        query.genreId = { $in: genreArray };
    }

    // 3. Filter by Rating
    if (filters.minRating) {
        query.averageRating = { $gte: Number(filters.minRating) };
    }

    // 4. Sorting
    let sortOptions: any = {};
    if (filters.sortBy === "rating") sortOptions.averageRating = -1;
    if (filters.sortBy === "most_shelved") sortOptions.totalShelved = -1;
    else sortOptions.createdAt = -1; // Newest books first by default

    const result = await bookCollection.find(query).sort(sortOptions).toArray();
    return result;
};



export const bookService = {
    createBooks,
    getAllBooks
}