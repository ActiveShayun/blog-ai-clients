'use client'
import React from 'react';
import { formattedMongoDbId } from '@/app/utility/formatedDate/formatDate';
import { FaFacebookSquare, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FcDislike, FcLike } from "react-icons/fc";
import { FaXTwitter } from "react-icons/fa6";
import Link from 'next/link';
import AxiosPublic from '@/app/useAxiosHook/AxiosPublic';
import AllComment from '@/app/components/allcomment/AllComment';
import { useQuery } from '@tanstack/react-query';


const DetailsPage = ({ params }) => {
    const id = params
    const useAxios = AxiosPublic()

    const { data: singlePost, isLoading, refetch } = useQuery({
        queryKey: ['singlePost'],
        queryFn: async () => {
            const res = await useAxios.get(`/api/blog/${id}`)
            console.log('single post', res);
            return res.data
        }
    })

    console.log('singlePost', singlePost);

    const updateLikeCount = async (id,) => {
        console.log(id);
        const { data } = await useAxios.patch(`/api/updatedLike/${id}`,)
        if (data.modifiedCount > 0) {
            refetch()
        }

        console.log(data);
    }
    const handleDisLikeCount = async (id,) => {
        console.log(id);
        const { data } = await useAxios.patch(`/api/disLike/${id}`,)
        if (data.matchedCount > 0) {
            refetch()
        }

        console.log(data);
    }

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
                    <p className='text-gray-400 font-semibold text-xs'>{formattedMongoDbId(singlePost?._id)}</p>
                </div>
                <img className='lg:h-[600px] w-full object-cover'
                    src={singlePost?.blogBanner}
                    alt={singlePost?.title} />

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
                        <button onClick={() => updateLikeCount(singlePost?._id)}
                            className='flex items-center gap-2 cursor-pointer text-red-700'>
                            <FcLike />
                            <span>{singlePost?.like}</span>
                        </button>
                        <button onClick={() => handleDisLikeCount(singlePost?._id)}
                            className='flex items-center gap-2 cursor-pointer text-red-700'>
                            <FcDislike />
                            <span>{singlePost?.disLike}</span>
                        </button>
                    </div>
                    <p className='mt-8 text-gray-500'>{singlePost?.description}</p>
                </div>
            </div>
            {
                singlePost?._id && (
                    <AllComment singlePost={singlePost} />
                )
            }
        </div>
    );
};

export default DetailsPage;