'use client'
import React from 'react';
import Technology from '../componets/technology/Technology';
import Business from '../componets/business/Business';
import Article from '../componets/smallArtical/Article';

const TechLayout = () => {
    return (
        <div>
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-4 mt-16'>
                <section className='col-span-6'>
                    <Technology />
                </section>
                <section className='col-span-6'>
                    <Business />
                </section>
            </div>
            {/* article section */}
            <Article />
        </div>
    );
};

export default TechLayout;