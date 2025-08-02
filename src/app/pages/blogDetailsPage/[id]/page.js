'use server'
import React from 'react';
import { formattedMongoDbId } from '@/app/utility/formatedDate/formatDate';
import { FaFacebookSquare, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FcDislike } from "react-icons/fc";
import { FaXTwitter } from "react-icons/fa6";
import Link from 'next/link';
import dbConnect, { collectionNameObj } from '@/lib/dbConnect';
import { ObjectId } from 'mongodb';
import Image from 'next/image';
import UpdateLike from '../components/UpdateLike.jsx'
import AllComment from '../components/allComment/AllComment.jsx';
import { getServerSession } from 'next-auth';


const DetailsPage = async ({ params }) => {
    const session = await getServerSession();
    // console.log(session);
    const id = params?.id;

    const blogsCollection = await dbConnect(collectionNameObj.blogsCollection);
    const viewsCollection = await dbConnect(collectionNameObj.viewsCollection)

    const singleView = await viewsCollection.findOne(
        { email: session?.user?.email },
        { postId: new ObjectId(id) }
    );
    console.log('singleView', singleView);

    if (!singleView) {
        const views = await viewsCollection.insertOne({
            postId: id,
            email: session?.user?.email
        })
        const updateView = await blogsCollection.updateOne(
            { _id: new ObjectId(id) },
            { $inc: { views: 1 } }
        );
        // console.log('updateView', updateView, 'viewsCollection', views);
    };

    const blog = await blogsCollection.findOne({ _id: new ObjectId(id) })
    const singlePost = {
        ...blog,
        _id: blog?._id.toString(),
    };
    // console.log(singlePost);

    return (
        <div>
            <div className='mt-12'>
                {/* text content */}
                < div>
                    <span className='bg-red-700 px-6 py-1 uppercase  text-white font-medium'>{singlePost?.category}</span>
                    <h2 className='text-3xl font-bold my-4'>{singlePost?.title}</h2>
                </div>
                {/* button area */}
                <div className='flex gap-4 mb-4'>
                    <button className='flex items-center gap-3 mr-4 px-16 py-2 bg-[#3059B0]  text-white'
                    >
                        <FaFacebookSquare />
                        <span>Facebook</span>
                    </button>
                    <button className='flex items-center gap-3 mr-4 px-16 py-2 bg-[#55ACEF]  text-white'
                    >
                        <FaXTwitter />
                        <span>Twitter</span>
                    </button>
                </div>
                {/* image and date area */}
                <div className='flex items-center gap-3 mb-4'>
                    <p className='font-semibold '>BY <span className='text-red-700'>{singlePost?.authorName}</span> - </p>
                    <p className='text-gray-400 font-semibold text-xs'>
                        {formattedMongoDbId(singlePost?._id)}</p>
                </div>
                <div className="h-[600px] mx-auto">
                    <Image
                        src={singlePost?.blogBanner}
                        alt={singlePost?.title}
                        width={300}
                        height={300}
                        className="w-full h-full rounded-md object-cover"
                        unoptimized
                    />
                </div>

                {/* SOCIAL LINK */}
                <div className='mb-8'>
                    <div className='flex items-center gap-8 text-xl mt-4 '>
                        <p>SHARE</p>
                        <Link href={'/'}>
                            <FaFacebookSquare className='text-[#3059B0]' />
                        </Link>
                        <Link href={'/'}>
                            <FaXTwitter />
                        </Link>
                        <Link href={'/'}>
                            <FaLinkedinIn />
                        </Link>
                        <Link href={'/'}>
                            <FaInstagram />
                        </Link>
                        <UpdateLike singlePost={singlePost} />
                    </div>
                    <p className='mt-8 text-gray-500'>{singlePost?.description}</p>
                </div>
            </div>
            {
                singlePost && (
                    <AllComment postId={singlePost?._id} />
                )
            }
        </div>
    );
};

export default DetailsPage;