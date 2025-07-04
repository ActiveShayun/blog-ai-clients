'use client'
import GlobalApi from '@/app/globalApi/GlobalApi';
import React from 'react';
import TravelCard from './TravelCard';
import Link from 'next/link';
import Loader from '@/app/loading';

const Travel = () => {
    const [allData, isLoading, error] = GlobalApi()
    console.log('Travel', allData);
    const travels = allData.filter(travel => travel.category === 'travel').slice(0, 3)
    return (
        <div className='mt-16'>
            <div className='border-b border-gray-200 mb-8 flex items-center justify-between'>
                <h2 className='text-xl font-medium border-b border-red-600 w-[90px]'>Travel</h2>
                <Link href={'/'}>View All</Link>
            </div>
            <div className='grid grid-cols-3 gap-4'>
                {isLoading ? <Loader /> :
                    travels?.map(travel => {
                        return (
                            <TravelCard key={travel._id} travel={travel} />
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Travel;