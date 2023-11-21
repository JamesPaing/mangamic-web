'use client';

import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineSearch } from '@react-icons/all-files/ai/AiOutlineSearch';
import { FaUserCog } from '@react-icons/all-files/fa/FaUserCog';
import { FaUser } from '@react-icons/all-files/fa/FaUser';
import { AiOutlineLogin } from '@react-icons/all-files/ai/AiOutlineLogin';
import { AiOutlineMenu } from '@react-icons/all-files/ai/AiOutlineMenu';
import { AiOutlineCloseCircle } from '@react-icons/all-files/ai/AiOutlineCloseCircle';
import { FaCashRegister } from '@react-icons/all-files/fa/FaCashRegister';
import { AiOutlineHistory } from '@react-icons/all-files/ai/AiOutlineHistory';
import { BsBookmarkFill } from '@react-icons/all-files/bs/BsBookmarkFill';
import { FaUserCircle } from '@react-icons/all-files/fa/FaUserCircle';
import { FaSignOutAlt } from '@react-icons/all-files/fa/FaSignOutAlt';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { navLinks } from '@/utils/navLinks';
import { signOut, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const basePath = process.env.BASE_PATH ?? '';
    const pathname = usePathname();
    // @ts-ignore
    const isAuth = session?.user && session?.apiToken;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const keyword = useRef('');

    const linkStyles = `hover:bg-primary p-5 transition-colors duration-200 mr-5`;

    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (keyword.current.length === 0) {
            return;
        }

        router.push(`${basePath}/search/${keyword.current}`);

        setIsMenuOpen(false);

        keyword.current = '';
    };

    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    return (
        <div>
            <nav className="bg-secondary-dark py-5 z-[9999] md:py-0 px-4 md:px-36 text-white flex flex-row justify-between items-center">
                <div className="md:mr-20  text-xl uppercase">Mangamic</div>
                <div className="flex-1 md:flex flex-row justify-center items-center hidden">
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
                <div className="md:ml-20 flex justify-center items-center">
                    <div onClick={() => setIsSearchOpen(!isSearchOpen)}>
                        <AiOutlineSearch
                            className={`md:mr-8 cursor-pointer mr-4 ${
                                isSearchOpen ? 'text-primary' : 'text-white'
                            }`}
                            size={25}
                        />
                    </div>
                    {isAuth ? (
                        <div className="relative user-menu cursor-pointer">
                            <FaUserCog size={25} />
                            <ul className=" text-white pl-4 absolute shadow-sm shadow-gray-800 rounded-sm bg-secondary-dark user-submenu z-20 pt-2  -translate-x-8 w-[150px]">
                                <li
                                    onClick={() =>
                                        router.push(`${basePath}/my-profile`)
                                    }
                                    className="my-4 flex items-center hover:text-primary transition-colors duration-200"
                                >
                                    <FaUserCircle className="mr-2" size={18} />
                                    My Profile
                                </li>
                                <li
                                    onClick={() =>
                                        router.push(`${basePath}/history`)
                                    }
                                    className="my-4 flex items-center hover:text-primary transition-colors duration-200"
                                >
                                    <AiOutlineHistory
                                        className="mr-2"
                                        size={20}
                                    />
                                    History
                                </li>
                                <li
                                    onClick={() =>
                                        router.push(`${basePath}/bookmark`)
                                    }
                                    className="my-4 flex items-center hover:text-primary transition-colors duration-200"
                                >
                                    <BsBookmarkFill
                                        className="mr-2"
                                        size={20}
                                    />
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
                            <ul className=" text-white pl-4 absolute shadow-gray-800 rounded-sm bg-secondary-dark user-submenu z-10 pt-2  -translate-x-8 w-[150px]">
                                <li
                                    onClick={() => signIn()}
                                    className="mt-4 flex items-center hover:text-primary transition-colors duration-200"
                                >
                                    <AiOutlineLogin
                                        className="mr-2"
                                        size={19}
                                    />
                                    Sign In
                                </li>
                                <li
                                    onClick={() =>
                                        router.push(`${basePath}/register`)
                                    }
                                    className="my-4 flex items-center hover:text-primary transition-colors duration-200"
                                >
                                    <FaCashRegister
                                        className="mr-2"
                                        size={17}
                                    />
                                    Register
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
                <div
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className={` ${
                        isMenuOpen ? 'bg-primary' : 'bg-my-gray'
                    } rounded-sm cursor-pointer md:hidden flex justify-center items-center py-1 px-2`}
                >
                    <AiOutlineMenu className="" size={20} />
                </div>
            </nav>
            <form
                onSubmit={onSubmitHandler}
                className={`w-full ${
                    isSearchOpen ? 'h-10' : 'h-0'
                } transition-all duration-200 delay-70 mt-1 flex justify-center items-center`}
            >
                <input
                    onChange={(e) => (keyword.current = e.target.value)}
                    autoFocus={isSearchOpen}
                    placeholder="Search..."
                    className={`w-[90%] md:w-[80%] px-4 text-secondary-dark ${
                        isSearchOpen ? 'h-10' : 'h-0'
                    } bg-white rounded-sm transition-all duration-200 delay-70 my-0 py-0 focus:outline-none `}
                    type="text"
                />
            </form>

            <div>
                <ul
                    className={`bg-secondary-light text-gray-400 ${
                        isMenuOpen ? 'h-28' : 'h-0'
                    } transition-all duration-200 delay-75 overflow-hidden md:hidden flex flex-col items-start justify-center`}
                >
                    {navLinks.map((nl) => (
                        <Link
                            // onClick={() => setIsMenuOpen(false)}
                            key={nl.id}
                            className={` px-4 py-1  hover:text-white w-full  transition-all duration-200 ${
                                pathname === nl.path
                                    ? ' text-premium-gold tracking-widest'
                                    : null
                            }`}
                            href={nl.path}
                        >
                            <li>{nl.name} </li>
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
