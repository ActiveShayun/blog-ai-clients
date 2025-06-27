'use server'
const { default: dbConnect, collectionNameObj } = require("@/lib/dbConect")


const addBlogs = async (payload) => {
    const blogsCollection = dbConnect(collectionNameObj.blogsCollection)
    const result = await blogsCollection.insertOne(payload)
    console.log('addBlogs', result);
    result.insertedId = result.insertedId.toString()
    return result
}

export default addBlogs