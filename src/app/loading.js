import React from 'react';
import { FiLoader } from "react-icons/fi";
const Loader = () => {
    return (
        <div className=' mx-auto flex justify-center 
        absolute right-[50%] top-[30%]'>
            <FiLoader
             className='text-green-500  
              text-5xl text-center animate-spin' />
        </div>
    );
};

export default Loader;