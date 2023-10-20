'use client';

import { REMOVER_FROM_BOOKMARK } from '@/apollo/query/user-query';
import React from 'react';
import { FiDelete } from '@react-icons/all-files/fi/FiDelete';
import { useSession } from 'next-auth/react';

interface CompProps {
    bookId: string;
}

const RemoveFromBookmark: React.FC<CompProps> = ({ bookId }) => {
    const { data: session } = useSession();
    const removeFromBookmarkHandler = async (_id: string, bookId: string) => {
        const resp = await fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: REMOVER_FROM_BOOKMARK(_id, bookId) }),
            next: {
                tags: ['remove-from-bookmark'],
            },
        });

        const { data } = await resp.json();

        if (data?.removeFromBookmark?.status === 'success') {
            console.log('goooooo');
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

        return data.removeFromBookmark;
    };

    return (
        <div
            onClick={async () => {
                await removeFromBookmarkHandler(
                    // @ts-ignore
                    session?.user._id,
                    bookId
                );
            }}
            className="flex items-center tracking-wider text-premium-gold cursor-pointer hover:text-primary transition-colors duration-150 ease-linear text-md"
        >
            <FiDelete size={20} className="mr-2" />
            Remove Bookmark
        </div>
    );
};

export default RemoveFromBookmark;
