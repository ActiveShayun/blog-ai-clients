'use client'
import React from 'react';
import FirstCol from './components/FirstCol/FirstCol';
import SecondCol from './components/secondCol/SecondCol';
import Card from './components/FirstCol/Card';
import ThirdCol from './components/thirdCol/ThirdCol';

const Banner = () => {
    return (
        <div>
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-2'>
                <section className='col-span-5'>
                    <FirstCol />
                </section>
                <section className='col-span-4'>
                    <SecondCol />
                </section>
                <section className='col-span-3'>
                    <ThirdCol />
                </section>
            </div>
        </div>
    );
};

export default Banner;