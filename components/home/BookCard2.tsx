import React from 'react';
import Image from 'next/image';
import { AiOutlineEye } from '@react-icons/all-files/ai/AiOutlineEye';

import { Book } from './BookCard';
import Link from 'next/link';

interface ComProps {
    book: Book;
}

const BookCard2: React.FC<ComProps> = ({ book }) => {
    const statusBgColor =
        book.status === 'new'
            ? 'bg-red-600'
            : book.status === 'ongoing'
            ? 'bg-amber-600'
            : 'bg-green-600';

    return (
        <Link href={`/books/${book.slug}`}>
            <div
                style={{
                    height: '190px',
                    borderRadius: '5px',
                    // backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.8)), url(${book.mainImage})`,
                }}
                className=" mb-5 relative book2 animate__animated animate__fadeInDown book-card-2"
            >
                <div className="flex justify-between items-center top-0 absolute w-full text-xs">
                    <div
                        className={`${statusBgColor} shadow-sm  capitalize text-white m-2 w-20 rounded-sm py-[0.2rem] text-center tracking-wide`}
                    >
                        {book.status}
                    </div>
                    <div className="bg-my-gray flex items-center justify-center shadow-sm text-white m-2 w-16 rounded-sm py-[0.2rem] text-center  tracking-wide">
                        <AiOutlineEye className="text-lg mr-1" />
                        {/* @ts-ignore */}
                        <span className="">{book.readCount}</span>
                    </div>
                </div>
                <div className="flex justify-start absolute bottom-0 w-full items-center">
                    <h3 className=" py-[0.2rem] m-2 text-[1.125rem]">
                        {book.title}
                    </h3>
                </div>
            </div>
        </Link>
    );
};

export default BookCard2;
