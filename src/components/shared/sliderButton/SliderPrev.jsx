
import { BiArrowToLeft } from 'react-icons/bi';

const SliderPrev = ({ prevRef, isBeginning }) => {
    return (
        <button
            ref={prevRef}
            disabled={isBeginning}
            className={` ${isBeginning ? 'bg-gray-300 cursor-not-allowed pointer-events-none'
                :
                'border text-white'} p-2 hover:bg-gray-800`}>
            <BiArrowToLeft />
        </button>
    );
};

export default SliderPrev;