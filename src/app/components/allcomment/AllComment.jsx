'use client'
import AddComment from '@/app/blogDetails/commentForm/AddComment';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


const AllComment = ({ singleService }) => {
    console.log('serviceId', singleService);
    const id = singleService._id

    const { data: allComment = [], isLoading, refetch } = useQuery({
        queryKey: ['comments'],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:3000/api/allComments/${id}`)
            console.log('allComment', res.data);
            return res.data
        }
    })
    return (
        <div>
            <AddComment singleService={singleService} refetch={refetch} />
            <div>
                {
                    allComment?.map(c => {
                        return <p key={c._id} className='text-lg'>{c.description}</p>
                    })
                }
            </div>
        </div>
    )
};

export default AllComment;