'use client'
import useAxiosPublic from "@/app/useAxiosHook/useAxiosPublic";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CgUserRemove } from "react-icons/cg";

const UserDelete = ({ user }) => {
    const useAxios = useAxiosPublic()
    const router = useRouter()
    const handleDelete = async () => {
        try {
            const { data } = await useAxios.delete(`/api/usersRelated/deleteUser/${user?._id}`)
            console.log(data);
            if (data.deletedCount > 0) {
                toast.success('User remove successfully')
                router.refresh()
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <button onClick={handleDelete}>
            <CgUserRemove className="text-3xl text-red-600 cursor-pointer" />
        </button>
    );
};

export default UserDelete;