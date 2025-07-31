import { corsHeaders } from "@/lib/corsHeaders ";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { NextResponse } from "next/server";


export async function POST(req, { params }) {
    const commentCollection = await dbConnect(collectionNameObj.commentCollection)
    const body = await req.json()
    const result = await commentCollection.insertOne(body)
    console.log('commentCollection', result);
    return NextResponse.json(result, {
        status: 200,
        headers: corsHeaders
    })

}

export async function OPTIONS() {
    return NextResponse.json({},
        { status: 200, headers: corsHeaders })

}