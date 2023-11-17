'use client'; // Error components must be Client Components

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const router = useRouter();

    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="text-gray-400 pt-48 pb-96 mb-96 flex flex-col justify-center items-center">
            <h2 className="text-3xl font-bold">We&apos;re sorry.</h2>
            <p className="text-center py-4 my-4 text-xl leading-8">
                <span className="text-red-700">
                    You can&apos;t access this page.
                </span>{' '}
                <br />
                This chapter might be premium chapter <br />
                and you may not have a subscription or your subscription has
                already expired.
            </p>
            <div className="flex items-center justify-center">
                <button
                    className="bg-gray-200 mr-4 rounded-sm p-2 text-gray-600"
                    onClick={
                        // Attempt to recover by trying to re-render the segment
                        () => router.back()
                    }
                >
                    Go Back
                </button>
                <button
                    className="bg-gray-200 rounded-sm p-2 text-gray-600"
                    onClick={
                        // Attempt to recover by trying to re-render the segment
                        () => router.back()
                    }
                >
                    Go To Your Subscription
                </button>
            </div>
        </div>
    );
}
