'use server'
import { corsHeaders } from "@/lib/corsHeaders ";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect"
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";


export async function POST(req) {
    const { name, email, password } = await req.json();
    const userCollection = await dbConnect(collectionNameObj.userCollection);
    const existingUser = await userCollection.findOne({ email });

    if (existingUser) {
        return NextResponse.json({ message: 'user all ready exist' })
    }

    const exitingAdmin = await userCollection.findOne({ role: 'Admin' });
    const role = exitingAdmin ? 'user' : 'Admin';

    const hasPassWord = await bcrypt.hash(password, 10)
    const result = await userCollection.insertOne(
        {
            name: name,
            email: email,
            password: hasPassWord,
            role: role
        }
    );

    return NextResponse.json(result, {
        status: 200,
        headers: corsHeaders
    })

}


export async function OPTIONS() {
    return NextResponse.json({},
        { status: 200, headers: corsHeaders })

}