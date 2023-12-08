'use client';

import { UPDATE_USER } from '@/apollo/query/user-query';
import { useMutation } from '@apollo/client';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast('Incompleted form data, please try again.');
const updateUserSuccess = () =>
    toast('Successfully updated your profile data.');

const EditProfileForm = () => {
    const { data, update } = useSession();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [updateUser] = useMutation(UPDATE_USER);

    useEffect(() => {
        if (data) {
            if (data.user?.name) {
                setName(data.user.name);
            }

            if (data.user?.email) {
                setEmail(data.user.email);
            }

            // @ts-ignore
            if (data.user?.contact) {
                // @ts-ignore
                setContact(data.user?.contact);
            }
        }
    }, [data]);

    const onSubmitHandler = async (e: any) => {
        e.preventDefault();

        if (name.length === 0 || email.length === 0 || contact.length === 0) {
            notify();
        }

        const { data } = await updateUser({
            variables: {
                // @ts-ignore
                _id: data?.user?._id,
                user: {
                    name,
                    email,
                    contact,
                },
            },
        });

        if (data && data.updateUser) {
            updateUserSuccess;
        }
    };

    return (
        <form
            onSubmit={onSubmitHandler}
            className="mt-5 animate__animated animate__slideInLeft"
        >
            <Toaster />
            <label className="relative text-gray-400 focus-within:text-gray-600 block">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="pointer-events-none w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-3"
                    fill="currentColor"
                    viewBox="0 -960 960 960"
                >
                    <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
                </svg>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    className="form-input w-[100%] md:w-[88%] border border-gray-900 py-3 px-2 bg-white placeholder-gray-400 text-gray-500 appearance-none block pl-14 focus:outline-none"
                />
            </label>
            <label className="relative mt-5 text-gray-400 focus-within:text-gray-600 block">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="pointer-events-none w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-3"
                    viewBox="0 -960 960 960"
                    fill="currentColor"
                >
                    <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
                </svg>
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email Address"
                    className="form-input w-[100%] md:w-[88%] border border-gray-900 py-3 px-2 bg-white placeholder-gray-400 text-gray-500 appearance-none block pl-14 focus:outline-none"
                />
            </label>
            <label className="relative mt-5 text-gray-400 focus-within:text-gray-600 block">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="pointer-events-none w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-3"
                    viewBox="0 -960 960 960"
                    fill="currentColor"
                >
                    <path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z" />
                </svg>
                <input
                    onChange={(e) => setContact(e.target.value)}
                    value={contact}
                    type="text"
                    name="contact"
                    id="contact"
                    placeholder="Contact"
                    className="form-input w-[100%] md:w-[88%] border border-gray-900 py-3 px-2 bg-white placeholder-gray-400 text-gray-500 appearance-none block pl-14 focus:outline-none"
                />
            </label>
            <div className="mt-7 flex justify-between items-center">
                <button
                    disabled
                    type="submit"
                    className="bg-gray-500  tracking-[2px] uppercase px-[30px] py-[12px] text-[13px] "
                >
                    Update
                </button>
            </div>
        </form>
    );
};

export default EditProfileForm;
