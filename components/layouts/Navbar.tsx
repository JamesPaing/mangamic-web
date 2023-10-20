'use client';

import Link from 'next/link';
import React from 'react';
import { AiOutlineSearch } from '@react-icons/all-files/ai/AiOutlineSearch';
import { FaUserCog } from '@react-icons/all-files/fa/FaUserCog';
import { FaUser } from '@react-icons/all-files/fa/FaUser';
import { AiOutlineLogin } from '@react-icons/all-files/ai/AiOutlineLogin';
import { FaCashRegister } from '@react-icons/all-files/fa/FaCashRegister';
import { AiOutlineHistory } from '@react-icons/all-files/ai/AiOutlineHistory';
import { BsBookmarkFill } from '@react-icons/all-files/bs/BsBookmarkFill';
import { FaUserCircle } from '@react-icons/all-files/fa/FaUserCircle';
import { FaSignOutAlt } from '@react-icons/all-files/fa/FaSignOutAlt';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { navLinks } from '@/utils/navLinks';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const pathname = usePathname();
    // @ts-ignore
    const isAuth = session?.user && session?.apiToken;

    const linkStyles = `hover:bg-primary p-5 transition-colors duration-200 mr-5`;

    return (
        <nav className="bg-secondary-dark px-36 text-white flex flex-row justify-between items-center">
            <div className="mr-20 text-xl uppercase">Hey Comic</div>
            <div className="flex-1 flex flex-row justify-center items-center">
                {navLinks.map((nl) => (
                    <Link
                        key={nl.id}
                        className={`${linkStyles} ${
                            pathname === nl.path
                                ? ' border-primary border-b-2'
                                : null
                        }`}
                        href={nl.path}
                    >
                        {nl.name}
                    </Link>
                ))}
            </div>
            <div className="ml-20 flex justify-center items-center">
                <AiOutlineSearch className="mr-8" size={25} />
                {isAuth ? (
                    <div className="relative user-menu cursor-pointer">
                        <FaUserCog size={25} />
                        <ul className=" text-white pl-4 absolute shadow-sm shadow-gray-800 rounded-sm bg-secondary-dark user-submenu z-10 pt-2  -translate-x-8 w-[150px]">
                            <li className="my-4 flex items-center hover:text-primary transition-colors duration-200">
                                <FaUserCircle className="mr-2" size={18} />
                                My Profile
                            </li>
                            <li
                                onClick={() => router.push('/history')}
                                className="my-4 flex items-center hover:text-primary transition-colors duration-200"
                            >
                                <AiOutlineHistory className="mr-2" size={20} />
                                History
                            </li>
                            <li className="my-4 flex items-center hover:text-primary transition-colors duration-200">
                                <BsBookmarkFill className="mr-2" size={20} />
                                Bookmarks
                            </li>
                            <li
                                onClick={() => signOut()}
                                className="my-4 flex items-center hover:text-primary transition-colors duration-200"
                            >
                                <FaSignOutAlt className="mr-2" size={18} />
                                Sign Out
                            </li>
                        </ul>
                    </div>
                ) : (
                    <div className="relative user-menu cursor-pointer">
                        <FaUser size={21} />
                        <ul className=" text-white pl-4  absolute shadow-gray-800 rounded-sm bg-secondary-dark user-submenu z-10 pt-2  -translate-x-8 w-[150px]">
                            <li
                                onClick={() => router.push('/api/auth/signin')}
                                className="mt-4 flex items-center hover:text-primary transition-colors duration-200"
                            >
                                <AiOutlineLogin className="mr-2" size={19} />
                                Sign In
                            </li>
                            <li className="my-4 flex items-center hover:text-primary transition-colors duration-200">
                                <FaCashRegister className="mr-2" size={17} />
                                Register
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
