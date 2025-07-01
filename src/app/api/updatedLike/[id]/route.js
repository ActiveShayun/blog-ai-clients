'use server'
import { corsHeaders } from "@/lib/corsHeaders ";
import dbConnect, { collectionNameObj } from "@/lib/dbConect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";


export async function PATCH(req, { params }) {
    const id = await params
    console.log('upDatedLike id', params.id);
    const blogsCollection = await dbConnect(collectionNameObj.blogsCollection)
    const filter = { _id: new ObjectId(id) }
    const upDatedLike = {
        $inc: {
            like: + 1
        }
    }
    const result = await blogsCollection.updateOne(filter, upDatedLike, { upsert: true })

    return NextResponse.json(result, {
        status: 200,
        headers: corsHeaders
    })

}

export async function OPTIONS() {
    return NextResponse.json({},
        { status: 200, headers: corsHeaders }
    )

}