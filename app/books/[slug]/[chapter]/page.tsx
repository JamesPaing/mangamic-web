import { NextPage } from 'next';
import React from 'react';
import { AiFillHome } from '@react-icons/all-files/ai/AiFillHome';
import { MdArrowForward } from '@react-icons/all-files/md/MdArrowForward';
import books from '@/utils/dummy-data/books.json';
import { GET_CHAPTER_BY_SLUG } from '@/apollo/query/chapter-query';
import { AiFillCaretLeft } from '@react-icons/all-files/ai/AiFillCaretLeft';
import { AiFillCaretRight } from '@react-icons/all-files/ai/AiFillCaretRight';
import Image from 'next/image';
import ScrollToTopButton from '@/components/layouts/ScrollToTopButton';
import { GET_ONLY_CHAPTERS } from '@/apollo/query/book-query';
import ChapterSelector from '@/components/chapter/ChapterSelector';
import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

interface ComProps {
    params: {
        slug: string;
        chapter: string;
    };
}

const getChapter = async (
    bookSlug: string,
    chapterSlug: string,
    userId: string
) => {
    const resp = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: GET_CHAPTER_BY_SLUG(bookSlug, chapterSlug, userId),
        }),
    });

    const { data } = await resp.json();

    return data.getChapterBySlug;
};

const getAllChapters = async (_id: string) => {
    const resp = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: GET_ONLY_CHAPTERS(_id),
        }),
    });

    const { data } = await resp.json();

    return data.getBook;
};

const page: NextPage<ComProps> = async ({ params }) => {
    const session = await getServerSession(authOptions);

    const chapter = await getChapter(
        params.slug,
        params.chapter,
        // @ts-ignore
        session?.user?._id
    );

    const { chapters } = await getAllChapters(chapter.book._id);

    return (
        <div className="mt-8 text-[15px] mb-10">
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
                <div className="flex items-center text-white">
                    <span className="mr-1">{chapter?.book.title}</span>
                    <MdArrowForward className="mr-1" />
                </div>
                <div className="flex items-center text-gray-400">
                    <span className="mr-1">{chapter.name}</span>
                </div>
            </div>
            <div className="flex mt-14 items-center justify-between flex-row ">
                <ChapterSelector
                    bookSlug={params.slug}
                    chapter={chapter}
                    chapters={chapters}
                />
                <div className="flex items-center text-white">
                    {chapter.slug.split('-')[1] === '1' ? null : (
                        <Link
                            href={`/books/${params.slug}/chapter-${
                                parseInt(params.chapter.split('-')[1]) - 1
                            }`}
                        >
                            <div className="px-6 py-3 rounded-sm bg-primary flex items-center mr-4">
                                <AiFillCaretLeft className="mr-2" />
                                <span>Previous</span>
                            </div>
                        </Link>
                    )}
                    {chapters.findIndex((c: any) => c._id == chapter._id) ===
                    chapters.length - 1 ? null : (
                        <Link
                            href={`/books/${params.slug}/chapter-${
                                parseInt(params.chapter.split('-')[1]) + 1
                            }`}
                        >
                            <div className="px-6 py-3 rounded-sm bg-primary flex items-center">
                                <span className="mr-2">Next</span>
                                <AiFillCaretRight />
                            </div>
                        </Link>
                    )}
                </div>
            </div>
            <div className="mt-20 px-16 mb-32">
                {chapter.images.length > 0
                    ? chapter.images.map((image: string) => (
                          <Image
                              key={image}
                              className="object-contain"
                              src={image}
                              alt={image}
                              width={0}
                              height={0}
                              sizes="100vw"
                              style={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'contain',
                              }}
                          />
                      ))
                    : null}
            </div>
            <ScrollToTopButton />
        </div>
    );
};

export default page;
