'use client';
import { uploadImage } from '@/app/utility/utility';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { RiLoaderLine } from 'react-icons/ri';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import toast from 'react-hot-toast';
import AxiosPublic from '@/app/useAxiosHook/AxiosPublic';

const UpdateBlogForm = ({ result }) => {

    console.log('singleBlog', result);
    const [loading, setLoading] = useState(false)
    const [startDate, setStartDate] = useState(new Date());
    const { data: session } = useSession()
    console.log(session);
    const useAxios = AxiosPublic()


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
                authorEmail: session?.user.name,
                authorName: value.authorName,
                title: value.title,
                category: value.category,
                tags: tagsArray,
                description: value.description,
                like: false
            }
            const { data } = await useAxios.patch(`/api/blog/${result._id}`, blog)
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
            <div className="hero-content flex-col lg:flex-row-reverse w-full">
                <div className="card bg-base-100 w-full shadow-2xl">
                    <div className="card-body w-full ">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <fieldset className="fieldset w-full">
                                <div>
                                    <label className="label mb-2 text-lg">Blog Banner</label>
                                    <input className="w-full input p-3"
                                        {...register('blogBanner', { required: true })}
                                        type="file"

                                    />
                                </div>
                                {/* row 1 */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-3">
                                    {/* Author Email */}
                                    <div>
                                        <label className="label mb-2 text-lg">Author Email</label>
                                        <input type="email"
                                            defaultValue={session?.user.email}
                                            {...register("authorEmail", { required: true })}
                                            className="input w-full"
                                            placeholder="Email" disabled />
                                    </div>
                                    {/* author name */}
                                    <div>
                                        <label className="label mb-2 text-lg">Name</label>
                                        <input type="text"
                                            defaultValue={session?.user.name}
                                            {...register("authorName", { required: true })}
                                            className="input w-full"
                                            placeholder="Enter your name" />
                                    </div>
                                </div>
                                {/* row 2 */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-3">
                                    {/*title */}
                                    <div>
                                        <label className="label mb-2 text-lg">Title</label>
                                        <input type="text"
                                            defaultValue={result.title}
                                            {...register('title', { required: true })}
                                            className="input w-full"
                                            placeholder="Enter a blog title" />
                                    </div>
                                    {/*category */}
                                    <div>
                                        <label className="label block mb-2 text-lg">Pick a category</label>
                                        <select
                                            defaultValue={result.category}
                                            {...register('category', { required: true })}
                                            className="select w-full" required>
                                            <option disabled={true}>Pick a category</option>
                                            <option value={'javaScript'}>JavaScript</option>
                                            <option value={'Nextjs'}>Next.js</option>
                                            <option value={'WebDev'}>Web Dev</option>
                                            <option value={'lifeStyle'}>Life Style</option>
                                            <option value={'sports'}>Sports</option>
                                            <option value={'bussiness'}>Bussiness</option>
                                            <option value={'travel'}>Travel</option>
                                            <option value={'technology'}>Technology</option>
                                        </select>
                                    </div>
                                </div>
                                {/* row 3 */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-3">
                                    {/*Tags/Keywords*/}
                                    <div>
                                        <label className="label mb-2 text-lg">Blog Tags/Keywords</label>
                                        <input type="text"
                                            defaultValue={result.tags.map(t => t)}
                                            {...register('tags', { required: true })}
                                            className="input w-full"
                                            placeholder="Enter blog tags/keywords" />
                                    </div>
                                    {/*Main Content*/}
                                    <div>
                                        <label className="label mb-2 text-lg">Blog Description</label>
                                        <input type="text"
                                            defaultValue={result.description}
                                            {...register('description', { required: true })}
                                            className="input w-full"
                                            placeholder="Enter blog description" />
                                    </div>
                                </div>
                                {
                                    loading ?
                                        <div>
                                            <button
                                                className="btn btn-neutral mt-4 flex items-center gap-3 tracking-widest text-lg">
                                                <span className="animate-spin text-lg">
                                                    <RiLoaderLine /></span>
                                                Updating Blog....
                                            </button>
                                        </div> :
                                        <button type='submit'
                                            className="btn btn-neutral mt-4 tracking-widest text-lg">
                                            Update Blog</button>
                                }

                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateBlogForm;