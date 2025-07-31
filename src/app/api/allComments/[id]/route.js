'use server'
import { corsHeaders } from "@/lib/corsHeaders ";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { NextResponse } from "next/server";


export async function GET(req, { params }) {
    const postId = await params.id
    console.log('postId comment', postId);
    console.log();
    const commentCollection = await dbConnect(collectionNameObj.commentCollection)
    const query = { postId }
    const result = await commentCollection.find(query).toArray();
    return NextResponse.json(result, {
        status: 200,
        headers: corsHeaders
    })
}

export async function OPTIONS() {
    return NextResponse.json({},
        {
            status: 200,
            headers: corsHeaders
        })
}