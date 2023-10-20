// 'use client';

import Slider from '@/components/layouts/Slider';
import React from 'react';
import { BsArrowRight } from '@react-icons/all-files/bs/BsArrowRight';
import BookCard from '@/components/home/BookCard';
import books from '@/utils/dummy-data/books.json';
import BookCard2 from '@/components/home/BookCard2';
import BookCard3 from '@/components/home/BookCard3';
import { GET_ALL_BOOKS } from '@/apollo/query/book-query';
import Image from 'next/image';

const getBooks = async () => {
    const resp = await fetch('http://localhost:4000/graphql', {
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

const Home = async () => {
    const fetchedBooks = await getBooks();
    const combinedBooks = [...fetchedBooks.books, ...books];

    return (
        <>
            <Slider />
            <main className="flex text-white items-start mt-10 mb-28">
                <div className="basis-2/3 mr-4 ">
                    <div className="flex justify-between items-center">
                        <div className="border-l-4 pl-4 border-l-primary">
                            <h4 className="font-semibold uppercase text-2xl">
                                Trending Now
                            </h4>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="uppercase text-sm tracking-wider mr-2">
                                View Allx
                            </p>
                            <BsArrowRight />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-6 mt-6">
                        {combinedBooks.map((book) => (
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
                            <p className="uppercase text-sm tracking-wider mr-2">
                                View All
                            </p>
                            <BsArrowRight />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-6 mt-6">
                        {combinedBooks.map((book) => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                    <div className="flex justify-between items-center mt-16">
                        <div className="border-l-4 pl-4 border-l-primary">
                            <h4 className="font-semibold uppercase text-2xl">
                                Hey Comic&apos;s Choices
                            </h4>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="uppercase text-sm tracking-wider mr-2">
                                View All
                            </p>
                            <BsArrowRight />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-6 mt-6">
                        {combinedBooks.map((book) => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                </div>
                <div className="basis-1/3 ml-4 flex flex-col justify-start ">
                    <div className="flex justify-between items-center">
                        <div className="border-l-4 pl-4 border-l-primary">
                            <h4 className="font-semibold uppercase text-lg">
                                Top Reads
                            </h4>
                        </div>
                        <div className="flex justify-between items-center">
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
                        <div className="border-l-4 pl-4 border-l-primary">
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
            </main>
        </>
    );
};

export default Home;
