'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';

interface ComProps {
    chapters: [];
    chapter: any;
    bookSlug: string;
}

const ChapterSelector: React.FC<ComProps> = ({
    chapters,
    chapter,
    bookSlug,
}) => {
    const router = useRouter();

    const { data: session } = useSession();

    const onSelectChangeHandler = (e: any) => {
        router.push(`/books/${bookSlug}/${e.target.value}`);
    };

    return (
        <select
            data-te-select-init
            onChange={onSelectChangeHandler}
            className="bg-secondary-light p-2 w-40 text-white rounded-sm"
        >
            {chapters.length > 0
                ? chapters.map((chap: any) => (
                      <option
                          key={chap.slug}
                          selected={chap.slug === chapter.slug}
                          value={chap.slug}
                      >
                          {chap.name}
                      </option>
                  ))
                : null}
        </select>
    );
};

export default ChapterSelector;
