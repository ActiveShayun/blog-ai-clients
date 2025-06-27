import Link from 'next/link';
import React from 'react';

const Layout = ({ children }) => {
    const routes = <>
        <Link href={'/dashboard/'}>
        Dashboard Home</Link>
        <Link href={'/dashboard/adminDashboard/updateBlog'}>
        Update Blog</Link>
        <Link href={'/dashboard/adminDashboard/addBlogForm'}>
        Admin Add blogs</Link>
        <Link href={'/dashboard/adminDashboard/allBlogs'}>
        All blogs</Link>

    </>
    return (
        <div className=''>
            <div className='grid grid-cols-12 gap-4'>
                {/* route */}
                <div className='col-span-3 border rounded-xl'>
                    <div className='flex flex-col'>
                        {routes}
                    </div>
                </div>
                {/* layout */}
                <div className='col-span-9 border rounded-xl'>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;