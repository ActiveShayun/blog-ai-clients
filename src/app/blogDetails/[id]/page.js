'use server'
import Image from 'next/image';
import React from 'react';
import AddComment from '../commentForm/AddComment';

const BlogDetails = async ({ params }) => {
    const p = await params?.id;
    const data = await fetch(`http://localhost:3000/api/blog/${p}`)
    const singleService = await data.json()
    return (
        <div>
            <div>
                <Image
                    src={singleService.blogBanner}
                    width={200} height={200}
                    alt={singleService.title} />
                <h2 className='text-2xl font-bold'>{singleService.title}</h2>
            </div>
            <AddComment singleService={singleService} />
        </div>
    );
};

export default BlogDetails;