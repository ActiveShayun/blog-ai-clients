'use client'
import GlobalApi from '@/app/globalApi/GlobalApi';
import Loader from '@/app/loading';
import Card from '@/components/shared/card/Card';
import React from 'react';

const Popular = () => {

    const [allData, isLoading] = GlobalApi()
    const cultures = allData.filter(culture => culture.category === 'culture').slice(0, 1)
    const lifeStyles = allData.filter(culture => culture.category === 'lifeStyle').slice(0, 1)
    const sports = allData.filter(culture => culture.category === 'sports').slice(0, 1)
    const bussiness = allData.filter(culture => culture.category === 'bussiness').slice(0, 1)
    const travel = allData.filter(culture => culture.category === 'travel').slice(0, 1)


    const popular = [...cultures, ...lifeStyles, ...sports, ...bussiness, ...travel]

    console.log('allPopular', popular);
    return (
        <div>
            <h2 className='text-2xl font-semibold
             text-center text-red-600 mb-5'>Popular</h2>
            {isLoading ? <Loader /> :
                popular?.map(p => {
                    return (
                        <Card key={p._id}
                            _id={p._id}
                            p={true}
                            paragraphTextShow={true}
                            authorName={p.authorName}
                            blogBanner={p.blogBanner}
                            title={p.title}
                            category={p.category}
                            description={p.description} />
                    )
                })
            }
        </div>
    );
};

export default Popular;