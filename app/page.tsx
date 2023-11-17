// 'use client';

import Slider from '@/components/layouts/Slider';
import React from 'react';
import { BsArrowRight } from '@react-icons/all-files/bs/BsArrowRight';
import BookCard from '@/components/home/BookCard';
import books from '@/utils/dummy-data/books.json';
import BookCard2 from '@/components/home/BookCard2';
import BookCard3 from '@/components/home/BookCard3';
import {
    GET_ALL_BOOKS,
    GET_NEW_CHAPTER_BOOKS,
    GET_TRENDING_BOOKS,
} from '@/apollo/query/book-query';
import Image from 'next/image';
import Link from 'next/link';
import { getClient } from '@/apollo/client';
import { GET_SETTING } from '@/apollo/query/setting-query';
import { getUri } from '@/utils/getApiUrl';

const getBooks = async () => {
    try {
        const resp = await fetch('https://api.mangamic.cc/graphql', {
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

        const respx = await resp.json();

        throw new Error(JSON.stringify(respx));

        const { data } = await resp.json();

        return data.getAllBooks;
    } catch (error) {
        // @ts-ignore
        throw new Error(error.message);
    }
};

const getNewChapterBooks = async () => {
    try {
        const resp = await fetch('https://api.mangamic.cc/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: GET_NEW_CHAPTER_BOOKS }),
            cache: 'no-cache',
            next: {
                tags: ['new-chapter-books'],
            },
        });

        const { data } = await resp.json();

        return data.getNewChapterBooks;
    } catch (error) {
        // @ts-ignore
        throw new Error(error.message);
    }
};

const getTrendingBooks = async () => {
    try {
        const resp = await fetch('https://api.mangamic.cc/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: GET_TRENDING_BOOKS }),
            cache: 'no-cache',
            next: {
                tags: ['trending-books'],
            },
        });

        const { data } = await resp.json();

        return data.getAllBooks;
    } catch (error) {
        // @ts-ignore
        throw new Error(error.message);
    }
};

const Home = async () => {
    const fetchedBooks = await getBooks();
    const combinedBooks = [...fetchedBooks.books];
    const { books: trendingBooks } = await getTrendingBooks();
    const { books: newChapterBooks } = await getNewChapterBooks();

    const { data } = await getClient().query({ query: GET_SETTING });
    const { choices } = data.getSetting;

    return (
        <>
            <Slider />
            <main className="flex flex-col md:flex-row text-white items-start mt-10 mb-28">
                <div className="md:basis-2/3 md:mr-4 basis-full">
                    <div className="flex justify-between items-center">
                        <div className="border-l-4 pl-4 border-l-primary">
                            <h4 className="font-semibold uppercase md:text-2xl">
                                Trending Now
                            </h4>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="uppercase text-xs md:text-sm tracking-wider mr-2">
                                <Link href={'/books'}>View All</Link>
                            </p>
                            <BsArrowRight />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 md:gap-6 mt-6">
                        {trendingBooks.map((book: any) => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                    <div className="flex justify-between items-center mt-16">
                        <div className="border-l-4 pl-4 border-l-primary">
                            <h4 className="font-semibold uppercase text-2xl">
                                Recently Added
                            </h4>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="uppercase text-xs md:text-sm tracking-wider mr-2">
                                <Link href={'/books'}>View All</Link>
                            </p>
                            <BsArrowRight />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 md:gap-6 mt-6">
                        {combinedBooks.map((book) => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                    <div className="flex justify-between items-center mt-16">
                        <div className="border-l-4 pl-4 border-l-primary">
                            <h4 className="font-semibold uppercase text-2xl">
                                Mangamic&apos;s Choices
                            </h4>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="uppercase text-xs md:text-sm tracking-wider mr-2">
                                <Link href={'/books'}>View All</Link>
                            </p>
                            <BsArrowRight />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 md:gap-6 mt-6">
                        {choices.map((book: any) => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                </div>
                <div className="basis-full md:basis-1/3 md:ml-4 flex flex-col justify-start ">
                    <div className="flex justify-between items-center">
                        <div className="border-l-4 pl-4 border-l-primary">
                            <h4 className="font-semibold uppercase text-lg">
                                Top Reads
                            </h4>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="text-xs font-thin text-gray-400">
                                <span className="mr-2 cursor-pointer">Day</span>
                                <span className="mr-2 cursor-pointer">
                                    Week
                                </span>
                                <span className="mr-2 cursor-pointer">
                                    Month
                                </span>
                                <span className="mr-2 cursor-pointer">
                                    Year
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6">
                        {trendingBooks.map((book: any) => (
                            <BookCard2 key={book.id} book={book} />
                        ))}
                    </div>
                    <div className="flex justify-between items-center mt-10">
                        <div className="border-l-4 pl-4 border-l-primary">
                            <h4 className="font-semibold uppercase text-lg">
                                New Chapter
                            </h4>
                        </div>
                    </div>
                    <div className="mt-6">
                        {newChapterBooks.map((book: any) => (
                            <BookCard3 key={book.id} book={book} />
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
};

export default Home;
