import Link from 'next/link';
import React from 'react';
import { FaFacebookF } from '@react-icons/all-files/fa/FaFacebookF';
import { FaGoogle } from '@react-icons/all-files/fa/FaGoogle';
import { FaTwitter } from '@react-icons/all-files/fa/FaTwitter';

const Register = () => {
    return (
        <div>
            <div
                style={{
                    height: '300px',
                    backgroundSize: 'cover',
                    backgroundPosition: 'top center',
                    backgroundRepeat: 'no-repeat',
                    backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("/images/hero-1.jpg")`,
                }}
                className="mx-[-9rem] text-white flex flex-col justify-center items-center"
            >
                <h2 className="text-[48px] font-oswald font-extrabold">
                    Sign Up
                </h2>
                <p className="text-[24px] mt-1 font-thin">
                    Welcome to the Hey Comic.
                </p>
            </div>
            <div className="text-white flex flex-row justify-center items-start mb-32 mt-16 pt-16">
                <div className="basis-1/2 pl-[145px] border-r-[0.5px] border-gray-600 ">
                    <h3 className="text-[30px] font-oswald font-extrabold">
                        Sign Up
                    </h3>
                    <form className="mt-5 ">
                        <label className="relative text-gray-400 focus-within:text-gray-600 block">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="pointer-events-none w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-3"
                                viewBox="0 -960 960 960"
                                fill="currentColor"
                            >
                                <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
                            </svg>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email Address"
                                className="form-input w-[88%] border border-gray-900 py-3 px-2 bg-white placeholder-gray-400 text-gray-500 appearance-none block pl-14 focus:outline-none"
                            />
                        </label>
                        <label className="relative mt-5 text-gray-400 focus-within:text-gray-600 block">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="pointer-events-none w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-3"
                                viewBox="0 -960 960 960"
                                fill="currentColor"
                            >
                                <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
                            </svg>
                            <input
                                type="text"
                                name="email"
                                id="email"
                                placeholder="Your Name"
                                className="form-input w-[88%] border border-gray-900 py-3 px-2 bg-white placeholder-gray-400 text-gray-500 appearance-none block pl-14 focus:outline-none"
                            />
                        </label>
                        <label className="relative mt-5 text-gray-400 focus-within:text-gray-600 block">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="pointer-events-none w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-3"
                                viewBox="0 -960 960 960"
                                width="24"
                                fill="currentColor"
                            >
                                <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z" />
                            </svg>
                            <input
                                type="password"
                                name="email"
                                id="email"
                                placeholder="Password"
                                className="form-input w-[88%] border border-gray-900 py-3 px-2 bg-white placeholder-gray-400 text-gray-500 appearance-none block pl-14 focus:outline-none"
                            />
                        </label>
                        <div className="mt-7 flex justify-between items-center">
                            <button
                                type="submit"
                                className="bg-primary  tracking-[2px] uppercase px-[30px] py-[12px] text-[13px] "
                            >
                                Register Now
                            </button>
                        </div>
                        <h5 className="mt-8 text-[15px]">
                            Already Have An Account?
                            <Link
                                className=" text-primary font-bold"
                                href={'/login'}
                            >
                                {' '}
                                Log In!
                            </Link>
                        </h5>
                    </form>
                </div>
                <div className="basis-1/2 px-[15px]">
                    <div className="pl-[30px]">
                        <h3 className="text-[30px] font-[700] font-oswald">
                            Log In With:
                        </h3>
                        <div className="mt-5">
                            <Link
                                className="w-[460px] relative mb-4 tracking-[2px] text-[13px] bg-[#4267b2] py-[14px] flex justify-center items-center"
                                href={'www.facebook.com'}
                            >
                                <FaFacebookF className="text-lg absolute left-[32px] text-white" />
                                <span>Sign In With Facebook</span>
                            </Link>
                            <Link
                                className="w-[460px] relative tracking-[2px] mb-4 text-[13px] bg-[#ff4343] py-[14px] flex justify-center items-center"
                                href={'www.google.com'}
                            >
                                <FaGoogle className="text-lg absolute left-[32px] text-white" />
                                <span>Sign In With Google</span>
                            </Link>
                            <Link
                                className="w-[460px] relative tracking-[2px] mb-4 text-[13px] bg-[#1da1f2] py-[14px] flex justify-center items-center"
                                href={'www.twitter.com'}
                            >
                                <FaTwitter className="text-lg absolute left-[32px] text-white" />
                                <span>Sign In With Twitter/X</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
