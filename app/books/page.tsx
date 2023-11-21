'use client';

import React, { useState } from 'react';
import { GET_ALL_BOOKS_NORMAL } from '@/apollo/query/book-query';
import BookCard from '@/components/home/BookCard';
import BookCard2 from '@/components/home/BookCard2';
import BookCard3 from '@/components/home/BookCard3';
import Pagination from '@/components/layouts/Pagination';
import { GET_ALL_GENRES_NORMAL } from '@/apollo/query/genre-query';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';

const Page = () => {
    const [sortBy, setSortBy] = useState(1);
    const [gId, setGId] = useState('all');

    const { data: genreData } = useSuspenseQuery(GET_ALL_GENRES_NORMAL, {
        variables: {
            queryString: {
                limit: null,
            },
        },
    });

    const { data: bookData, refetch: refetchBooks } = useSuspenseQuery(
        GET_ALL_BOOKS_NORMAL,
        {
            variables: {
                queryString: {
                    page: '1',
                    limit: '10',
                    sort: 'title',
                    fields: '_id,title,mainImage,status,readCount,slug -addedBy -categories',
                },
            },
        }
    );

    const onSelectChangeHandler = (e: any) => {
        const value = e.target.value;

        setSortBy(value);

        refetchBooks({
            queryString: {
                limit: null,
                sort:
                    value == 1
                        ? 'title'
                        : value == 2
                        ? '-title'
                        : value == 3
                        ? '-createdBy'
                        : '-readCount',
                fields: '_id,title,mainImage,status,readCount,slug -addedBy -categories',
            },
        });
    };

    const onGenreChangeHandler = (genreId: string) => {
        setGId(genreId);

        if (genreId === 'all') {
            refetchBooks({
                queryString: {
                    limit: null,
                    sort: 'title',
                    fields: '_id,title,mainImage,status,readCount,slug -addedBy -categories',
                },
            });

            return;
        }

        refetchBooks({
            queryString: {
                limit: null,
                filter: [`genres/in/${genreId}`],
                sort:
                    sortBy == 1
                        ? 'title'
                        : sortBy == 2
                        ? '-title'
                        : sortBy == 3
                        ? '-createdBy'
                        : '-readCount',
                fields: '_id,title,mainImage,status,readCount,slug -addedBy -categories',
            },
        });
    };

    return (
        <div className="my-10 text-white mb-28">
            <div className="flex mt-4 justify-between items-center">
                <div className="border-l-4 pl-4 border-l-primary">
                    <h4 className="font-semibold uppercase text-2xl">Genres</h4>
                </div>
            </div>
            <div className="flex items-center flex-wrap mt-6">
                {[
                    { _id: 'all', name: 'All', bookCount: 'N/A' },
                    /* @ts-ignore */
                    ...genreData.getAllGenres.genres,
                ].map((genre: any) => (
                    <div
                        onClick={() => onGenreChangeHandler(genre._id)}
                        key={genre._id}
                        className={`${
                            gId == genre._id
                                ? 'bg-my-gray'
                                : 'bg-secondary-light'
                        } cursor-pointer text-sm px-4 py-[0.4rem] mr-4 mb-4 font-thin flex items-center justify-center rounded-md`}
                    >
                        {genre.name}{' '}
                        {/* <p className="text-gray-400 ml-1">
                            ({genre.bookCount})
                        </p> */}
                    </div>
                ))}
            </div>
            <div className="flex flex-col md:flex-row text-white mt-10 mb-10">
                <div className="md:basis-2/3 md:mr-4 basis-full ">
                    <div className="flex justify-between items-center">
                        <div className="border-l-4 pl-4 border-l-primary">
                            <h4 className="font-semibold uppercase text-md md:text-2xl">
                                All Books
                            </h4>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="md:text-sm hidden md:block text-xs tracking-wider mr-4">
                                Order By:
                            </p>
                            <select
                                data-te-select-init
                                onChange={onSelectChangeHandler}
                                className="bg-secondary-light px-2 py-1 w-36 text-white rounded-sm"
                            >
                                <option
                                    selected={sortBy == 1 ? true : false}
                                    value={1}
                                >
                                    A - Z
                                </option>
                                <option
                                    selected={sortBy == 2 ? true : false}
                                    value={2}
                                >
                                    Z - A
                                </option>
                                <option
                                    selected={sortBy == 3 ? true : false}
                                    value={3}
                                >
                                    Added Date
                                </option>
                                <option
                                    selected={sortBy == 4 ? true : false}
                                    value={4}
                                >
                                    Most Popular
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 md:gap-6 mt-6">
                        {/*  @ts-ignore */}
                        {bookData.getAllBooks.books.map((book: any) => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>

                    <Pagination
                        sort={
                            sortBy == 1
                                ? 'title'
                                : sortBy == 2
                                ? '-title'
                                : sortBy == 3
                                ? '-createdBy'
                                : '-readCount'
                        }
                        refetch={refetchBooks}
                        fields="_id,title,mainImage,status,readCount,slug -addedBy -categories"
                        //   @ts-ignore
                        pagination={bookData?.getAllBooks.pagination}
                    />
                </div>
                <div className="md:basis-1/3 md:ml-4 basis-full flex flex-col justify-start ">
                    <div className="flex justify-between items-center">
                        <div className="border-l-4 pl-4 border-l-primary">
                            <h4 className="font-semibold uppercase md:text-lg">
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
                        {/*  @ts-ignore */}
                        {bookData.getAllBooks.books.map((book: any) => (
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
                        {/*  @ts-ignore */}
                        {bookData.getAllBooks.books.map((book: any) => (
                            <BookCard3 key={book.id} book={book} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
