'use client';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import useAxiosPublic from '@/app/useAxiosHook/useAxiosPublic';

export default function MakeAdminButton({ user }) {
    const useAxios = useAxiosPublic()
    const router = useRouter();

    const handleClick = async () => {
        try {
            const { data } = await useAxios.patch(`/api/usersRelated/makeAdmin/${user._id}`, {
                role: user.role === 'Admin' ? 'user' : 'Admin',
            })

            console.log(data);

            if (data.success && data.modified > 0) {
                toast.success('User role updated ✅');
                router.refresh(); // revalidate UI (no need for revalidatePath)
            } else {
                toast.error(result.error || 'Something went wrong');
            }
        } catch (err) {
            toast.error('Server error');
        }
    };

    return (
        <button onClick={handleClick} className="text-green-700 cursor-pointer">
            Make {user.role === 'Admin' ? 'user' : 'Admin'}
        </button>
    );
}
