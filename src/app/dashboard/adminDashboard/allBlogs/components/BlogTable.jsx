import Image from 'next/image';
import React from 'react';
import { MdOutlineEditNote } from "react-icons/md";
import { FcDeleteDatabase } from "react-icons/fc";

const BlogTable = ({ blog, idx }) => {
    return (
        <>
            <tr >
                <th>{idx + 1}</th>
                <th>{blog.authorName}</th>
                <th>
                    <Image className='w-[50px] h-[50px] rounded-full border '
                        src={blog.blogBanner}
                        alt={blog.title}
                        width={50} height={50} />
                </th>
                <th>{blog.title}</th>
                <th>{blog.category}</th>
                <th className='text-2xl'><MdOutlineEditNote /></th>
                <th  className='text-2xl'><FcDeleteDatabase /></th>
            </tr>
        </>
    );
};

export default BlogTable;