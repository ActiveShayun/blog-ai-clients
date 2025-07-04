'use client'
import Title from '@/components/shared/title/Title';
// import dayjs from 'dayjs';
import React from 'react';

const Card = ({ blogBanner, title, category, _id }) => {
    console.log('Card', title, category);


    // const { _id, title, blogBanner, description, authorName, category } = s
    // const date = dayjs(new Date(parseInt(_id.substring(0, 8), 16) * 1000)).format('DD/MM/YYYY')

    function formattedMongoIdDate(id) {
        const timeStampHex = id?.toString().substring(0, 8)
        const timeStamp = parseInt(timeStampHex, 16) * 1000
        const date = new Date(timeStamp)

        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    const formatted = formattedMongoIdDate(_id)

    return (
        <div>
            <div className='relative lg:h-[400px] z-50 overflow-hidden'>
                <div className='absolute h-full w-full top-0 left-0 z-30'>

                    <div className='relative h-full w-full transition-transform duration-500 ease-in-out transform hover:scale-110'>
                        <img
                            src={blogBanner}
                            alt={title}
                            className='absolute h-full w-full object-cover '
                        />
                        {/* Overlay black layer with opacity */}
                        <div className='absolute top-0 left-0 bg-black w-full h-full z-20 opacity-30'></div>
                    </div>
                    {/* Text content */}
                    <div className='text-white absolute bottom-4 left-4 z-40'>
                        <p className='bg-red-600 p-1 w-[90px] flex justify-center mb-2'>{category}</p>
                      <Title title={title}/>
                        <div className='flex items-center gap-2 font-medium italic'>
                            <p>John Dou</p>
                            <p>{formatted}</p>
                        </div>
                    </div>
                </div>


            </div>
        </div>

    );
};

export default Card;