'use client'
import { Button } from '@mui/material';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const LoginForm = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm()
    const onSubmit = async (data) => {
        try {
            const res = await signIn('credentials', {
                redirect: false,
                email: data.email,
                password: data.password
            })
            console.log('sign in error', res);
            if (res?.status === 200 && res?.error === null) {
                toast.success('Sign in successful')
            }

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='mt-8'>
            <h2 className='text-3xl text-center'>Please SignIn</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='space-y-4 mx-auto max-w-[500px]'>
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
                            Sign In</Button>
                    </div>
                    <p className='text-center'>
                        Do you have an account
                        <Link className=' ml-3'
                            href={'/pages/userAuthentication/register'}>
                            Signup
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;