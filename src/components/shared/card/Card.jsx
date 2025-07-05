'use client'
import { formattedMongoDbId } from '@/app/utility/formatedDate/formatDate';
import { Title } from '@mui/icons-material';
import React from 'react';

const Card = ({ blogBanner, w, title, category, _id, description, authorName }) => {
    return (
        <div>
            <div>
                <img className={`${w ? 'h-75' : ''} w-full h-52 object-cover`}
                    src={blogBanner}
                    alt={title}
                />
            </div>
            {/* text content */}
            <div>
                <div className='text-xs font-medium flex items-center gap-2 mt-3 mb-5'>
                    <p className=''>{authorName}</p>
                    <p>{formattedMongoDbId(_id)}</p>
                </div>
                <Title title={title.slice(0, 50)} />
                <p className='text-gray-500 mt-2'>{description.slice(1, 150)}...</p>
            </div>
        </div>
    );
};

export default Card;