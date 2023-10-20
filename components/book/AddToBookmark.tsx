'use client';

import { ADD_TO_BOOKMARK } from '@/apollo/query/user-query';
import React from 'react';
import { AiOutlinePlus } from '@react-icons/all-files/ai/AiOutlinePlus';
import { useSession } from 'next-auth/react';

interface CompProps {
    bookId: string;
}

const AddToBookmark: React.FC<CompProps> = ({ bookId }) => {
    const { data: session } = useSession();
    const addToBookmarkHandler = async (_id: string, bookId: string) => {
        const resp = await fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: ADD_TO_BOOKMARK(_id, bookId) }),
            next: {
                tags: ['add-to-bookmark'],
            },
        });

        const { data } = await resp.json();

        if (data?.addToBookmark?.status === 'success') {
            await fetch(
                'http://localhost:3000/api/revalidate?tag=get-book&secret=WhatTheFuckIsGoingOn',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
        }

        return data.addToBookmark;
    };

    return (
        <div
            onClick={async () => {
                await addToBookmarkHandler(
                    // @ts-ignore
                    session?.user._id,
                    bookId
                );
            }}
            className="flex items-center tracking-wider cursor-pointer hover:text-primary transition-colors duration-150 ease-linear text-md"
        >
            <AiOutlinePlus className="mr-2" />
            Add to Bookmarks
        </div>
    );
};

export default AddToBookmark;
