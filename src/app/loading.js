import React from 'react';
import { ImSpinner9 } from "react-icons/im";
const Loader = () => {
    return (
        <div className=' mx-auto flex justify-center 
        absolute right-[50%] top-[30%]'>
            <ImSpinner9
             className='text-green-500  
              text-5xl text-center animate-spin' />
        </div>
    );
};

export default Loader;