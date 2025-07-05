'use client'
import GlobalApi from '@/app/globalApi/GlobalApi';
import React from 'react';
import Card from '../card/Card';
import Link from 'next/link';


const Technology = () => {
    const [allData, isLoading, error] = GlobalApi()
    console.log('FirstCol', allData);
    const technology = allData.filter(blog => blog?.category === 'technology').slice(0, 1)
    console.log('Technology', technology);
    return (
        <div>
            <div className='border-b border-gray-200 mb-8 flex items-center justify-between'>
                <h2 className='text-2xl font-semibold border-b border-red-600 w-[90px]'>Technology</h2>
                <Link href={'/'}>View All</Link>
            </div>
            <div>
                {
                    technology?.map(tech => {
                        return (
                            <Card key={tech._id} tech={tech} />
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Technology;