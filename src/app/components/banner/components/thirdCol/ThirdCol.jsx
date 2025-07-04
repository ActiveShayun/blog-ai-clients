'use client'
import React from 'react';
import Card from '../FirstCol/Card';
import GlobalApi from '@/app/globalApi/GlobalApi';

const ThirdCol = () => {
    const [allData, isLoading, error] = GlobalApi()
    console.log('FirstCol', allData);
    const sports = allData.filter(blog => blog?.category === "sports").slice(0, 1)
    console.log('business', sports);
    return (
        <div>
            {
                sports?.map(s => {
                    return <Card
                        key={s._id}
                        title={s.title}
                        category={s.category}
                        blogBanner={s.blogBanner}
                        _id={s._id} />
                })
            }
        </div>
    );
};

export default ThirdCol;