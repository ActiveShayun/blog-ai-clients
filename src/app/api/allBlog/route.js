'use server'
import { corsHeaders } from "@/lib/corsHeaders ";
import dbConnect, { collectionNameObj } from "@/lib/dbConect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    const { searchParams } = new URL(req?.url)
    const search = searchParams.get('search')
    const category = searchParams.getAll('category')

    console.log('searchParams', search, category);

    const query = {
        ...(search && {
            title: {
                $regex: search, $options: 'i'
            }
        }),
        ...(category.length > 0 && {
            category: { $in: category }

        })
    }
    const blogsCollection = await dbConnect(collectionNameObj.blogsCollection)
    const result = await blogsCollection.find(query).toArray();
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