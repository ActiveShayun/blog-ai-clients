'use server'

import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import UpdateBlogForm from "../components/UpdateBlogForm";


const UpdateBlog = async ({ params }) => {
    const id = await params?.id
    console.log('UpdateBlog', id);
    if (!id) {
        return <h1>id invalid</h1>
    }
    const blogsCollection = await dbConnect(collectionNameObj.blogsCollection)
    const query = { _id: new ObjectId(id) }
    const result = await blogsCollection.findOne(query)
    result._id = result._id.toString()
    // const singleBlog = await result.json()
    console.log('singleBlog from update', result);

    return (
        <div>
            {
                result._id && (
                    <UpdateBlogForm result={result} />
                )
            }
        </div>
    );
};

export default UpdateBlog;