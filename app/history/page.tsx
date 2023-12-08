import React from 'react';
import { BsArrowRight } from '@react-icons/all-files/bs/BsArrowRight';
import { GET_HISTORY } from '@/apollo/query/user-query';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Image from 'next/image';
import Link from 'next/link';
import { getUri } from '@/utils/getApiUrl';
import { redirect } from 'next/navigation';

const getHistory = async (_id: string) => {
    const resp = await fetch(getUri(), {
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

    if (!session) {
        redirect('/login');
    }

    const { chapters, books } = await getHistory(
        // @ts-ignore
        session?.user?._id
    );

    if (chapters.length == 0 && books.length == 0) {
        return (
            <div className="text-gray-400 text-center">
                <p className="my-2">No recent books or chapters yet read.</p>
                <Link href={'/books'} className="text-primary">
                    Browse books now!
                </Link>
            </div>
        );
    }

    return (
        <div className=" mt-8 text-[15px] mb-32 text-white">
            <div className="flex md:flex-row flex-col mt-16">
                <div className="basis-full md:basis-4/5">
                    {books.length > 0 ? (
                        <div className="flex justify-between mb-5 items-center">
                            <div className="border-l-4 pl-4 border-l-primary">
                                <h4 className="font-semibold uppercase text-lg md:text-2xl">
                                    Your History
                                </h4>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="uppercase text-sm tracking-wider mr-2">
                                    All Books
                                </p>
                                <BsArrowRight />
                            </div>
                        </div>
                    ) : (
                        <div className="">No recent books yet read.</div>
                    )}
                    <div className=" grid grid-cols-1 md:grid-cols-4 gap-x-6 gap-y-12 ">
                        {books.map((book: any) => (
                            <Link key={book._id} href={`/books/${book.slug}`}>
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
                                                        ch.book._id == book._id
                                                )
                                                .pop()?.name
                                        }
                                    </div>
                                </div>

                                <div className="bg-premium-black text-center hover:bg-primary transition-colors duration-200 ease-linear mt-2 py-2 px-4 rounded-sm">
                                    Continue
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="md:ml-4 basis-full md:basis-1/5 md:mt-0 mt-8">
                    {chapters.length > 0 ? (
                        <div className="border-l-4 pl-4 border-l-primary">
                            <h4 className="font-semibold uppercase text-lg mb-5">
                                Recent Chapters
                            </h4>
                        </div>
                    ) : null}
                    <div>
                        {chapters
                            .reverse()
                            .slice(0, 10)
                            .map((chapter: any) => (
                                <div
                                    key={chapter._id}
                                    className=" bg-premium-black p-2 rounded-sm shadow-sm mb-4"
                                >
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
