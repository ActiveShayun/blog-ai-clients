'use client';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    const { status, data: session } = useSession()
    console.log(session?.user.name);
    console.log('status', session);
    const deskTopMenu = <>
        <Link href={'/'}>Home</Link>
        <Link href={'/about'}>About</Link>
        <Link href={'/pages/allBlogPage'}>All Blog</Link>
        {session ?
            <>
                {
                    session?.user?.role === 'Admin' ?
                        <Link href={'/adminDashboard/allBlogs'}>Dashboard</Link>
                        :
                        <Link href={'/userDashboard/myAddedBlogs'}>Dashboard</Link>
                }
            </> :
            <Link className=' mr-3'
                href={'/pages/userAuthentication/loginForm'}>Dashboard</Link>
        }
    </>



    const isUser = <>
        {
            status === 'authenticated' ?
                <>
                    <Link href={'/login'} className='btn mr-3'
                        onClick={() => signOut()}>Log Out</Link>
                </> :
                <>
                    <Link className=' mr-3'
                        href={'/pages/userAuthentication/loginForm'}>Dashboard</Link>
                </>
        }
    </>
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {deskTopMenu}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">Think</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 flex items-center gap-4">
                    {deskTopMenu}
                </ul>
            </div>
            <div className="navbar-end">
                {isUser}
                <a className="btn">Button</a>
            </div>
        </div>
    );
};

export default Navbar;