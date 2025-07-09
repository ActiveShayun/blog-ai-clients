'use client'
import GlobalApi from '@/app/globalApi/GlobalApi';
import React from 'react';
import Link from 'next/link';
import Card from '@/components/shared/card/Card';


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
                            <Card key={tech._id}
                                _id={tech._id}
                                authorName={tech.authorName}
                                blogBanner={tech.blogBanner}
                                title={tech.title}
                                category={tech.category}
                                description={tech.description} />
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Technology;