import React from 'react';
import { BsArrowRight } from '@react-icons/all-files/bs/BsArrowRight';
import { GET_HISTORY } from '@/apollo/query/user-query';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Image from 'next/image';
import { AiFillCaretLeft } from '@react-icons/all-files/ai/AiFillCaretLeft';
import Link from 'next/link';
import { AiOutlineEye } from '@react-icons/all-files/ai/AiOutlineEye';

const getHistory = async (_id: string) => {
    const resp = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: GET_HISTORY(_id) }),
        // cache: 'no-cache',
        next: {
            tags: ['get-history'],
        },
    });

    const { data } = await resp.json();

    return data.getHistory;
};

const HistoryPage = async () => {
    const session = await getServerSession(authOptions);

    const { chapters, books } = await getHistory(
        // @ts-ignore
        session?.user?._id
    );

    return (
        <div className=" mt-8 text-[15px] mb-32 text-white">
            <div className="flex mt-16">
                <div className="basis-4/5">
                    <div className="flex justify-between mb-5 items-center">
                        <div className="border-l-4 pl-4 border-l-primary">
                            <h4 className="font-semibold uppercase text-2xl">
                                Your History
                            </h4>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="uppercase text-sm tracking-wider mr-2">
                                Go to All Books
                            </p>
                            <BsArrowRight />
                        </div>
                    </div>
                    <div className=" grid grid-cols-4 gap-x-6 gap-y-12 ">
                        {[...books, ...books, ...books, ...books].map(
                            (book: any) => (
                                <Link href={`/books/${book.slug}`}>
                                    <div className="relative text-xs rounded-[5px] h-[280px] ">
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
                                    </div>
                                    <h3 className="text-white mt-3 text-lg">
                                        {book.title}
                                    </h3>
                                    <div className="flex items-center justify-between my-3">
                                        <div className="text-gray-400 text-sm">
                                            Last Read :
                                        </div>
                                        <div className=" text-white font-extrabold text-center">
                                            {
                                                chapters
                                                    .filter(
                                                        (ch: any) =>
                                                            ch.book._id ==
                                                            book._id
                                                    )
                                                    .pop().name
                                            }
                                        </div>
                                    </div>

                                    <div className="bg-premium-black text-center hover:bg-primary transition-colors duration-200 ease-linear mt-2 py-2 px-4 rounded-sm">
                                        Read Book
                                    </div>
                                </Link>
                            )
                        )}
                    </div>
                </div>
                <div className="ml-4 basis-1/5 ">
                    <div className="border-l-4 pl-4 border-l-primary">
                        <h4 className="font-semibold uppercase text-lg mb-5">
                            Recent Chapters
                        </h4>
                    </div>
                    <div>
                        {[...chapters, ...chapters]
                            .reverse()
                            .slice(0, 10)
                            .map((chapter: any) => (
                                <div className=" bg-premium-black p-2 rounded-sm shadow-sm mb-4">
                                    <div className="font-extrabold">
                                        {chapter.name}
                                    </div>
                                    <div className="font-thin text-gray-400 text-sm tracking-wider">
                                        {chapter.book.title}
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HistoryPage;
