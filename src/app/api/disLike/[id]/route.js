import { corsHeaders } from "@/lib/corsHeaders ";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";



export async function PATCH(req, { params }) {
    const id = await params
    const blogsCollection = await dbConnect(collectionNameObj.blogsCollection)
    const filter = { _id: new ObjectId(id) }
    const upDatedDoc = {
        $inc: {
            disLike:  1
        }
    }
    const result = await blogsCollection.updateOne(filter, upDatedDoc, { upsert: true })
    return NextResponse.json(result, {
        status: 200,
        headers: corsHeaders
    })
}