import { corsHeaders } from "@/lib/corsHeaders ";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { NextResponse } from "next/server";


export async function GET(req, { params }) {
    const email = params?.email;
    console.log('my blogs', email);
    const blogsCollection = await dbConnect(collectionNameObj.blogsCollection);
    const result = await blogsCollection.find({ authorEmail: email }).toArray();
    console.log('my blogs', result);
    return NextResponse.json(result, {
        status: 200,
        headers: corsHeaders
    })
}

export async function OPTIONS() {
    return NextResponse.json({}, {
        status: 200,
        headers: corsHeaders
    })
}

