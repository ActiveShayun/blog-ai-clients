import { corsHeaders } from "@/lib/corsHeaders ";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";





export async function GET(req, { params }) {
    const id = await params
    console.log('ObjectId', id);
    const blogsCollection = await dbConnect(collectionNameObj.blogsCollection)
    const query = { _id: new ObjectId(id) }
    const result = await blogsCollection.findOne(query)
    console.log('result', result);
    return NextResponse.json(result, {
        status: 200,
        headers: corsHeaders
    })
}

export async function PATCH(req, { params }) {
    const id = await params
    const blogsCollection = await dbConnect(collectionNameObj.blogsCollection)
    const blog = await req.json()
    const filter = { _id: new ObjectId(id) }
    const upDatedDoc = {
        $set: {
            ...blog
        }
    }
    const result = await blogsCollection.updateOne(filter, upDatedDoc, { upsert: true })
    return NextResponse.json(result, {
        status: 200,
        headers: corsHeaders
    })
}
export async function DELETE(req, { params }) {
    const id = await params
    const blogsCollection = await dbConnect(collectionNameObj.blogsCollection)
    const query = { _id: new ObjectId(id) }
    const result = await blogsCollection.deleteOne(query)
    return NextResponse.json(result, {
        status: 200,
        headers: corsHeaders
    })
}



export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders })
}