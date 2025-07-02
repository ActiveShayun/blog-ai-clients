import { Button, CardActions } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import ImageContainer from './ImageContainer';


const CardBlog = ({ blog }) => {
    return (
        <div className='rounded-tl-2xl rounded-br-2xl  bg-[#E0F6F1] p-3'>
            <div>
                <div className='rounded-2xl'>
                    <ImageContainer blog={blog}/>
                    {/* <Image className='w-full rounded-lg h-[200px] object-cover'
                        src={blog.blogBanner}
                        width={200} height={200}
                        alt={blog.title} /> */}
                    <div className='flex items-center justify-between text-xs font-sans italic pt-4 border-b uppercase'>
                        <h1>{blog.category}</h1>
                        <p>01/12/20025</p>
                    </div>
                </div>
                <div className='mt-3'>
                    <h2 className='text-xl font-medium mb-2'>
                        {blog.title}
                    </h2>
                    <p className='text-left'>
                        {blog.description.slice(0, 50)}....
                    </p>
                </div>
                <div className='flex items-center gap-3'>
                    <Image className='rounded-full w-[50px] h-[50px] object-cover mt-3'
                        src={blog.blogBanner}
                        width={200} height={200}
                        alt={blog.title} />
                    <div className='text-xs font-bold'>
                        <h3>John Row</h3>
                        <p>American Blogger</p>
                    </div>
                </div>
                <CardActions className='flex justify-between'>
                    <Button size="small">Like {blog.like}</Button>
                    <Button size="small">Dislike {blog.disLike}</Button>
                    <button className='bg-black text-white py-1 px-3 rounded-tl-lg rounded-br-lg'
                        size="small">Read More</button>
                </CardActions>
            </div>
        </div>
    );
};

export default CardBlog;