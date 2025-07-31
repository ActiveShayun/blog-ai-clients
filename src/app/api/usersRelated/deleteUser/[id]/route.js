import { corsHeaders } from "@/lib/corsHeaders ";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
    try {
        const id = params?.id;
        const userCollection = dbConnect(collectionNameObj.userCollection)
        const result = await userCollection.deleteOne({
            _id: new ObjectId(id)
        })

        return NextResponse.json(result, {
            headers: corsHeaders,
            status: 200
        })

    } catch (error) {
        return NextResponse.json(
            {
                message: 'Deleted failed',
                status: 400
            })
    }
}


export async function OPTIONS() {
    return NextResponse.json({}, {
        headers: corsHeaders,
        status: 200
    })
}