'use client'
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { RiLoaderLine } from 'react-icons/ri';
import { Box, Button, Rating, TextField } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios';
import toast from 'react-hot-toast';
import AxiosPublic from '@/app/useAxiosHook/AxiosPublic';

const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};
function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}
const AddComment = ({ singleService, refetch }) => {
    console.log(singleService);
    const { data: session } = useSession()
    console.log(session);
    const [loading, setLoading] = useState(false)
    const [value, setValue] = React.useState(2);
    const [hover, setHover] = React.useState(-1);
    const useAxios = AxiosPublic()
    console.log(value);

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm()
    const onSubmit = async (formData) => {
        toast.success('Your Comment Adding...')
        setLoading(true)
        console.log('data', formData)
        try {
            const blog = {
                authorEmail: session?.user.name,
                authorName: session?.user.name,
                description: formData.comment,
                postId: singleService._id,
                feedBack: value,
                like: 0
            }
            const { data } = await useAxios.post('/api/addComment', blog)
            console.log('add blog', data);
            if (data.insertedId) {
                toast.success('comment Added Successful')
                setLoading(false)
                refetch()
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* row 2 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-3">
                        {/*Add star */}
                        <div className='flex items-center gap-4 '>
                            <div className=''>
                                <Box sx={{ width: 200, display: 'flex', alignItems: 'center' }}>
                                    <Rating
                                        name="hover-feedback"
                                        value={value}
                                        precision={0.5}
                                        getLabelText={getLabelText}
                                        onChange={(event, newValue) => {
                                            setValue(newValue);
                                        }}
                                        onChangeActive={(event, newHover) => {
                                            setHover(newHover);
                                        }}
                                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                    />
                                    {value !== null && (
                                        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                                    )}
                                </Box>
                            </div>
                            {/*Main Content*/}
                            <div>
                                <TextField
                                    {...register('comment', { required: true })}
                                    id="outlined-textarea"
                                    label="Enter your comment"
                                    placeholder="Placeholder"
                                    multiline
                                />
                            </div>
                            <div>
                                {
                                    loading ?
                                        <div>
                                            <Button
                                                className="btn btn-neutral flex items-center gap-3 tracking-widest text-lg">
                                                <span className="animate-spin text-lg">
                                                    <RiLoaderLine /></span>
                                                Adding Comment....
                                            </Button>
                                        </div> :
                                        <Button
                                            variant="contained"
                                            disableElevation
                                            type='submit'
                                            className="btn btn-neutral tracking-widest text-lg">
                                            Add Comment
                                        </Button>
                                }
                            </div>
                        </div>
                    </div>
                </form>
            </div >
        </div >
    );
};

export default AddComment;