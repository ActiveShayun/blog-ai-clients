'use client'
import Loader from '@/app/loading';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import debounce from 'lodash.debounce';
import React, { useMemo, useState } from 'react';
import CardBlog from './CardBlog';
import { TextField } from '@mui/material';
import AxiosPublic from '@/app/useAxiosHook/AxiosPublic';


const AllBlog = () => {
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('')
    const [order, setOrder] = useState('')
    console.log(category, order);
    const useAxios = AxiosPublic()

    const handleSearchChange = useMemo(() =>
        debounce((value) => {
            setSearch(value)
        }, 900)
        , [])


    const { data: blogs = [], isLoading, error, refetch } = useQuery({
        queryKey: ['blogs', search, category, order],
        queryFn: async () => {
            const res = await useAxios.get(`/api/allBlog`, {
                params: { search, category, order }
            })
            console.log('allBlog', res);
            return res.data
        },

    }

    )

    console.log(blogs);
    return (
        <div>
            <h2 className='text-3xl font-bold text-center mt-8'>All Blogs Here</h2>
            <div className='flex justify-between items-end py-8'>
                <div className='w-full'>
                    <TextField
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className='w-2/6'
                        id="standard-multiline-flexible"
                        label="search blog"
                        multiline
                        maxRows={4}
                        variant="standard"
                    />
                </div>
                <div>
                    <select name="" id="" className='px-3 pt-2 border-b'
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Select a value</option>
                        <option value={'javaScript'}>JavaScript</option>
                        <option value={'Nextjs'}>Next.js</option>
                        <option value={'ba'}>Web Dev</option>
                    </select>
                </div>
                <div>
                    <select name="" id="" className='px-3 pt-2 border-b'
                        value={order}
                        onChange={(e) => setOrder(e.target.value)}
                    >
                        <option value="">Ascending || Descending with like </option>
                        <option value={'desc'}>Like to descending</option>
                        <option value={'asc'}>Like to ascending</option>

                    </select>
                </div>
            </div>
            <h2>{blogs.length === 0 ?
                <h2 className='lg:text-3xl text-2xl font-bold text-center text-red-500'>Data Not Fount</h2> :
                ''
            }</h2>
            <div className='grid grid-cols-1 lg:grid-cols-4 gap-4'>
                {
                    isLoading ? <Loader />
                        :
                        blogs?.map(blog => {
                            return <CardBlog key={blog._id} blog={blog} />
                        })
                }
            </div>
        </div>
    );
};

export default AllBlog;