'use server'
import { formattedMongoDbId } from '@/app/utility/formatedDate/formatDate';
import dbConnect, { collectionNameObj } from '@/lib/dbConnect';
import AddComment from '../addComment/AddComment';


const AllComment = async ({ postId }) => {
    console.log(postId);
    const commentCollection = await dbConnect(collectionNameObj.commentCollection);
    const comments = await commentCollection.find({ postId: postId }).toArray()
    console.log('comments', comments);

    return (
        <div>
            <div className='border-b border-gray-200 mb-8 text-2xl font-medium'>
                <h2 className='text-red-700 border-b border-red-600 w-[150px]  flex items-center gap-4 '>
                    <span >{comments?.length}</span>
                    <span className='text-black'>Comments</span>
                </h2>
            </div>
            <div className='mb-8'>
                {
                    comments?.map(c => {
                        return <div
                            key={c._id}
                            className='text-lg flex items-start mb-4
                            gap-6'>
                            <img
                                className=' w-[60px] h-[60px] rounded-full border'
                                src={c.userPhoto} alt=""
                              />

                            <div className=''>
                                <h1 className='text-xl font-semibold italic'>{c.authorName}</h1>
                                <div className='flex items-center gap-4'>
                                    <p>{formattedMongoDbId(c?._id)}</p>
                                    {/* <FeedBack feedback={c.feedBack} /> */}
                                </div>
                                <p className='text-gray-500'>{c.description}</p>
                            </div>
                        </div>
                    })
                }
            </div>
            <AddComment postId={postId} />
        </div>
    )
};

export default AllComment;