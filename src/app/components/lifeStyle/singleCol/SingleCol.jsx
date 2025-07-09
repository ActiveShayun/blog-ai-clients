'use client'
import GlobalApi from '@/app/globalApi/GlobalApi';
import Card from '@/components/shared/card/Card';
import React from 'react';

const SingleCol = () => {
    const [allData, isLoading, error] = GlobalApi()
    const lifeStyle = allData.filter(style => style.category === 'lifeStyle').slice(0, 1)
    console.log('lifeStyle', lifeStyle);
    return (
        <div>
            {
                lifeStyle?.map(style => {
                    return (
                        <Card
                            authorName={style.authorName}
                            w={true}
                            blogBanner={style.blogBanner}
                            title={style.title}
                            _id={style._id}
                            description={style.description} />
                    )
                })
            }
        </div>
    );
};

export default SingleCol;