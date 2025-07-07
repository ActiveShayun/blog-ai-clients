/* eslint-disable @next/next/no-img-element */
'use server'
import React from 'react';
import AllComment from '@/app/components/allcomment/AllComment';
import { formattedMongoDbId } from '@/app/utility/formatedDate/formatDate';
import { FaFacebookSquare, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Link from 'next/link';

const BlogDetails = async ({ params }) => {
    const p = await params?.id;
    const data = await fetch(`http://localhost:3000/api/blog/${p}`)
    const singleService = await data.json()
    return (
        <div>
            <div className='mt-12'>
                {/* text content */}
                < div>
                    <span className='bg-red-700 px-6 py-1 uppercase  text-white font-medium'>{singleService.category}</span>
                    <h2 className='text-3xl font-bold my-4'>{singleService.title}</h2>
                </div>
                {/* button area */}
                <div className='flex gap-4 mb-4'>
                    <button className='flex items-center gap-3 mr-4 px-16 py-2 bg-[#3059B0]  text-white'
                    >
                        <FaFacebookSquare />
                        <span>Facebook</span>
                    </button>
                    <button className='flex items-center gap-3 mr-4 px-16 py-2 bg-[#3059B0]  text-white'
                    >
                        <FaXTwitter />
                        <span>Twitter</span>
                    </button>
                </div>
                {/* image and date area */}
                <div className='flex items-center gap-3 mb-4'>
                    <p className='font-semibold '>BY <span className='text-red-700'>{singleService.authorName}</span> - </p>
                    <p className='text-gray-400 font-semibold text-xs'>{formattedMongoDbId(singleService._id)}</p>
                </div>
                <img
                    src={singleService.blogBanner}
                    alt={singleService.title} />

                {/* SOCIAL LINK */}
                <div>
                    <div className='flex items-center gap-8 text-xl mt-4'>
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
                    </div>
                    <p className='mt-8 text-gray-500'>{singleService.description}</p>
                </div>
            </div>
            <AllComment singleService={singleService} />
        </div>
    );
};

export default BlogDetails;