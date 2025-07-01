'use client'

import addBlogs from "@/app/apies/addBlog";
import { uploadImage } from "@/app/utility/utility";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { RiLoaderLine } from "react-icons/ri";

const AddBlogsForm = () => {
    const { data: session } = useSession()
    console.log('user', session?.user.name);
    const [loading, setLoading] = useState(false)

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm()
    const onSubmit = async (data) => {
        toast.success('Blog Adding...')
        setLoading(true)
        console.log('data', data)
        const tagsArray = data.tags.split(',').map(tag => tag.trim())
        console.log(tagsArray);
        const image = await uploadImage(data.blogBanner[0])
        console.log(image);
        try {
            const blog = {
                blogBanner: image,
                authorEmail: session?.user.name,
                authorName: data.authorName,
                title: data.title,
                category: data.category,
                tags: tagsArray,
                description: data.description,
                like: 0
            }
            const res = await addBlogs(blog)
            console.log('add blog', res);
            if (res.insertedId) {
                toast.success('Blog Added Successful')
                setLoading(false)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
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
                                        {...register('title', { required: true })}
                                        className="input w-full"
                                        placeholder="Enter a blog title" />
                                </div>
                                {/*category */}
                                <div>
                                    <label className="label block mb-2 text-lg">Pick a category</label>
                                    <select
                                        {...register('category', { required: true })}
                                        defaultValue="Pick a category"
                                        className="select w-full">
                                        <option disabled={true}>Pick a category</option>
                                        <option value={'javaScript'}>JavaScript</option>
                                        <option value={'Nextjs'}>Next.js</option>
                                        <option value={'WebDev'}>Web Dev</option>
                                    </select>
                                </div>
                            </div>
                            {/* row 3 */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-3">
                                {/*Tags/Keywords*/}
                                <div>
                                    <label className="label mb-2 text-lg">Blog Tags/Keywords</label>
                                    <input type="text"
                                        {...register('tags', { required: true })}
                                        className="input w-full"
                                        placeholder="Enter blog tags/keywords" />
                                </div>
                                {/*Main Content*/}
                                <div>
                                    <label className="label mb-2 text-lg">Blog Description</label>
                                    <input type="text"
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
                                            Adding Blog....
                                        </button>
                                    </div> :
                                    <button type='submit'
                                        className="btn btn-neutral mt-4 tracking-widest text-lg">
                                        Add Blog</button>
                            }

                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddBlogsForm;