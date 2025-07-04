'use client'
import GlobalApi from '@/app/globalApi/GlobalApi';
import React from 'react';
import Card from './Card';

const FirstCol = () => {
    const [allData, isLoading, error] = GlobalApi()
    console.log('FirstCol', allData);
    const lifeStyle = allData.filter(blog => blog?.category === 'lifeStyle').slice(0, 1)
    console.log('lifeStyle', lifeStyle);
    return (
        <div className='h-96'>
            {
                lifeStyle?.map(s =>
                    <Card
                        key={s._id}
                        title={s.title}
                        category={s.category}
                        blogBanner={s.blogBanner}
                        _id={s._id} />
                )
            }
        </div>
    );
};

export default FirstCol;