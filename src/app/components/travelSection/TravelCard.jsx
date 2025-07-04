'use client'
import Title from '@/components/shared/title/Title';
import React from 'react';

const TravelCard = ({ travel }) => {
    const { blogBanner, title, category, _id, description, authorName } = travel

    function formattedMongoDbId(id) {
        const timeStampHex = id?.toString().substring(0, 8)
        const timeStamp = parseInt(timeStampHex, 16) * 1000
        const date = new Date(timeStamp)

        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }
    const formattedDate = formattedMongoDbId(_id)

    return (
        <div>
            <div>
                <div>
                    <img className='w-full h-52 object-cover'
                        src={blogBanner}
                        alt={title}
                        unoptimized />
                </div>
                {/* text content */}
                <div>
                    <div className='text-xs font-medium flex items-center gap-2 my-3'>
                        <p>{authorName}</p>
                        <p>{formattedDate}</p>
                    </div>
                    <Title title={title} />
                    <p className='text-gray-500'>{description}</p>
                </div>
            </div>
        </div>
    );
};

export default TravelCard;