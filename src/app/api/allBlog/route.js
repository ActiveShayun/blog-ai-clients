'use server'
import { corsHeaders } from "@/lib/corsHeaders ";
import dbConnect, { collectionNameObj } from "@/lib/dbConect";
import { NextResponse } from "next/server";

export const GET = async () => {
    const blogsCollection = await dbConnect(collectionNameObj.blogsCollection)
    const result = await blogsCollection.find({}).toArray();
    console.log('allBlog', result);
    return NextResponse.json(result, {
        status: 200,
        headers: corsHeaders
    })

}

export const OPTIONS = async () => {
    return NextResponse.json({},
        { status: 200, headers: corsHeaders })
}