import { corsHeaders } from "@/lib/corsHeaders ";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";


export async function PATCH(req, { params }) {
    try {
        const id = params?.id;
        console.log('make admin id ', id);
        const { role } = await req.json();

        if (!id || !role) {
            return NextResponse.json({ error: 'Missing id or role' }, { status: 400 });
        }

        const userCollection = await dbConnect(collectionNameObj.userCollection);
        const result = await userCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { role } }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, modified: result.modifiedCount }, {
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