'use server'
import React from 'react';
import AllComment from '@/app/components/allcomment/AllComment';

const BlogDetails = async ({ params }) => {
    const p = await params?.id;
    const data = await fetch(`http://localhost:3000/api/blog/${p}`)
    const singleService = await data.json()
    return (
        <div>
            <div>
                <img
                   src={singleService.blogBanner}
                    alt={singleService.title} />
                <h2 className='text-2xl font-bold'>{singleService.title}</h2>
            </div>
            <AllComment singleService={singleService} />
        </div>
    );
};

export default BlogDetails;