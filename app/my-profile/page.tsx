import Link from 'next/link';
import React from 'react';
import { FaFacebookF } from '@react-icons/all-files/fa/FaFacebookF';
import { FaGoogle } from '@react-icons/all-files/fa/FaGoogle';
import { FaTwitter } from '@react-icons/all-files/fa/FaTwitter';
import ReactSelect from 'react-select';
import CustomSelect from '@/components/subscription/CustomSelect';
import { GET_ALL_SUBSCRIPTION_RATES } from '@/apollo/query/subscription-rate-query';
import SubscriptionForm from '@/components/subscription/SubscriptionForm';
import { GET_ALL_PAYMENT_METHODS } from '@/apollo/query/payment-method-query';
import SubscriptionHistory from '@/components/subscription/SubscriptionHistory';
import { getClient } from '@/apollo/client';
import { GET_ALL_SUBSCRIPTIONS } from '@/apollo/query/subscription-query';
import EditProfileForm from '@/components/profile/EditProfileForm';
import PasswordResetForm from '@/components/profile/PasswordResetForm';
import { getUri } from '@/utils/getApiUrl';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

const getAllSubscriptionRates = async () => {
    const resp = await fetch(getUri(), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: GET_ALL_SUBSCRIPTION_RATES }),
        cache: 'no-cache',
        next: {
            tags: ['books'],
        },
    });

    const { data } = await resp.json();

    return data.getAllSubscriptionRates;
};

const getAllPaymentMethods = async () => {
    const resp = await fetch(getUri(), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: GET_ALL_PAYMENT_METHODS }),
        cache: 'no-cache',
        next: {
            tags: ['payment-methods'],
        },
    });

    const { data } = await resp.json();

    return data.getAllPaymentMethods;
};

const getAllSubscriptions = async () => {
    const resp = await fetch(getUri(), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: GET_ALL_SUBSCRIPTIONS }),
        cache: 'no-cache',
        next: {
            tags: ['subscriptionsxxx'],
        },
    });

    const { data } = await resp.json();

    return data.getAllSubscriptions;
};

const page = async () => {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/login');
    }

    const { subscriptionRates } = await getAllSubscriptionRates();
    const { paymentMethods } = await getAllPaymentMethods();
    const { subscriptions } = await getAllSubscriptions();

    return (
        <>
            <div className="flex md:flex-row flex-col text-white my-10 mb-38 pb-10">
                <div className="basis-full md:basis-1/2 md:mb-0 mb-4">
                    <h3 className="text-[30px] font-oswald font-extrabold">
                        Edit Your Profile
                    </h3>
                    <EditProfileForm />
                </div>
                <div className="basis-full md:basis-1/2">
                    <h3 className="text-[30px] font-oswald font-extrabold">
                        Reset Your Password
                    </h3>
                    <PasswordResetForm />
                </div>
            </div>
            <hr className="my-10 py-8" />
            <div className="flex md:flex-row flex-col text-white my-10 mb-38">
                <div className="basis-full md:basis-1/2 md:mb-0 mb-4">
                    <h3 className="text-[30px] font-oswald font-extrabold">
                        Create A Subscirpiton
                    </h3>
                    <SubscriptionForm
                        paymentMethods={paymentMethods}
                        rates={subscriptionRates}
                    />
                </div>
                <div className="basis-full md:basis-1/2">
                    <h3 className="text-[30px] font-oswald font-extrabold">
                        History
                    </h3>
                    <SubscriptionHistory
                        subscriptions={subscriptions.filter(
                            // @ts-ignore
                            (sub) => sub.user._id == session?.user?._id
                        )}
                    />
                </div>
            </div>
        </>
    );
};

export default page;
