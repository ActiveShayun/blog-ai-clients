'use client'

import { RiLoaderLine } from "react-icons/ri";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { Button } from "@mui/material";
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const AddBlogsForm = ({ loading, session, handleSubmit, register, onSubmit, errors, update }) => {
    console.log(update);

    return (
        <div className="hero-content flex-col lg:flex-row-reverse w-full">
            <div className="card bg-base-100 w-full shadow-2xl">
                <div className="card-body w-full ">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <fieldset className="fieldset w-full">
                            <div>
                                <Button
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    startIcon={<CloudUploadIcon />}
                                >
                                    Upload files
                                    <VisuallyHiddenInput
                                        type="file"
                                        {...register('blogBanner', { required: 'image is required' })}
                                        multiple
                                    />
                                    {
                                        errors?.blogBanner && <p>{errors?.message?.blogBanner}</p>
                                    }
                                </Button>
                            </div>
                            {/* row 1 */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-3">
                                {/* Author Email */}
                                <div>
                                    <label className="label mb-2 text-lg">Author Email</label>
                                    <input type="email"
                                        defaultValue={session?.user.email}
                                        {...register("authorEmail", { required: 'email is required' })}
                                        className="input w-full"
                                        placeholder="Email" />
                                    {
                                        errors?.authorEmail && <p>{errors?.message?.authorEmail}</p>
                                    }
                                </div>
                                {/* author name */}
                                <div>
                                    <label className="label mb-2 text-lg">Name</label>
                                    <input type="text"
                                        {...register("authorName", { required: 'name is required' })}
                                        className="input w-full"
                                        placeholder="Enter your name" />
                                    {
                                        errors?.authorName && <p>{errors?.message?.authorName}</p>
                                    }
                                </div>
                            </div>
                            {/* row 2 */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-3">
                                {/*title */}
                                <div>
                                    <label className="label mb-2 text-lg">Title</label>
                                    <input type="text"
                                        {...register('title', { required: 'title is required' })}
                                        className="input w-full"
                                        placeholder="Enter a blog title" />
                                    {
                                        errors?.title && <p>{errors?.message?.title}</p>
                                    }
                                </div>
                                {/*category */}
                                <div>
                                    <label className="label block mb-2 text-lg">Pick a category</label>
                                    <select
                                        {...register('category', { required: 'category is required' })}
                                        defaultValue="Pick a category"
                                        className="select w-full" required>
                                        <option disabled={true}>Pick a category</option>
                                        <option value={'technology'}>Technology</option>
                                        <option value={'programming'}>Programming</option>
                                        <option value={'lifeStyle'}>Life Style</option>
                                        <option value={'sports'}>Sports</option>
                                        <option value={'business'}>Business</option>
                                        <option value={'travel'}>Travel</option>
                                        <option value={'culture'}>Culture</option>
                                    </select>
                                    {
                                        errors?.category && <p>{errors?.message?.category}</p>
                                    }
                                </div>
                            </div>
                            {/* row 3 */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-3">
                                {/*Tags/Keywords*/}
                                <div>
                                    <label className="label mb-2 text-lg">Blog Tags/Keywords</label>
                                    <input type="text"
                                        {...register('tags', { required: 'tags is required' })}
                                        className="input w-full"
                                        placeholder="Enter blog tags/keywords" />
                                    {
                                        errors?.tags && <p>{errors?.message?.tags}</p>
                                    }
                                </div>
                                {/*Main Content*/}
                                <div>
                                    <label className="label mb-2 text-lg">Blog Description</label>
                                    <input type="text"
                                        {...register('description', { required: 'description is required' })}
                                        className="input w-full"
                                        placeholder="Enter blog description" />
                                    {
                                        errors?.description && <p>{errors?.message?.description}</p>
                                    }
                                </div>
                            </div>
                            {
                                loading ?
                                    <div>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            disableElevation
                                            className="btn btn-neutral mt-4 flex items-center gap-3 tracking-widest text-lg">
                                            <span className="animate-spin text-lg">
                                                <RiLoaderLine /></span>
                                            Adding Blog....
                                        </Button>
                                    </div> :
                                    <Button
                                        type='submit'
                                        variant="contained"
                                        disableElevation
                                        className="btn btn-neutral mt-4 tracking-widest text-lg">
                                        Add Blog</Button>
                            }

                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddBlogsForm;