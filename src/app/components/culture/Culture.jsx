'use client'
import GlobalApi from '@/app/globalApi/GlobalApi';
import React from 'react';
import Card from './Card';
import Link from 'next/link';

const Culture = () => {
    const [allData, isLoading] = GlobalApi()
    const cultures = allData.filter(culture => culture.category === 'culture').slice(0, 6)
    console.log('cultures', cultures);
    return (
        <div className='mt-16'>
            <div className='border-b border-gray-200 mb-8 flex items-center justify-between'>
                <h2 className='text-2xl font-medium border-b border-red-600 w-[90px]'>Culture</h2>
                <Link href={'/'}>View All</Link>
            </div>
            <div>
                {
                    cultures.map(culture => {
                        return (
                            <Card key={culture._id} culture={culture} />
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Culture;