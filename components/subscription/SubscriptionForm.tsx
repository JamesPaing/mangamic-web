'use client';

import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { CREATE_SUBSCRIPTION } from '@/apollo/query/subscription-query';
import toast, { Toaster } from 'react-hot-toast';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import {
    GET_ALL_MODERATORS,
    GET_ALL_MODERATORS_NORMAL,
} from '@/apollo/query/user-query';
import { GET_ALL_SUBSCRIPTION_RATES_BY_USER } from '@/apollo/query/subscription-rate-query';
import { GET_ALL_PAYMENT_METHODS_BY_USER } from '@/apollo/query/payment-method-query';

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

const notify = () => toast('Incompleted form data, please try again.');
const createSubscriptionSuccess = () =>
    toast('Successfully sumbitted subscription request.');

const SubscriptionForm = (props: any) => {
    const { data } = useSession();
    const { rates, paymentMethods } = props;
    const [startedDate, setStartedDate] = useState<Date | undefined>(undefined);
    const [endedDate, setEndedDate] = useState<Date | undefined>(undefined);
    const [subscribedTo, setSubscribedTo] = useState(null);
    const [month, setMonth] = useState(0);
    const [rate, setRate] = useState(null);
    const [method, setMethod] = useState(null);
    const [slip, setSlip] = useState(null);
    const [createSubscription] = useMutation(CREATE_SUBSCRIPTION);
    const { data: channelData } = useSuspenseQuery(GET_ALL_MODERATORS_NORMAL, {
        variables: {
            queryString: {
                limit: null,
            },
        },
    });

    const { data: paymentMethodsData, refetch: paymentMethodsRefresh } =
        useSuspenseQuery(GET_ALL_PAYMENT_METHODS_BY_USER, {
            variables: {
                queryString: {
                    limit: null,
                },
                userId: null,
            },
        });

    const { data: subscriptionRatesData, refetch: subscriptonRatesRefresh } =
        useSuspenseQuery(GET_ALL_SUBSCRIPTION_RATES_BY_USER, {
            variables: {
                queryString: {
                    limit: null,
                },
                userId: null,
            },
        });

    const resetState = () => {
        setStartedDate(undefined);
        setEndedDate(undefined);
        setMonth(0);
        setRate(null);
        setMethod(null);
        setSlip(null);
    };

    const onSubmitHandler = async (e: any) => {
        e.preventDefault();

        if (
            !startedDate ||
            !endedDate ||
            !subscribedTo ||
            !method ||
            !rate ||
            //@ts-ignore
            !data?.user?._id ||
            !slip
        ) {
            notify();

            return;
        }

        const subscription = {
            startedDate,
            endedDate,
            subscribedTo,
            paymentMethod: method,
            subscriptionRate: rate,
            //@ts-ignore
            user: data?.user?._id,
            slip,
        };

        const { data: createSubscriptionData } = await createSubscription({
            variables: {
                subscription,
            },
        });

        if (
            createSubscriptionData &&
            createSubscriptionData.createSubscription
        ) {
            createSubscriptionSuccess();
            resetState();
        }
    };

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

    useEffect(() => {
        if (subscribedTo) {
            paymentMethodsRefresh({
                userId: subscribedTo,
            });

            subscriptonRatesRefresh({
                userId: subscribedTo,
            });
        }
    }, [subscribedTo]);

    return (
        <form
            // encType="multipart/form-data"
            onSubmit={onSubmitHandler}
            className="mt-5 animate__animated animate__slideInLeft"
        >
            <Toaster />
            <label className="relative text-gray-400 focus-within:text-gray-600 block">
                <Select
                    onChange={(val) => {
                        // @ts-ignore
                        setSubscribedTo(val.value);
                    }}
                    placeholder="Select Channel..."
                    styles={styles}
                    className="w-[100%] md:w-[88%]"
                    //@ts-ignore
                    options={channelData?.getAllModerators?.users?.map(
                        (r: any, i: number) => ({
                            label: r.name,
                            value: r._id,
                        })
                    )}
                />
            </label>
            <label className="relative mt-5 text-gray-400 focus-within:text-gray-600 block">
                <Select
                    onChange={(val) => {
                        // @ts-ignore
                        const [month, rate] = val!.value!.split('-');

                        setMonth(parseInt(month));
                        setRate(rate);
                    }}
                    isDisabled={subscribedTo ? false : true}
                    placeholder="Select Plan..."
                    styles={styles}
                    className="w-[100%] md:w-[88%]"
                    // @ts-ignore
                    options={subscriptionRatesData?.getAllSubscriptionRatesByUser?.subscriptionRates?.map(
                        (r: any, i: number) => ({
                            label: `${r.name} (${r.rate} MMK)`,
                            value: `${r.numMonths}-${r._id}`,
                        })
                    )}
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
            </label>
            <label className="relative mt-5 text-gray-400 focus-within:text-gray-600 block">
                <Select
                    onChange={(val) => {
                        // @ts-ignore
                        setMethod(val.value);
                    }}
                    placeholder="Select Payment Method..."
                    styles={styles}
                    isDisabled={subscribedTo ? false : true}
                    className="w-[100%] md:w-[88%]"
                    // @ts-ignore
                    options={paymentMethodsData?.getAllPaymentMethodsByUser?.paymentMethods?.map(
                        (m: any, i: number) => ({
                            label: m.name,
                            value: m._id,
                        })
                    )}
                />
                {method ? (
                    <div className="mt-4 text-white">
                        <div className="flex items-center leading-[40px]">
                            <div className="mr-[18px] w-[250px] text-gray-400">
                                Account Name :
                            </div>
                            <div>
                                {
                                    paymentMethods.find(
                                        (pm: any) => pm._id == method
                                    )?.accountName
                                }
                            </div>
                        </div>
                        <div className="flex items-center leading-[40px]">
                            <div className="mr-[18px] w-[250px] text-gray-400">
                                Account / Phone Number :
                            </div>
                            <div>
                                {
                                    paymentMethods.find(
                                        (pm: any) => pm._id == method
                                    )?.accountNumber
                                }
                            </div>
                        </div>
                        <div className="text-red-600 mt-2 text-sm font-bold">
                            <p>
                                Once your transaction is completed. Please
                                attach the screenshot below.
                            </p>
                        </div>
                    </div>
                ) : null}
            </label>
            <label className="relative mt-5 text-gray-400 focus-within:text-gray-600 block">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="pointer-events-none w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-3"
                    viewBox="0 -960 960 960"
                    fill="currentColor"
                >
                    <path d="M120-80v-800l60 60 60-60 60 60 60-60 60 60 60-60 60 60 60-60 60 60 60-60 60 60 60-60v800l-60-60-60 60-60-60-60 60-60-60-60 60-60-60-60 60-60-60-60 60-60-60-60 60Zm120-200h480v-80H240v80Zm0-160h480v-80H240v80Zm0-160h480v-80H240v80Zm-40 404h560v-568H200v568Zm0-568v568-568Z" />
                </svg>
                <input
                    // @ts-ignore
                    onChange={(e) => setSlip(e.target?.files[0])}
                    type="file"
                    name="slip"
                    id="slip"
                    placeholder="Attach slip"
                    className="form-input w-[100%] md:w-[88%] border border-gray-900 py-3 px-2 bg-white placeholder-gray-400 text-gray-500 appearance-none block pl-14 focus:outline-none"
                />
            </label>
            <div className="mt-7 flex justify-between items-center">
                <button
                    type="submit"
                    className="bg-primary  tracking-[2px] uppercase px-[30px] py-[12px] text-[13px] "
                >
                    Subscribe Now
                </button>
            </div>
            <h5 className="mt-8 text-[15px]">
                Already have a subcription?
                <Link className=" text-primary font-bold" href={'/login'}>
                    {' '}
                    Read Books Now
                </Link>
            </h5>
        </form>
    );
};

export default SubscriptionForm;
