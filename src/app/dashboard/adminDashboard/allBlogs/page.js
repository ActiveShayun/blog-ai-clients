"use server"
import dbConnect, { collectionNameObj } from '@/lib/dbConect';
import Image from 'next/image';
import React from 'react';
import BlogTable from './components/BlogTable';

const AllBlogs = async () => {
    const blogsCollection = await dbConnect(collectionNameObj.blogsCollection)
    const result = await blogsCollection.find({}).toArray()
    console.log(result);
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Author Name</th>
                            <th>Blogs Image</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            result.map((blog, idx) => {
                                return (
                                    <BlogTable
                                        key={blog._id}
                                        blog={blog}
                                        idx={idx} />
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllBlogs;