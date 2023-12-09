import React from 'react';
// import './spinner.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const loading = () => {
    return (
        <div className="flex mt-20">
            <div className="basis-3/4 grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-2 mr-6">
                <Skeleton height={300} count={1} />
                <Skeleton height={300} count={1} />
                <Skeleton height={300} count={1} />
                <Skeleton height={300} count={1} />
                <Skeleton height={300} count={1} />
                <Skeleton height={300} count={1} />
                <Skeleton height={300} count={1} />
                <Skeleton height={300} count={1} />
            </div>
            <div className="ml-6 basis-1/4">
                <Skeleton className="mb-4" height={200} count={1} />
                <Skeleton className="mb-4" height={200} count={1} />
                <Skeleton className="mb-4" height={200} count={1} />
                <Skeleton className="mb-4" height={200} count={1} />
            </div>
        </div>
    );
};

export default loading;
