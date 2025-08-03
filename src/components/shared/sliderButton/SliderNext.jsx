import { BiArrowToRight } from 'react-icons/bi';

const SliderNext = ({ nextRef, isEnd }) => {
    return (
        <button
            ref={nextRef}
            disabled={isEnd}
            className={` ${isEnd ? 'bg-gray-300 cursor-not-allowed pointer-events-none'
                :
                'border text-white'} p-2`}>
            <BiArrowToRight />
        </button>
    );
};

export default SliderNext;