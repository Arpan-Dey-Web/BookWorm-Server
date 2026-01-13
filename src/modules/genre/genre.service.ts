import { db } from "../../shared/config/db";


const genreCollection = db.collection("genres")


const createGenre = async (name: string) => {
    const result = await genreCollection.insertOne({ name, createdAt: new Date() });
    return result;
}


export const createGenreService = {
    createGenre,
}