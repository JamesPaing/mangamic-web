import React from 'react';
import { BsArrowRight } from '@react-icons/all-files/bs/BsArrowRight';
import { GET_BOOKMARK } from '@/apollo/query/user-query';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Image from 'next/image';
import Link from 'next/link';
import { getUri } from '@/utils/getApiUrl';
import { redirect } from 'next/navigation';

const getBookmark = async (_id: string) => {
    const resp = await fetch(getUri(), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: GET_BOOKMARK(_id) }),
        // cache: 'no-cache',
        next: {
            tags: ['get-bookmark'],
        },
    });

    const { data } = await resp.json();

    return data.getBookmark;
};

const BookmarkPage = async () => {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/login');
    }

    const { books } = await getBookmark(
        // @ts-ignore
        session?.user?._id
    );

    if (books.length == 0) {
        return (
            <div className="text-gray-400 text-center">
                <p className="my-2">No recent books yet bookmarked.</p>
                <Link href={'/books'} className="text-primary">
                    Browse books now!
                </Link>
            </div>
        );
    }

    return (
        <div className=" mt-8 text-[15px] mb-32 text-white">
            <div className="flex mt-16">
                <div className="basis-full">
                    <div className="flex justify-between mb-5 items-center">
                        <div className="border-l-4 pl-4 border-l-primary">
                            <h4 className="font-semibold uppercase text-2xl">
                                Bookmark
                            </h4>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="uppercase text-sm tracking-wider mr-2">
                                All Books
                            </p>
                            <BsArrowRight />
                        </div>
                    </div>
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
                                <div className="bg-primary text-center hover:bg-gray-400 transition-colors duration-200 ease-linear mt-2 py-2 px-4 rounded-sm">
                                    Read
                                </div>
                                <div className="bg-premium-black mt-3 text-center hover:bg-black transition-colors duration-200 ease-linear py-2 px-4 rounded-sm">
                                    Remove
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookmarkPage;
