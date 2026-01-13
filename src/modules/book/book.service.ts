import { db } from "../../shared/config/db"


const bookeCollection = db.collection("books")

const createBooks = async (bookData: any) => {
    const result = await bookeCollection.insertOne(bookData);
    return result;
}

const getAllBooks = async () => {
    const result = await bookeCollection.find().toArray();
    return result;
}



export const bookService = {
    createBooks,
    getAllBooks
}