'use clint'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import React from 'react';
import Loader from '../loading';
import Link from 'next/link';

const AllBlog = () => {

    const { data: blogs = [], isLoading, error, refetch } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:3000/api/allBlog')
            console.log('allBlog', res);
            return res.data
        }
    })

    const updateLikeCount = async (id,) => {
        console.log(id);
        const { data } = await axios.patch(`http://192.168.0.105:3000/api/updatedLike/${id}`,)
        if (data.modifiedCount > 0) {
            refetch()
        }

        console.log(data);
    }
    const HandleDisLikeCount = async (id,) => {
        console.log(id);
        const { data } = await axios.patch(`http://192.168.0.105:3000/api/disLike/${id}`,)
        if (data.modifiedCount > 0) {
            refetch()
        }

        console.log(data);
    }

    console.log(blogs);
    return (
        <div>
            <div className="grid grid-cols-4 gap-4">
                {isLoading ? <Loader />
                    :
                    blogs?.map((blog) => {
                        return (
                            <div key={blog._id} href={`/blogDetails/${blog._id}`}>
                                <div key={blog._id} className="border p-3 rounded-lg">
                                    <Image
                                        src={blog.blogBanner}
                                        width={200}
                                        height={200}
                                        alt={blog.title} />
                                    <h2 className="text-lg font-medium">{blog.title}</h2>
                                    <h2>{blog.description}</h2>
                                    <p className="">
                                        <button className='btn'
                                            onClick={() => updateLikeCount(blog._id)}>
                                            Liked  {blog.like > 0 ?
                                                blog.like : 0}
                                        </button>
                                    </p>
                                    <p className="">
                                        <button className='btn'
                                            onClick={() => HandleDisLikeCount(blog._id)}>
                                            Disliked  {blog.disLike > 0 ?
                                                blog.disLike : 0}
                                        </button>
                                    </p>
                                    <Link className='btn'
                                        href={`blogDetails/${blog._id}`}>
                                        Details</Link>
                                </div>
                            </div>
                        )
                    })}

            </div>
        </div>
    );
};

export default AllBlog;