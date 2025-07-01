'use client'
import Loader from '@/app/loading';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import debounce from 'lodash.debounce';
import React, { useMemo, useState } from 'react';
import CardBlog from './CardBlog';


const AllBlog = () => {
    const [search, setSearch] = useState('')

    const handleSearchChange = useMemo(() =>
        debounce((value) => {
            setSearch(value)
        }, 1000)
        , [])


    const { data: blogs = [], isLoading, error, refetch } = useQuery({
        queryKey: ['blogs', search],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:3000/api/allBlog?search=${search}`)
            console.log('allBlog', res);
            return res.data
        }
    })
    console.log(blogs);
    return (
        <div>
            <input type="text"
                className='border'
                onChange={(e) => handleSearchChange(e.target.value)}
            />

            <div>
                {
                    isLoading ? <Loader /> :
                        blogs?.map(blog => {
                            return <CardBlog key={blog._id} blog={blog} />
                        })
                }
            </div>
        </div>
    );
};

export default AllBlog;