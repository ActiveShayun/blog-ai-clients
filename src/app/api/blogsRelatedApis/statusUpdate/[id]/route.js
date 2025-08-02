import { corsHeaders } from "@/lib/corsHeaders ";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";


export async function PATCH(req, { params }) {
    try {
        const id = params?.id;
        console.log(' id', id);

        const blogsCollection = await dbConnect(collectionNameObj.blogsCollection);
        const result = await blogsCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { status: 'approved' } }
        );

        return NextResponse.json(
            {
                success: true,
                matched: result.matchedCount,
                modified: result.modifiedCount,
                acknowledged: result.acknowledged,
            },
            {
                status: 200,
                headers: corsHeaders,
            });
    } catch (error) {
        console.error('Error in PATCH:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
};

export async function OPTIONS() {
    return NextResponse.json({},
        { status: 200, headers: corsHeaders }
    )
};