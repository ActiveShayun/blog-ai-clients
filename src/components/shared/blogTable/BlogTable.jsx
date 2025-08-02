'use client'
import Image from 'next/image';
import React from 'react';
import { MdOutlineEditNote } from "react-icons/md";
import { FcDeleteDatabase } from "react-icons/fc";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import useAxiosPublic from '@/app/useAxiosHook/useAxiosPublic';

const BlogTable = ({ blog, idx }) => {
    const router = useRouter();
    const useAxios = useAxiosPublic()

    const handleBlogDelete = async (id) => {
        toast.success('Deleting Ongoing...')
        const res = await useAxios.delete(`/api/blog/${id}`)
        console.log('delete', res);
        if (res.data.deletedCount > 0) {
            toast.success('Deleting successfully Done')
            router.refresh()
        }
    }

    const handleStatusUpdate = async (id) => {
        try {
            console.log(id);
            const res = await useAxios.patch(`/api/blogsRelatedApis/statusUpdate/${id}`)
            console.log('update status', res);
            if (res.data.modified > 0) {
                toast.success('update successfully Done')
                router.refresh()
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <tr className='text-left'>
                <th>{idx + 1}</th>
                <th>{blog.authorName}</th>
                <th>
                    <img className='w-[50px] h-[50px] rounded-full border'
                        src={blog?.blogBanner}
                        alt={blog?.title}
                    />
                </th>
                <th>{blog.category}</th>
                <th className='cursor-pointer'>
                    <Link href={`/pages/blogDetailsPage/${blog._id}`}>
                        Details
                    </Link>
                </th>
                <th>
                    <button disabled={blog?.status === 'approved'}
                        onClick={() => handleStatusUpdate(blog?._id)}>
                        {blog?.status === 'approved' ? 'Approved' : 'Pending'}
                    </button>
                </th>
                <th className='text-2xl'>
                    <Link href={`/userDashboard/updateBlog/${blog._id}`}>
                        <MdOutlineEditNote />
                    </Link>
                </th>
                <th className='text-2xl'>
                    <button onClick={() => handleBlogDelete(blog._id)}>
                        <FcDeleteDatabase />
                    </button>
                </th>
            </tr>
        </>
    );
};

export default BlogTable;