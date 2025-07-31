'use client'
import { formattedMongoDbId } from '@/app/utility/formatedDate/formatDate';

import React from 'react';
import Title from '../title/Title';
import Link from 'next/link';

const Card = ({ paragraphTextShow, category, blogBanner, w, p, title, _id, description, authorName }) => {
    console.log(title);
    return (
        <div className={`${p ? 'mb-4 px-4' : ''} group `}>
            <div className='relative overflow-hidden'>
                <img className={`${w ? 'h-75' : ''} w-full h-52 object-cover
                 group-hover:scale-110 transition-transform ease-in-out duration-500 transform`}
                    src={blogBanner}
                    alt={title}
                />
                <p className='absolute text-white bottom-0 z-50
                 bg-black uppercase p-0.5 italic group-hover:bg-[#EC0E0E] transition duration-500 ease-in-out'>{category}</p>
                {/* Overlay black layer with opacity */}
                <div className='absolute top-0 left-0 bg-black w-full h-full z-20 opacity-30'></div>
            </div>
            {/* text content */}
            <div>
                <div className='text-xs font-medium flex items-center gap-2 mt-4 mb-2'>
                    <p className='text-[#EC0E0E]'>{authorName}</p>
                    <p>{formattedMongoDbId(_id)}</p>
                </div>
                <Link href={`/blogDetails/${_id}`}>
                    <Title title={title} />
                </Link>
                <p className={`${paragraphTextShow ? 'hidden' : 'block'} text-gray-500 mt-2 `}>{description?.slice(1, 150)}...</p>
            </div>
        </div>
    );
};

export default Card;