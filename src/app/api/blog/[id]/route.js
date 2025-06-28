import { corsHeaders } from "@/lib/corsHeaders ";
import dbConnect, { collectionNameObj } from "@/lib/dbConect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET({ params }) {
    const p = await params?.id
    console.log('ObjectId', p);
    const blogsCollection = await dbConnect(collectionNameObj.blogsCollection)
    const query = { _id: new ObjectId(p) }
    const result = await blogsCollection.findOne(query)
    console.log('result', result);
    return NextResponse(JSON.stringify(result), {
        status: 200,
        headers: corsHeaders
    })
}

export async function PATCH(req, { params }) {
    const p = await params?.id
    const blogsCollection = await dbConnect(collectionNameObj.blogsCollection)
    const blog = await req.json()
    const query = { _id: new ObjectId(p) }
    const upDatedDoc = {
        $set: {
            ...blog
        }
    }
    const result = await blogsCollection.updateOne(query, upDatedDoc)
    return NextResponse(JSON.stringify(result), {
        status: 200,
        headers: corsHeaders
    })
}



export async function OPTIONS() {
  return new Response(null, {
    headers: corsHeaders,
  });
}