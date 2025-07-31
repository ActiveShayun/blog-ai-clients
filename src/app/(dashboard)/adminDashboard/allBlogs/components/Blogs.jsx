'use client'
import React, { useEffect } from 'react';
import BlogTable from './BlogTable';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loader from '@/app/loading';
import toast from 'react-hot-toast';
import useAxiosPublic from '@/app/useAxiosHook/useAxiosPublic';


const Blogs = () => {
    const useAxios = useAxiosPublic()

    const { data: blogs = [], isLoading, error, refetch } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await useAxios.get('/api/allBlog')
            console.log('allBlog', res);
            return res.data
        }
    })
    console.log(blogs);


    const handleBlogDelete = async (id) => {
        toast.success('Deleting Ongoing...')
        const res = await useAxios.delete(`/api/blog/${id}`)
        console.log('delete', res);
        if (res.data.deletedCount > 0) {
            toast.success('Deleting successfully Done')
            refetch()
        }
    }



    console.log('allBlog', blogs);
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className='text-left'>
                            <th>ID</th>
                            <th>Author Name</th>
                            <th>Blogs Image</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Blog Details</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ?
                            <div className='w-full flex justify-center  mx-auto'>
                                <Loader />
                            </div> :
                            blogs?.map((blog, idx) => {
                                return (
                                    <BlogTable
                                        key={blog._id}
                                        blog={blog}
                                        idx={idx}
                                        handleBlogDelete={handleBlogDelete}
                                    />
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Blogs;