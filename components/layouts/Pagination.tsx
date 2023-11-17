import React, { useState } from 'react';
import { AiOutlineArrowRight } from '@react-icons/all-files/ai/AiOutlineArrowRight';
import { useDidMountEffect } from '@/hooks/useDidMountEffect';

type Props = {
    pagination: string[];
    refetch: any;
    sort?: string;
    fields?: string;
};

const Pagination = (props: Props) => {
    const [page, setPage] = useState('1');
    const [limit, setLimit] = useState('10');

    const { pagination, refetch, sort, fields } = props;

    useDidMountEffect(() => {
        refetch({
            queryString: {
                limit,
                page,
                sort,
                fields,
            },
        });
    }, [page]);

    return (
        <div className="flex items-center w-full flex-wrap my-4 py-4">
            {pagination.map((p) =>
                page === p ? (
                    <div
                        key={p}
                        className="h-[50px] cursor-pointer mr-2 border w-[50px] text-[15px] rounded-full flex items-center justify-center"
                    >
                        {p}
                    </div>
                ) : (
                    <div
                        key={p}
                        onClick={() => setPage(p)}
                        className="h-[50px] cursor-pointer mr-2 w-[50px] text-[15px] rounded-full flex items-center justify-center"
                    >
                        {p}
                    </div>
                )
            )}
            {/* <div className="h-[50px] mr-2 w-[50px] text-[15px] rounded-full flex items-center justify-center">
                <AiOutlineArrowRight />
            </div> */}
        </div>
    );
};

export default Pagination;
