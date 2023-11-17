import React from 'react';
import { Book } from './BookCard';
import Image from 'next/image';
import { AiOutlineEye } from '@react-icons/all-files/ai/AiOutlineEye';

interface ComProps {
    book: Book;
}

const BookCard3: React.FC<ComProps> = ({ book }) => {
    return (
        <div className="h-[130px] flex items-start mb-5">
            <Image
                alt={book.mainImage}
                width={0}
                height={0}
                sizes="100vw"
                style={{
                    width: '90px',
                    height: '130px',
                    borderRadius: '4px',
                    objectFit: 'cover',
                }} // optional
                src={book.mainImage}
            />
            <div className="px-3">
                <div className="flex items-center flex-wrap">
                    {book.genres.map((g) => (
                        <div
                            // @ts-ignore
                            key={g.name}
                            className="bg-secondary-light mt-1 mr-2 text-[0.65rem] py-1 px-2 rounded-full"
                        >
                            {/* @ts-ignore */}
                            {g.name}
                        </div>
                    ))}
                </div>
                <h3 className="text-white mt-3 text-lg">{book.title}</h3>
                <div className="flex justify-start mt-3 items-center text-gray-400">
                    <AiOutlineEye className="text-lg mr-1" />
                    <span className="text-xs">{book.readCount} Views</span>
                </div>
            </div>
        </div>
    );
};

export default BookCard3;
