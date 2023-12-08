import { NextPage } from 'next';
import React from 'react';
import { AiFillHome } from '@react-icons/all-files/ai/AiFillHome';
import { MdArrowForward } from '@react-icons/all-files/md/MdArrowForward';
import Image from 'next/image';
import books from '@/utils/dummy-data/books.json';
import { AiFillCaretLeft } from '@react-icons/all-files/ai/AiFillCaretLeft';
import { AiFillCaretRight } from '@react-icons/all-files/ai/AiFillCaretRight';
import { AiOutlinePlus } from '@react-icons/all-files/ai/AiOutlinePlus';
import { BsArrowRight } from '@react-icons/all-files/bs/BsArrowRight';
import BookCard2 from '@/components/home/BookCard2';
import { GET_BOOK, GET_BOOK_BY_SLUG } from '@/apollo/query/book-query';
import { Book } from '@/components/home/BookCard';
import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { ADD_TO_BOOKMARK, GET_USER } from '@/apollo/query/user-query';
import AddToBookmark from '@/components/book/AddToBookmark';
import RemoveFromBookmark from '@/components/book/RemoveFromBookmark';
import { getUri } from '@/utils/getApiUrl';

interface ComProps {
    params: { slug: string };
}

const getBook = async (slug: string, userId: string) => {
    const resp = await fetch(getUri(), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: GET_BOOK_BY_SLUG(slug, userId) }),
        next: {
            tags: ['get-book'],
        },
    });

    const { data } = await resp.json();

    return data.getBookBySlug;
};

const getUser = async (_id: string) => {
    const resp = await fetch(getUri(), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: GET_USER(_id) }),
        next: {
            tags: ['get-user'],
        },
    });

    const { data } = await resp.json();

    return data?.getUser || undefined;
};

const page: NextPage<ComProps> = async ({ params }) => {
    const session = await getServerSession(authOptions);
    // @ts-ignore
    const book = await getBook(params.slug, session?.user._id);

    // @ts-ignore
    const user = await getUser(session?.user?._id);

    // visited chapter id strings
    const visitedChapters = user?.visitedChapters.map((vc: any) =>
        vc._id.toString()
    );

    return (
        <div className=" mt-8 text-[15px] mb-10">
            <div className="flex text-sm items-center">
                <div className="flex items-center mr-1 text-white">
                    <AiFillHome className="mr-1 text-primary" />
                    <span className="mr-1">Home</span>
                    <MdArrowForward />
                </div>
                <div className="flex items-center mr-1 text-white">
                    <span className="mr-1">Books</span>
                    <MdArrowForward />
                </div>
                <div className="flex items-center text-gray-400">
                    <span className="mr-1">{book?.title}</span>
                </div>
            </div>
            <div className="flex md:flex-row flex-col mt-14">
                <div className="md:basis-1/4 basis-full">
                    <Image
                        alt={book?.mainImage}
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '4px',
                            objectFit: 'cover',
                        }} // optional
                        src={book?.mainImage}
                    />
                </div>
                <div className="md:basis-3/4 basis-full mt-4 md:mt-0 text-white md:ml-7 flex flex-col justify-between">
                    <div>
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                            <h2 className="text-[1.5rem] md:mb-0 mb-2 font-bold">
                                {book?.title}
                            </h2>
                            {user ? (
                                book?.bookmarkedUsers.find(
                                    // @ts-ignore
                                    (bu) => bu._id === session?.user._id
                                ) ? (
                                    <RemoveFromBookmark bookId={book._id} />
                                ) : (
                                    <AddToBookmark bookId={book?._id} />
                                )
                            ) : null}
                        </div>
                        <p className="text-gray-400 text-[18px] mt-4">
                            {book?.summary}
                        </p>
                        <ul className="mt-4 text-[15px] md:mb-0 mb-4">
                            <li className="flex items-center leading-[40px]">
                                <div className="mr-[18px] w-[115px] text-gray-400">
                                    Genre(s):
                                </div>
                                <div>
                                    {book?.genres
                                        ?.map((g: any) => g.name)
                                        .join(', ')}
                                </div>
                            </li>
                            <li className="flex items-center mb-2">
                                <div className="mr-[18px] w-[115px] text-gray-400">
                                    Views:
                                </div>
                                <div>{book?.readCount}</div>
                            </li>
                            <li className="flex items-center">
                                <div className="mr-[18px] w-[115px] text-gray-400">
                                    Uploaded By:
                                </div>
                                <div>{book?.addedBy?.name}</div>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center">
                        <div className="px-6 py-3 cursor-pointer hover:bg-my-gray transition-colors duration-150 rounded-sm bg-primary flex justify-center md:justify-start items-center md:mr-4 md:mb-0 mb-4">
                            <AiFillCaretLeft className="mr-2" />
                            <span>Read First</span>
                        </div>
                        <div className="px-6 py-3 cursor-pointer hover:bg-my-gray transition-colors duration-150 rounded-sm bg-primary md:justify-start justify-center flex items-center">
                            <span className="mr-2">Read Last</span>
                            <AiFillCaretRight />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row text-white md:items-start mt-20 mb-28">
                <div className="basis-full md:basis-2/3 md:mr-4 md:mb-0 mb-8">
                    <div className="flex justify-between items-center">
                        <div className="border-l-4 pl-4 border-l-primary">
                            <h5 className="font-semibold uppercase text-lg">
                                Chapters
                            </h5>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-6 md:gap-x-6 md:gap-y-6 mt-6">
                        {book?.chapters.map((c: any) => (
                            <Link
                                key={c.slug}
                                href={`/books/${book.slug}/${c.slug}`}
                            >
                                <div
                                    className={`p-2 relative hover:bg-white cursor-pointer transition-colors duration-200 hover:text-premium-black ${
                                        visitedChapters?.includes(c._id)
                                            ? 'bg-gray-400'
                                            : 'bg-secondary-light'
                                    } flex items-center justify-center rounded-sm`}
                                >
                                    <div>{c.name}</div>
                                    <div
                                        className={`absolute capitalize text-xs rounded-sm -right-4 flex justify-center items-end px-1 py-[2px] -top-3 ${
                                            c.type == 'free'
                                                ? 'bg-green-600'
                                                : 'bg-amber-600'
                                        }`}
                                    >
                                        {c.type}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="basis-full md:basis-1/3 md:ml-4 flex flex-col justify-start">
                    <div className="flex justify-between items-center">
                        <div className="border-l-4 pl-4 border-l-primary">
                            <h4 className="font-semibold uppercase text-lg">
                                You Might Like...
                            </h4>
                        </div>
                    </div>
                    <div className="mt-6">
                        {books.map((book) => (
                            // @ts-ignore
                            <BookCard2 key={book.id} book={book} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;
