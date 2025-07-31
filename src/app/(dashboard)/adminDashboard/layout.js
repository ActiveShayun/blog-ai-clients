import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
import NavLink from './navLink/NavLink';

const AdminDashboardLayout = async ({ children }) => {
    const session = await getServerSession(authOptions)

    console.log('session', session);

    if (!session) {
        redirect('/pages/userAuthentication/loginForm');
    }

    if (session.user.role !== 'Admin') {
        redirect('/access-denied');
    }
    const routes = <>
        <NavLink href={'/adminDashboard/addBlogForm'}>Admin Add blogs</NavLink>
        <NavLink href={'/adminDashboard/allBlogs'}> All blogs</NavLink>
        <NavLink href={'/adminDashboard/users'}>Users</NavLink>
    </>
    return (
        <div className=''>
            <div className='grid grid-cols-12 gap-4'>
                {/* route */}
                <div className='col-span-3 rounded-xl'>
                    <div className='flex flex-col gap-4 font-medium'>
                        {routes}
                    </div>
                </div>
                {/* layout */}
                <div className='col-span-9 rounded-xl'>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardLayout;