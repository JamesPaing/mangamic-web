import Image from 'next/image';
import React from 'react';
import img1 from '@/public/images/categories/image-1.jpeg';
import { BsArrowRight } from '@react-icons/all-files/bs/BsArrowRight';
import {
    GET_ALL_BOOKS,
    GET_ALL_BOOKS_BY_CATEGORY,
} from '@/apollo/query/book-query';
import books from '@/utils/dummy-data/books.json';
import BookCard from '@/components/home/BookCard';
import BookCard2 from '@/components/home/BookCard2';
import BookCard3 from '@/components/home/BookCard3';
import Pagination from '@/components/layouts/Pagination';
import { GET_ALL_CATEGORIES } from '@/apollo/query/category-query';
import Link from 'next/link';
import { getUri } from '@/utils/getApiUrl';

const getBooks = async () => {
    const resp = await fetch(getUri(), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: GET_ALL_BOOKS }),
        // cache: 'no-cache',
        next: {
            tags: ['books'],
        },
    });

    const { data } = await resp.json();

    return data.getAllBooks;
};

const getBooksByCategory = async (categoryId: string) => {
    const resp = await fetch(getUri(), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: GET_ALL_BOOKS_BY_CATEGORY(categoryId) }),
        cache: 'no-cache',
        next: {
            tags: ['books-by-category'],
        },
    });

    const { data } = await resp.json();

    return data.getAllBooksByCategory;
};

const getCategories = async () => {
    const resp = await fetch(getUri(), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: GET_ALL_CATEGORIES }),
        cache: 'no-cache',
        next: {
            tags: ['books'],
        },
    });

    const { data } = await resp.json();

    return data.getAllCategories;
};

const page = async () => {
    const fetchedBooks = await getBooks();
    const combinedBooks = [...fetchedBooks.books, ...books];
    const { categories } = await getCategories();

    const mainObj = {};

    for (const category of categories) {
        const result = await getBooksByCategory(category._id);

        // @ts-ignore
        mainObj[category._id] = result.books;
    }

    return (
        <div className="my-10 text-white mb-28">
            <div className="flex justify-between mt-4 items-center animate__animated animate__slideInDown">
                <div className="border-l-4 pl-4 border-l-primary">
                    <h4 className="font-semibold uppercase md:text-2xl">
                        Main Categories
                    </h4>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 mt-6 md:gap-4 animate__animated animate__zoomIn">
                {categories.map((category: any) => (
                    <Link
                        key={category._id}
                        href={`categories/${category.slug}`}
                    >
                        <div
                            key={category._id}
                            style={{
                                height: '190px',
                                borderRadius: '5px',
                                // backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.0) 0%,rgba(0,0,0,0.1) 50%,rgba(0,0,0,0.0) 100%), url(${category.image})`,
                            }}
                            className="mb-5 relative book2 category-card"
                        >
                            <div className="flex justify-center okay-narsa bottom-0 w-full items-center">
                                <h3 className="wtf py-[0.2rem] font-oswald tracking-wider font-bold m-2  text-xl">
                                    {category.name}
                                </h3>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="flex flex-col md:flex-row text-white items-start mt-10 mb-10">
                <div className="md:basis-2/3 md:mr-4 basis-full">
                    {categories.map((category: any) => (
                        <>
                            <div className="flex justify-between items-center">
                                <div className="border-l-4 pl-4 border-l-primary animate__animated animate__fadeInRight">
                                    <h4 className="font-semibold uppercase text-md md:text-2xl">
                                        {category.name}
                                    </h4>
                                </div>
                                <div className="flex justify-between items-center animate__animated animate__fadeInLeft">
                                    <p className="uppercase text-xs md:text-sm tracking-wider mr-2">
                                        <Link
                                            href={`categories/${category.slug}`}
                                        >
                                            View All
                                        </Link>
                                    </p>
                                    <BsArrowRight />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 md:gap-6 mt-6 mb-20">
                                {/* @ts-ignore */}
                                {mainObj[category._id].map((book: any) => (
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
