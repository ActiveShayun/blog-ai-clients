'use client'
import Title from '@/components/shared/title/Title';
import React from 'react';

const Card = ({ tech }) => {
    const { blogBanner, title, category, _id, description, authorName } = tech

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
                         />
                </div>
                {/* text content */}
                <div>
                    <div className='text-xs font-medium flex items-center gap-2 my-3'>
                        <p>{authorName}</p>
                        <p>{formattedDate}</p>
                    </div>
                    <Title title={title.slice(0,50)} />
                    <p className='text-gray-500'>{description.slice(1,150)}...</p>
                </div>
            </div>
        </div>
    );
}

export default Card;