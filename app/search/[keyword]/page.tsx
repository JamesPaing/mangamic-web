import { GET_ALL_BOOKS, SEARCH_BOOKS } from '@/apollo/query/book-query';
import BookCard from '@/components/home/BookCard';
import BookCard2 from '@/components/home/BookCard2';
import BookCard3 from '@/components/home/BookCard3';
import Pagination from '@/components/layouts/Pagination';
import { getUri } from '@/utils/getApiUrl';
import React from 'react';

type Props = {
    params: {
        keyword: string;
    };
};

const getBooks = async (keyword: string) => {
    const resp = await fetch(getUri(), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: SEARCH_BOOKS(keyword) }),
        cache: 'no-cache',
        next: {
            tags: ['books'],
        },
    });

    const { data } = await resp.json();

    return data.getAllBooks;
};

const page = async (props: Props) => {
    const { params } = props;
    const { keyword } = params;

    const { books } = await getBooks(keyword);

    return (
        <div className="my-10 text-white mb-28">
            <div className="flex flex-col md:flex-row text-white items-start mt-10 mb-10">
                <div className="md:basis-2/3 md:mr-4 basis-full">
                    <div className="flex justify-between items-center">
                        <div className="border-l-4 pl-4 border-l-primary">
                            <h4 className="font-semibold uppercase text-md md:text-2xl">
                                Search Results:{' '}
                                <span className="text-gray-400">{keyword}</span>
                            </h4>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="md:text-sm hidden md:block text-xs tracking-wider mr-4">
                                Order By:
                            </p>
                            <select
                                data-te-select-init
                                // onChange={onSelectChangeHandler}
                                className="bg-secondary-light px-2 py-1 w-36 text-white rounded-sm"
                            >
                                <option value={1}>A - Z</option>
                                <option value={2}>Z - A</option>
                                <option value={3}>Added Date</option>
                                <option value={4}>Most Popular</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 md:gap-6 mt-6">
                        {books.map((book: any) => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                    {/* <Pagination /> */}
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
                        {books.map((book: any) => (
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
                        {books.map((book: any) => (
                            <BookCard3 key={book.id} book={book} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;
