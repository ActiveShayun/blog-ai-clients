'use client'
import addBlogs from "@/app/apies/addBlog";
import { uploadImage } from "@/app/utility/utility";
import AddBlogsForm from "@/components/shared/blogForm/page";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AddBlogForm = () => {
    const { data: session } = useSession()
    console.log('user', session?.user.name);
    const [loading, setLoading] = useState(false)

    const {
        register,
        formState: { error },
        handleSubmit,
        reset
    } = useForm()
    const onSubmit = async (data) => {
        const toastId = toast.loading('Blog Adding...')
        setLoading(true)
        console.log('data', data)
        const tagsArray = data.tags.split(',').map(tag => tag.trim())
        console.log(tagsArray);
        const image = await uploadImage(data.blogBanner[0])
        console.log(image);
        try {
            const blog = {
                blogBanner: image,
                authorEmail: session?.user?.email,
                authorName: data.authorName,
                title: data.title,
                category: data.category,
                tags: tagsArray,
                description: data.description,
                like: 0,
                disLike: 0
            }
            const res = await addBlogs(blog)
            console.log('add blog', res);
            if (res.insertedId) {
                toast.success('Blog Added Successful', { id: toastId })
                setLoading(false)
                reset()
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }
    return (
        <div>
            <AddBlogsForm
                loading={loading}
                session={session}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                register={register}
                error={error} />
        </div>
    );
};

export default AddBlogForm;