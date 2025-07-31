'use client'
import React from 'react';
import SingleCol from '../singleCol/SingleCol';
import DoubleCol from '../doubleCol/DoubleCol';
import Link from 'next/link';

const Layout = () => {
    return (
        <div className='mt-16'>
            <div className='border-b border-gray-200 mb-8 flex items-center justify-between'>
                <h2 className='text-2xl font-semibold border-b border-red-600 w-[120px]'>Life Style</h2>
                <Link href={'/'}>View All</Link>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                <section>
                    <SingleCol />
                </section>
                <section>
                    <DoubleCol />
                </section>
            </div>

        </div>
    );
};

export default Layout;