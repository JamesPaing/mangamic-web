'use client';

import Link from 'next/link';
import React from 'react';
import { AiOutlineArrowUp } from '@react-icons/all-files/ai/AiOutlineArrowUp';

const Footer = () => {
    const onScrollToTopHandler = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="bg-secondary-dark relative pt-[60px] pb-[60px] px-4 grid-cols-1 text-white md:px-36 md:gap-20 grid md:grid-cols-3">
            <div
                onClick={onScrollToTopHandler}
                className="cursor-pointer w-12 h-12 absolute left-[50%] top-[-25px] ml-[-25px] bg-primary flex justify-center items-center rounded-full"
            >
                <AiOutlineArrowUp className="text-xl" />
            </div>
            <div className="text-xl uppercase mb-8 md:mb-0">MANGAMIC</div>
            <div className="flex justify-between text-gray-400 mb-8 md:mb-0">
                <Link href={'/'}>Home</Link>
                <Link href={'/books'}>Books</Link>
                <Link href={'/genres'}>Genres</Link>
                <Link href={'/contact'}>Contacts</Link>
            </div>
            <div className="text-gray-600 text-[15px] ">
                Copyright ©2023 All rights reserved | Developed by{' '}
                <span className="text-blue-600">James Paing Oo</span>
            </div>
        </div>
    );
};

export default Footer;
