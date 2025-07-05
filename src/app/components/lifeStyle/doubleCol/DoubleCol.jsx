'use client'
import GlobalApi from '@/app/globalApi/GlobalApi';
import Loader from '@/app/loading';
import { formattedMongoDbId } from '@/app/utility/formatedDate/formatDate';
import React from 'react';

const DoubleCol = () => {
    const [allData, isLoading, error] = GlobalApi()
    const lifeStyle = allData.filter(style => style.category === 'lifeStyle').slice(0, 4)
    console.log('lifeStyle', lifeStyle);

    return (

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 w-full'>
            {
                isLoading ? <Loader /> :
                    lifeStyle?.map(style => {
                        return <div key={style._id} className='mb-3 w-full'>
                            <img className='object-cover h-30 w-full mb-3'
                                src={style.blogBanner} alt="" />
                            <div>
                                <h3 className='text-lg font-medium mb-2'>{style.title.slice(0, 40)}</h3>
                                <p className='text-gray-500'>{formattedMongoDbId(style._id)}</p>
                            </div>
                        </div>
                    })
            }
        </div>
    );
}
export default DoubleCol;