import React from 'react';
import { AiOutlineEye } from '@react-icons/all-files/ai/AiOutlineEye';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export interface Book {
    _id: string;
    title: string;
    mainImage: string;
    id: string;
    status: string;
    summary: string;
    readCount?: number;
    genres: [];
    chapters: [];
    slug: string;
}

interface CompProps {
    book: Book;
}

const BookCard: React.FC<CompProps> = ({ book }) => {
    const statusBgColor =
        book.status === 'new'
            ? 'bg-red-600'
            : book.status === 'ongoing'
            ? 'bg-amber-600'
            : 'bg-green-600';

    return (
        <Link
            className="animate__animated animate__fadeInUp"
            href={`/books/${book.slug}`}
        >
            <div className="relative text-xs rounded-[5px] h-[310px]">
                <Image
                    alt={book.mainImage}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '4px',
                        objectFit: 'cover',
                    }} // optional
                    src={book.mainImage}
                />
                <div className="flex justify-between items-center top-0 absolute w-full ">
                    <div
                        className={`${statusBgColor} shadow-sm flex items-center justify-center capitalize text-white m-2 w-20 rounded-sm py-[0.3rem] text-center tracking-wide`}
                    >
                        {book.status}
                    </div>
                    <div className="bg-my-gray flex items-center justify-center shadow-sm text-white m-2 w-16 rounded-sm py-[0.2rem] text-center  tracking-wide">
                        <AiOutlineEye className="text-lg mr-1" />
                        <span className="">{book.readCount || 0}</span>
                    </div>
                </div>
                <div className="flex  justify-start absolute bottom-0 w-full items-center shadow-sm">
                    {book.chapters?.length > 0 ? (
                        <div className="text-white m-2 w-28 rounded-sm py-[0.2rem] text-center  tracking-wide">
                            {book.chapters.slice(-2).map((c: any) => (
                                <div
                                    key={c._id}
                                    className="bg-my-gray last:mb-0 mb-2 py-[0.3rem] shadow-sm  rounded-sm text-[12px]"
                                >
                                    {c.name}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-white m-2 w-28 rounded-sm py-[0.2rem] text-center  tracking-wide">
                            <div className="bg-my-gray mb-2 py-[0.3rem] shadow-sm  rounded-sm text-[12px]">
                                Chapter - N/A
                            </div>
                            <div className="bg-my-gray py-[0.3rem] shadow-sm  rounded-sm text-[12px]">
                                Chapter - N/A
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="mt-5 flex items-center flex-wrap">
                {book.genres?.length > 0 ? (
                    book.genres.map((g: any) => (
                        <div
                            key={g._id}
                            className="bg-secondary-light mt-1  mr-2 text-[0.65rem] py-1 px-2 rounded-full"
                        >
                            {g.name}
                        </div>
                    ))
                ) : (
                    <div className="bg-secondary-light text-[0.65rem] py-1 px-2 rounded-full">
                        Action
                    </div>
                )}
            </div>
            <h3 className="text-white mt-3 text-lg mb-3 md:mb-0">
                {book.title}
            </h3>
        </Link>
    );
};

export default BookCard;
