'use client'
import AddComment from '@/app/blogDetails/commentForm/AddComment';
import AxiosPublic from '@/app/useAxiosHook/AxiosPublic';
import { formattedMongoDbId } from '@/app/utility/formatedDate/formatDate';
import { useQuery } from '@tanstack/react-query';
import FeedBack from './components/FeedBack';



const AllComment = ({ singlePost }) => {

    console.log('serviceId', singlePost);
    const id = singlePost?._id
    const useAxios = AxiosPublic()

    const { data: allComment = [], isLoading, refetch } = useQuery({
        queryKey: ['comments'],
        queryFn: async () => {
            const res = await useAxios.get(`/api/allComments/${id}`)
            console.log('allComment', res.data);
            return res.data
        }
    })



    return (
        <div>
            <div className='border-b border-gray-200 mb-8 text-2xl font-medium'>

                <h2 className='text-red-700 border-b border-red-600 w-[150px]  flex items-center gap-4 '>
                    <span >{allComment?.length}</span>
                    <span className='text-black'>Comments</span>
                </h2>
            </div>
            <div className='mb-8'>
                {
                    allComment?.map(c => {
                        return <div
                            key={c._id}
                            className='text-lg flex items-start mb-4
                            gap-6'>
                            <img
                                className=' w-[60px] h-[60px] rounded-full border'
                                src={c.userPhoto} alt="" />

                            <div className=''>
                                <h1 className='text-xl font-semibold italic'>{c.authorName}</h1>
                                <div className='flex items-center gap-4'>
                                    <p>{formattedMongoDbId(c?._id)}</p>
                                    <FeedBack feedback={c.feedBack} />
                                </div>
                                <p className='text-gray-500'>{c.description}</p>
                            </div>
                        </div>
                    })
                }
            </div>
            <AddComment
                singlePost={singlePost}
                refetch={refetch} />
        </div>
    )
};

export default AllComment;