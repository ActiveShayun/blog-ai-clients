'use client';
import { uploadImage } from '@/app/utility/utility';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import "react-datepicker/dist/react-datepicker.css";
import toast from 'react-hot-toast';
import useAxiosPublic from '@/app/useAxiosHook/useAxiosPublic';
import AddBlogsForm from '@/components/shared/blogForm/page';

const UpdateForm = ({ params }) => {
    console.log('params', params);
    const [loading, setLoading] = useState(false)
    const { data: session } = useSession()
    console.log(session);
    const useAxios = useAxiosPublic()
    const update = true;

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm()
    const onSubmit = async (value) => {
        toast.success('Blog updating...')
        // setLoading(true)
        console.log('data', value)
        const tagsArray = value.tags.split(',').map(tag => tag.trim())
        console.log(tagsArray);
        const image = await uploadImage(value.blogBanner[0])
        console.log(image);
        try {
            const blog = {
                blogBanner: image,
                authorEmail: session?.user?.email,
                authorName: value.authorName,
                title: value.title,
                category: value.category,
                tags: tagsArray,
                description: value.description,
                like: false
            }
            const { data } = await useAxios.patch(`/api/blog/${params.id}`, blog)
            console.log('add blog', data);
            if (data.modifiedCount > 0) {
                toast.success('Blog updated Successful')
                setLoading(false)
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div>
            <AddBlogsForm
                session={session}
                errors={errors}
                register={register}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                loading={loading}
                update={update} />
        </div>
    );
};

export default UpdateForm;