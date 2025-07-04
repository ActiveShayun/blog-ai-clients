'use clients'
import GlobalApi from '@/app/globalApi/GlobalApi';
import Loader from '@/app/loading';
import { formattedMongoDbId } from '@/app/utility/formatedDate/formatDate';
import React from 'react';

const Article = () => {
    const [allData, isLoading, error] = GlobalApi()
    console.log('FirstCol', allData);
    const articles = allData.filter(blog => blog?.like >= 5).slice(0, 4)
    console.log('articles', articles);
   
    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8'>
            {
                isLoading ? <Loader /> :
                    articles?.map(article => {
                       return <div key={article._id} className='flex items-center gap-4'>
                           <img className='w-28 object-cover h-20'
                            src={article.blogBanner} alt="" />
                            <div>
                                <h3 className='text-lg font-medium'>{article.title}</h3>
                                <p className='text-gray-500'>{formattedMongoDbId(article._id)}</p>
                            </div>
                        </div>
                    })
            }
        </div>
    );
};

export default Article;