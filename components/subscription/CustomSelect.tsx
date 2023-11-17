'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Select from 'react-select';

const styles = {
    control: (base: any) => ({
        ...base,
        minHeight: 50,
        borderRadius: 0,
    }),
    dropdownIndicator: (base: any) => ({
        ...base,
        paddingTop: 0,
        paddingBottom: 0,
    }),
    clearIndicator: (base: any) => ({
        ...base,
        paddingTop: 0,
        paddingBottom: 0,
    }),
};

const CustomSelect = (props: any) => {
    const { rates } = props;

    const [startedDate, setStartedDate] = useState<Date | undefined>(undefined);
    const [endedDate, setEndedDate] = useState<Date | undefined>(undefined);
    const [month, setMonth] = useState(0);
    const [rate, setRate] = useState(null);

    useEffect(() => {
        if (month > 0) {
            const calculateStartAndEndDate = (monthsToAdd: number) => {
                if (typeof monthsToAdd !== 'number') {
                    throw new Error(
                        'Invalid input. Please provide a valid number of months to add.'
                    );
                }

                const today = new Date();

                // Calculate the end date by adding the specified number of months
                const endDate = new Date(today);
                endDate.setMonth(today.getMonth() + monthsToAdd);

                return {
                    startDate: today,
                    endDate: endDate,
                };
            };

            const { startDate, endDate } = calculateStartAndEndDate(month);

            setStartedDate(startDate);
            setEndedDate(endDate);
        } else {
            setStartedDate(undefined);
            setEndedDate(undefined);
        }
    }, [month]);

    return (
        <>
            <Select
                onChange={(val) => {
                    // @ts-ignore
                    const [month, rate] = val!.value!.split('-');

                    setMonth(parseInt(month));
                    setRate(rate);
                }}
                placeholder="Select Month..."
                styles={styles}
                className=" w-[88%]"
                options={rates.map((r: any, i: number) => ({
                    label: `${r.name} (${r.rate} MMK)`,
                    value: `${r.numMonths}-${r._id}`,
                }))}
            />
            {startedDate && endedDate ? (
                <div className="mt-4 text-white">
                    <div className="flex items-center leading-[40px]">
                        <div className="mr-[18px] w-[115px] text-gray-400">
                            Start Date :
                        </div>
                        <div>{startedDate.toLocaleDateString()}</div>
                    </div>
                    <div className="flex items-center leading-[40px]">
                        <div className="mr-[18px] w-[115px] text-primary">
                            Expiry Date :
                        </div>
                        <div>{endedDate.toLocaleDateString()}</div>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default CustomSelect;
