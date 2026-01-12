import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URL as string;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

export const connectDB = async () => {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error(" MongoDB Connection Failed", error);
        throw error;
    }
};

export const db = client.db("bookworm"); 