'use client'
import { formattedMongoDbId } from '@/app/utility/formatedDate/formatDate';
import Title from '@/components/shared/title/Title';
import React from 'react';

const Card = ({ culture }) => {
    console.log(culture);
    const { blogBanner, title, description, authorName } = culture
    return (
        <div className='grid grid-cols-1 lg:grid-cols-6 gap-6 mb-4'>
            <div className='h-[200px] col-span-2'>
                <img className='object-cover w-full h-full' src={blogBanner} alt="" />
            </div>
            <div className='col-span-4 '>
                <Title title={title} />
                <div className='flex items-center gap-3 font-semibold text-gray-500'>
                    <h3 className='text-green-600'>{authorName}</h3>
                    <p>{formattedMongoDbId(culture._id)}</p>
                </div>
                <p className='text-gray-500'>{description.slice(0, 170)}...</p>
            </div>
        </div>
    );
};

export default Card;