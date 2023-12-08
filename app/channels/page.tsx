import Image from 'next/image';
import React from 'react';
import { BsArrowRight } from '@react-icons/all-files/bs/BsArrowRight';
import {
    GET_ALL_BOOKS,
    GET_ALL_BOOKS_BY_USER,
} from '@/apollo/query/book-query';
import BookCard from '@/components/home/BookCard';
import BookCard2 from '@/components/home/BookCard2';
import BookCard3 from '@/components/home/BookCard3';
import Link from 'next/link';
import { getUri } from '@/utils/getApiUrl';
import { GET_ALL_MODERATORS } from '@/apollo/query/user-query';

const getBooks = async () => {
    const resp = await fetch(getUri(), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: GET_ALL_BOOKS }),
        cache: 'no-cache',
        next: {
            tags: ['books'],
        },
    });

    const { data } = await resp.json();

    return data.getAllBooks;
};

const getBooksByChannel = async (userId: string) => {
    console.log(userId, 'xxxx');
    const resp = await fetch(getUri(), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: GET_ALL_BOOKS_BY_USER(userId) }),
        cache: 'no-cache',
        next: {
            tags: ['books-by-user'],
        },
    });

    const { data } = await resp.json();

    return data.getAllBooksByUser;
};

const getChannels = async () => {
    const resp = await fetch(getUri(), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: GET_ALL_MODERATORS }),
        cache: 'no-cache',
        next: {
            tags: ['get-channels'],
        },
    });

    const { data } = await resp.json();

    return data.getAllModerators;
};

const page = async () => {
    const fetchedBooks = await getBooks();
    const combinedBooks = [...fetchedBooks.books];
    const { users: channels } = await getChannels();

    const mainObj = {};

    for (const channel of channels) {
        const result = await getBooksByChannel(channel._id);

        // @ts-ignore
        // TODO: TS satisfication
        mainObj[channel._id] = result?.books;
    }

    return (
        <div className="my-10 text-white mb-28">
            <div className="flex justify-between mt-4 items-center">
                <div className="border-l-4 pl-4 border-l-primary animate__animated animate__slideInDown">
                    <h4 className="font-semibold uppercase md:text-2xl">
                        Our Channels
                    </h4>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 mt-6 md:gap-4 animate__animated animate__zoomIn">
                {channels.map((channel: any) => (
                    <Link key={channel._id} href={`channels/${channel.slug}`}>
                        <div
                            key={channel._id}
                            style={{
                                height: '190px',
                                borderRadius: '5px',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                backgroundImage: `linear-gradient(to right, rgba(0,0,255,0.1) 0%,rgba(0,0,255,0.1) 50%,rgba(0,0,255,0.1) 100%), url(${channel.image})`,
                            }}
                            className=" mb-5 relative book2"
                        >
                            <div className="flex justify-center okay-narsa bottom-0 w-full items-center">
                                <h3 className="wtf uppercase py-[0.2rem] font-oswald tracking-wider font-bold m-2  text-xl">
                                    {channel.name}
                                </h3>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="flex flex-col md:flex-row text-white items-start mt-10 mb-10">
                <div className="md:basis-2/3 md:mr-4 basis-full">
                    {channels.map((channel: any) => (
                        <>
                            <div className="flex justify-between items-center">
                                <div className="border-l-4 pl-4 border-l-primary animate__animated animate__fadeInRight">
                                    <h4 className="font-semibold uppercase text-md md:text-2xl">
                                        {channel.name}&apos;s books
                                    </h4>
                                </div>
                                <div className="flex justify-between items-center animate__animated animate__fadeInLeft">
                                    <p className="uppercase text-xs md:text-sm tracking-wider mr-2">
                                        <Link href={`channels/${channel.slug}`}>
                                            View All
                                        </Link>
                                    </p>
                                    <BsArrowRight />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 md:gap-6 mt-6 mb-20">
                                {/* @ts-ignore */}
                                {mainObj[channel._id]?.map((book: any) => (
                                    <BookCard key={book.id} book={book} />
                                ))}
                            </div>
                        </>
                    ))}
                </div>
                <div className="md:basis-1/3 md:ml-4 basis-full flex flex-col justify-start ">
                    <div className="flex justify-between items-center">
                        <div className="border-l-4 pl-4 border-l-primary animate__animated animate__fadeInRight">
                            <h4 className="font-semibold uppercase md:text-lg">
                                Top Reads
                            </h4>
                        </div>
                        <div className="flex justify-between items-center animate__animated animate__fadeInLeft">
                            <div className="text-xs font-thin text-gray-400">
                                <span className="mr-2">Day</span>
                                <span className="mr-2">Week</span>
                                <span className="mr-2">Month</span>
                                <span className="mr-2">Year</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6">
                        {combinedBooks.map((book) => (
                            <BookCard2 key={book.id} book={book} />
                        ))}
                    </div>
                    <div className="flex justify-between items-center mt-10">
                        <div className="border-l-4 pl-4 border-l-primary animate__animated animate__fadeInRight">
                            <h4 className="font-semibold uppercase text-lg">
                                New Chapter
                            </h4>
                        </div>
                    </div>
                    <div className="mt-6">
                        {combinedBooks.map((book) => (
                            <BookCard3 key={book.id} book={book} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;
