import { db } from "../../shared/config/db";


const genreCollection = db.collection("genres")


const createGenre = async (name: string) => {
    const result = await genreCollection.insertOne({ name, createdAt: new Date() });
    return result;
}

const getAllGenres = async () => {
    const result = genreCollection.find().toArray();
    return result
}

export const genreService = {
    createGenre,
    getAllGenres,
}