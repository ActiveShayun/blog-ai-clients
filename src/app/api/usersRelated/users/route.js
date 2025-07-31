import { corsHeaders } from "@/lib/corsHeaders ";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { NextResponse } from "next/server";



export async function GET() {
    const userCollection = await dbConnect(collectionNameObj.userCollection)
    const result = await userCollection.find({}).toArray()
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