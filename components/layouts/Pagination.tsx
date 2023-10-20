import React from 'react';
import { AiOutlineArrowRight } from '@react-icons/all-files/ai/AiOutlineArrowRight';

const Pagination = () => {
    return (
        <div className="flex items-center">
            <div className="h-[50px] mr-2 border w-[50px] text-[15px] rounded-full flex items-center justify-center">
                1
            </div>
            <div className="h-[50px] mr-2 w-[50px] text-[15px] rounded-full flex items-center justify-center">
                2
            </div>
            <div className="h-[50px] mr-2 w-[50px] text-[15px] rounded-full flex items-center justify-center">
                3
            </div>
            <div className="h-[50px] mr-2 w-[50px] text-[15px] rounded-full flex items-center justify-center">
                4
            </div>
            <div className="h-[50px] mr-2 w-[50px] text-[15px] rounded-full flex items-center justify-center">
                5
            </div>
            <div className="h-[50px] mr-2 w-[50px] text-[15px] rounded-full flex items-center justify-center">
                <AiOutlineArrowRight />
            </div>
        </div>
    );
};

export default Pagination;
