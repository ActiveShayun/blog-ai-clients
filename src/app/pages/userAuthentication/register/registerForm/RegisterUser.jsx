'use client'
import AxiosPublic from '@/app/useAxiosHook/useAxiosPublic';
import { Button } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const RegisterUser = () => {
    const useAxios = AxiosPublic()
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm()
    const onSubmit = async (data) => {
        try {
            const user = {
                name: data.name,
                email: data.email,
                password: data.password
            }
            const res = await useAxios.post('/api/action/auth/registerUser', user)
            console.log('registerUser', res);
            if (res.data.insertedId) {
                toast.success('Register successful')
            }

        } catch (error) {
            console.log(error);
        }
    }
    console.log(errors);
    return (
        <div className='mt-8'>
            <h2 className='text-3xl text-center'>Please Register</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='space-y-4 mx-auto max-w-[500px]'>
                    {/* name */}
                    <div>
                        <label htmlFor="" className='block mb-2'>Name</label>
                        <input
                            className='input px-4 py-2 rounded-md w-full'
                            {...register('name', { required: 'Name is required' })}
                            type="text"
                            placeholder='Enter your name' />
                        {
                            errors?.name && <p className='text-red-600'>
                                {errors?.name?.message}</p>
                        }
                    </div>
                    {/* email */}
                    <div>
                        <label htmlFor="" className='block mb-2'>Email</label>
                        <input
                            className='input px-4 py-2 rounded-md w-full'
                            {...register('email', { required: 'Email is required' })}
                            type="email"
                            placeholder='Enter your email' />
                        {
                            errors.email && <p className='text-red-600'>
                                {errors?.email?.message}</p>
                        }
                    </div>
                    {/* Password */}
                    <div>
                        <label htmlFor="" className='block mb-2'>Password</label>
                        <input
                            className='input px-4 py-2 rounded-md w-full'
                            {...register('password', { required: 'Password is required' })}
                            type="password"
                            placeholder='Enter your password' />
                        {
                            errors.password && <p className='text-red-600'>
                                {errors?.password?.message}</p>
                        }
                    </div>
                    <div>
                        <Button
                            className='w-full'
                            type='submit'
                            variant="contained">
                            Register</Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default RegisterUser;