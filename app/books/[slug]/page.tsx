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
import { ADD_TO_BOOKMARK } from '@/apollo/query/user-query';
import AddToBookmark from '@/components/book/AddToBookmark';
import RemoveFromBookmark from '@/components/book/RemoveFromBookmark';

interface ComProps {
    params: { slug: string };
}

const getBook = async (slug: string, userId: string) => {
    const resp = await fetch('http://localhost:4000/graphql', {
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

const page: NextPage<ComProps> = async ({ params }) => {
    const session = await getServerSession(authOptions);
    // @ts-ignore
    const book = await getBook(params.slug, session?.user._id);

    return (
        <div className=" mt-8 text-[15px] mb-10">
            <div className="flex items-center">
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
            <div className="flex mt-14">
                <div className="basis-1/4">
                    <Image
                        alt={book!.mainImage}
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '4px',
                            objectFit: 'cover',
                        }} // optional
                        src={book!.mainImage}
                    />
                </div>
                <div className="basis-3/4 text-white ml-7 flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-center">
                            <h2 className="text-[1.5rem] font-bold">
                                {book?.title}
                            </h2>
                            {book.bookmarkedUsers.find(
                                // @ts-ignore
                                (bu) => bu._id === session?.user._id
                            ) ? (
                                <RemoveFromBookmark bookId={book._id} />
                            ) : (
                                <AddToBookmark bookId={book._id} />
                            )}
                        </div>
                        <p className="text-gray-400 text-[18px] mt-4">
                            {book!.summary}
                        </p>
                        <ul className="mt-4 text-[15px]">
                            <li className="flex items-center leading-[40px]">
                                <div className="mr-[18px] w-[115px] text-gray-400">
                                    Genre(s):
                                </div>
                                <div>
                                    {book.genres
                                        ?.map((g: any) => g.name)
                                        .join(',')}
                                </div>
                            </li>
                            <li className="flex items-center">
                                <div className="mr-[18px] w-[115px] text-gray-400">
                                    Views:
                                </div>
                                <div>{book.readCount}</div>
                            </li>
                        </ul>
                    </div>
                    <div className="flex items-center">
                        <div className="px-6 py-3 rounded-sm bg-primary flex items-center mr-4">
                            <AiFillCaretLeft className="mr-2" />
                            <span>Read First</span>
                        </div>
                        <div className="px-6 py-3 rounded-sm bg-primary flex items-center">
                            <span className="mr-2">Read Last</span>
                            <AiFillCaretRight />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex text-white items-start mt-20 mb-28">
                <div className="basis-2/3 mr-4 ">
                    <div className="flex justify-between items-center">
                        <div className="border-l-4 pl-4 border-l-primary">
                            <h5 className="font-semibold uppercase text-lg">
                                Chapters
                            </h5>
                        </div>
                    </div>
                    <div className="grid grid-cols-6 gap-6 mt-6">
                        {book.chapters.map((c: any) => (
                            <Link
                                key={c.slug}
                                href={`/books/${book.slug}/${c.slug}`}
                            >
                                <div className="p-2 relative hover:bg-white cursor-pointer transition-colors duration-200 hover:text-premium-black bg-secondary-light flex items-center justify-center rounded-sm">
                                    <div>{c.name}</div>
                                    <div className="absolute text-xs rounded-sm -right-4 flex justify-center items-end px-1 py-[2px] -top-3 bg-green-600">
                                        Free
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className="grid grid-cols-6 gap-6 mt-6">
                        {book.chapters.map((c: any) => (
                            <Link
                                key={c.slug}
                                href={`/books/${book.slug}/${c.slug}`}
                            >
                                <div className="p-2 hover:bg-white cursor-pointer transition-colors duration-200 hover:text-premium-black bg-green-600 flex items-center justify-center rounded-sm">
                                    <div>{c.name}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="basis-1/3 ml-4 flex flex-col justify-start">
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
