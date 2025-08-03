'use client'
import useAxiosPublic from '@/app/useAxiosHook/useAxiosPublic';
import { useRouter } from 'next/navigation';
import { FcDislike, FcLike } from 'react-icons/fc';
import { FaRegEye } from "react-icons/fa";


const updateLike = ({ singlePost }) => {
    const useAxios = useAxiosPublic();
    const router = useRouter();

    const updateLikeCount = async () => {
        const { data } = await useAxios.patch(`/api/updatedLike/${singlePost._id}`)
        console.log('updateLike', data);
        if (data.modifiedCount > 0) {
            router.refresh()
        }
    }

    const handleDisLikeCount = async () => {
        const { data } = await useAxios.patch(`/api/disLike/${singlePost._id}`)
        if (data.matchedCount > 0) {
            router.refresh()
        }
        console.log(data);
    }

    return (
        <div className='flex items-center gap-8'>
            <button onClick={updateLikeCount}
                className='flex items-center gap-2 cursor-pointer text-red-700'>
                <FcLike />
                <span>{singlePost?.like}</span>
            </button>
            <button onClick={handleDisLikeCount}
                className='flex items-center gap-2 cursor-pointer text-red-700'>
                <FcDislike />
                <span>{singlePost?.disLike}</span>
            </button>
            <p className='flex items-center gap-2'>
                <FaRegEye />
                {singlePost.views}
            </p>
        </div>
    );
};

export default updateLike;