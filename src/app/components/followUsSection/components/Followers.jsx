'use client'
import React from 'react';
import { FaFacebookSquare, FaInstagram } from 'react-icons/fa';
import { FaSquareXTwitter, FaXTwitter } from 'react-icons/fa6';


const Followers = () => {
    return (
        <div className='px-4'>
            <div className='grid grid-cols-2 gap-4 justify-center mx-auto  mb-4'>
                <button className='flex items-center gap-3 px-16 py-2 bg-[#3059B0]  text-white'
                >
                    <FaFacebookSquare />
                    <span>Facebook</span>
                </button>
                <div className='flex items-center gap-3  px-16 py-2 bg-[#55ACEF]  text-white'
                >
                    <FaSquareXTwitter />
                    <span>Twitter</span>
                </div>
            </div>
            <div className='grid grid-cols-2 gap-4 justify-center mx-auto  mb-4'>
                <div className='flex items-center gap-3 px-16 py-2 bg-[#FC2B35]  text-white'
                >
                    <FaFacebookSquare />
                    <span>Followers</span>
                </div>
                <div className='flex items-center gap-3  px-16 py-2  text-white  '
                >
                   
                    <FaXTwitter />
                    <FaInstagram />
                    <span>Instagram</span>
                </div>
            </div>
        </div>
    );
};

export default Followers;