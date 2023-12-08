'use client';

import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

const PasswordResetForm = () => {
    const { data } = useSession();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatNewPassword, setRepeadNewPassword] = useState('');

    return (
        <form className="mt-5 animate__animated animate__slideInRight">
            <label className="relative text-gray-400 focus-within:text-gray-600 block">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="pointer-events-none w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-3"
                    viewBox="0 -960 960 960"
                    fill="currentColor"
                >
                    <path d="M280-400q-33 0-56.5-23.5T200-480q0-33 23.5-56.5T280-560q33 0 56.5 23.5T360-480q0 33-23.5 56.5T280-400Zm0 160q-100 0-170-70T40-480q0-100 70-170t170-70q67 0 121.5 33t86.5 87h352l120 120-180 180-80-60-80 60-85-60h-47q-32 54-86.5 87T280-240Zm0-80q56 0 98.5-34t56.5-86h125l58 41 82-61 71 55 75-75-40-40H435q-14-52-56.5-86T280-640q-66 0-113 47t-47 113q0 66 47 113t113 47Z" />
                </svg>
                <input
                    value={oldPassword}
                    type="text"
                    name="oldPassword"
                    id="oldPassword"
                    placeholder="Old Password"
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
                    <path d="M280-400q-33 0-56.5-23.5T200-480q0-33 23.5-56.5T280-560q33 0 56.5 23.5T360-480q0 33-23.5 56.5T280-400Zm0 160q-100 0-170-70T40-480q0-100 70-170t170-70q67 0 121.5 33t86.5 87h352l120 120-180 180-80-60-80 60-85-60h-47q-32 54-86.5 87T280-240Zm0-80q56 0 98.5-34t56.5-86h125l58 41 82-61 71 55 75-75-40-40H435q-14-52-56.5-86T280-640q-66 0-113 47t-47 113q0 66 47 113t113 47Z" />
                </svg>
                <input
                    value={newPassword}
                    type="text"
                    name="newPassword"
                    id="newPassword"
                    placeholder="New Password"
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
                    <path d="M280-400q-33 0-56.5-23.5T200-480q0-33 23.5-56.5T280-560q33 0 56.5 23.5T360-480q0 33-23.5 56.5T280-400Zm0 160q-100 0-170-70T40-480q0-100 70-170t170-70q67 0 121.5 33t86.5 87h352l120 120-180 180-80-60-80 60-85-60h-47q-32 54-86.5 87T280-240Zm0-80q56 0 98.5-34t56.5-86h125l58 41 82-61 71 55 75-75-40-40H435q-14-52-56.5-86T280-640q-66 0-113 47t-47 113q0 66 47 113t113 47Z" />
                </svg>
                <input
                    value={repeatNewPassword}
                    type="text"
                    name="repeatNewPassword"
                    id="repeatNewPassword"
                    placeholder="Repeat New Password"
                    className="form-input w-[100%] md:w-[88%] border border-gray-900 py-3 px-2 bg-white placeholder-gray-400 text-gray-500 appearance-none block pl-14 focus:outline-none"
                />
            </label>
            <div className="mt-7 flex justify-between items-center">
                <button
                    disabled
                    type="submit"
                    className="bg-gray-500 tracking-[2px] uppercase px-[30px] py-[12px] text-[13px] "
                >
                    Reset
                </button>
            </div>
        </form>
    );
};

export default PasswordResetForm;
