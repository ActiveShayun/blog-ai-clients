import Image from 'next/image';
import React from 'react';
import { MdOutlineEditNote } from "react-icons/md";
import { FcDeleteDatabase } from "react-icons/fc";
import Link from 'next/link';

const BlogTable = ({ blog, idx, handleBlogDelete }) => {
    return (
        <>
            <tr className='text-left'>
                <th>{idx + 1}</th>
                <th>{blog.authorName}</th>
                <th>
                    <Image className='w-[50px] h-[50px] rounded-full border'
                        src={blog?.blogBanner}
                        alt={blog?.title}
                        width={50} height={50} />
                </th>
                <th>{blog.title}</th>
                <th>{blog.category}</th>
                <Link href={`/blogDetails/${blog._id}`}>
                    <th className='cursor-pointer'>Details</th>
                </Link>
                <th className='text-2xl'>
                    <Link href={`/dashboard/adminDashboard/updateBlog/${blog._id}`}>
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