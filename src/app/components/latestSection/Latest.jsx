'use client'
import * as React from 'react';
import GlobalApi from '@/app/globalApi/GlobalApi';
import Title from '@/components/shared/title/Title';
import { formattedMongoDbId } from '@/app/utility/formatedDate/formatDate';
import Link from 'next/link';



const Latest = () => {
    const [allData, isLoading] = GlobalApi()
    const latest = allData
        .sort((a, b) => b._id.localeCompare(a._id))
        .slice(0, 8)
    console.log(allData[0]?._id);
    console.log('latest', latest);
    return (
        <div className='mt-16'>
            <div className='border-b border-gray-200 mb-8 flex items-center justify-between'>
                <h2 className='text-2xl font-medium border-b border-red-600 w-[90px]'>Latest</h2>
                <Link href={'/'}>View All</Link>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-4 gap-4'>
                {
                    latest.map(l => {
                        return (
                            <data >
                                <div>

                                    <img
                                        className='h-50 w-full object-cover'
                                        src={l.blogBanner}
                                        alt="" />
                                    <div className='flex items-center gap-3 text-gray-500 text-xs font-bold my-3'>
                                        <p className='text-red-600'>{l.authorName}</p>
                                        <p>{formattedMongoDbId(l._id)}</p>
                                    </div>
                                    <Title title={l.title} />
                                </div>
                            </data>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Latest;