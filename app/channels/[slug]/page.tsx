'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import img1 from '@/public/images/categories/image-1.jpeg';
import { BsArrowRight } from '@react-icons/all-files/bs/BsArrowRight';
import {
    GET_ALL_BOOKS,
    GET_ALL_BOOKS_BY_CATEGORY_SLUG,
    GET_ALL_BOOKS_BY_CATEGORY_SLUG_NORMAL,
    GET_ALL_BOOKS_BY_USER_SLUG_NORMAL,
} from '@/apollo/query/book-query';
import books from '@/utils/dummy-data/books.json';
import BookCard from '@/components/home/BookCard';
import BookCard2 from '@/components/home/BookCard2';
import BookCard3 from '@/components/home/BookCard3';
import Pagination from '@/components/layouts/Pagination';
import { GET_ALL_CATEGORIES } from '@/apollo/query/category-query';
import { GET_ALL_GENRES } from '@/apollo/query/genre-query';
import { AiFillCaretLeft } from '@react-icons/all-files/ai/AiFillCaretLeft';
import { AiFillCaretRight } from '@react-icons/all-files/ai/AiFillCaretRight';
import { AiFillHome } from '@react-icons/all-files/ai/AiFillHome';
import { MdArrowForward } from '@react-icons/all-files/md/MdArrowForward';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';

interface ComProps {
    params: { slug: string };
}

const Page: React.FC<ComProps> = ({ params }) => {
    const [sortBy, setSortBy] = useState(1);
    // const { books } = await getBooksByCategorySlug(params.slug);

    const {
        data: bookData,
        refetch: refetchBooks,
        error,
    } = useSuspenseQuery(GET_ALL_BOOKS_BY_USER_SLUG_NORMAL, {
        variables: {
            queryString: {
                page: '1',
                limit: '10',
                sort: 'title',
                fields: '_id,title,mainImage,status,readCount,slug -addedBy -categories',
            },
            userSlug: params.slug,
        },
    });

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

    return (
        <div className="my-10 text-white mb-28">
            <div className="flex items-center">
                <div className="flex items-center mr-1 text-white">
                    <AiFillHome className="mr-1 text-primary" />
                    <span className="mr-1">Home</span>
                    <MdArrowForward />
                </div>
                <div className="flex items-center mr-1 text-white">
                    <span className="mr-1">Channels</span>
                    <MdArrowForward />
                </div>
                <div className="flex items-center text-gray-400">
                    <span className="mr-1 capitalize">
                        {params.slug.split('-').join(' ')}
                    </span>
                </div>
            </div>
            <div className="flex flex-col md:flex-row text-white items-start mt-10 mb-10">
                <div className="md:basis-2/3 md:mr-4 basis-full">
                    <div className="flex justify-between items-center">
                        <div className="border-l-4 pl-4 border-l-primary">
                            <h4 className="font-semibold uppercase text-md md:text-2xl">
                                {params.slug.split('-').join(' ')}
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
                        {/* @ts-ignore */}
                        {bookData?.getAllBooksByUserSlug?.books.map(
                            (book: any) => (
                                <BookCard key={book.id} book={book} />
                            )
                        )}
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
                        pagination={
                            //   @ts-ignore
                            bookData?.getAllBooksByUserSlug.pagination
                        }
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
                        {/* @ts-ignore */}
                        {bookData?.getAllBooksByUserSlug?.books.map(
                            (book: any) => (
                                <BookCard2 key={book.id} book={book} />
                            )
                        )}
                    </div>
                    <div className="flex justify-between items-center mt-10">
                        <div className="border-l-4 pl-4 border-l-primary">
                            <h4 className="font-semibold uppercase text-lg">
                                New Chapter
                            </h4>
                        </div>
                    </div>
                    <div className="mt-6">
                        {/* @ts-ignore */}
                        {bookData?.getAllBooksByUserSlug?.books.map(
                            (book: any) => (
                                <BookCard3 key={book.id} book={book} />
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
