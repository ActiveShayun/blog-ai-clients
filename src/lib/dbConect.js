import { MongoClient, ServerApiVersion } from "mongodb";

export const collectionNameObj = {
    "blogsCollection": "blogs",
    "userCollection": "users"
}

export default function dbConnect(collection) {
    const uri = process.env.MONGODB_URI
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    return client.db(process.env.DB_NAME).collection(collection);
}
