'use client'
import GlobalApi from '@/app/globalApi/GlobalApi';
import React from 'react';
import Link from 'next/link';
import Loader from '@/app/loading';
import Card from '@/components/shared/card/Card';

const Travel = () => {
    const [allData, isLoading, error] = GlobalApi()
    console.log('Travel', allData);
    const travels = allData.filter(travel => travel.category === 'travel').slice(0, 4)
    return (
        <div className='mt-16'>
            <div className='border-b border-gray-200 mb-8 flex items-center justify-between'>
                <h2 className='text-xl font-medium border-b border-red-600 w-[90px]'>Travel</h2>
                <Link href={'/'}>View All</Link>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-4 gap-4'>
                {isLoading ? <Loader /> :
                    travels?.map(travel => {
                        return (
                            <Card key={travel._id}
                                _id={travel._id}
                                authorName={travel.authorName}
                                blogBanner={travel.blogBanner}
                                title={travel.title}
                                category={travel.category}
                                description={travel.description} />
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Travel;