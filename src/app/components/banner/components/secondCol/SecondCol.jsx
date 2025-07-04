'use client'
import GlobalApi from '@/app/globalApi/GlobalApi';

import React from 'react';
import Card from '../FirstCol/Card';

const SecondCol = () => {
    const [allData, isLoading, error] = GlobalApi()
    console.log('FirstCol', allData);
    const business = allData.filter(blog => blog?.category === 'bussiness').slice(0, 1)
    console.log('business',business);
    return (
        <div>
            {
                business?.map(s => {
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

export default SecondCol;