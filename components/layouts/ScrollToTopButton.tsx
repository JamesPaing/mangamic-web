'use client';

import { useEffect, useState } from 'react';
import { AiOutlineArrowUp } from '@react-icons/all-files/ai/AiOutlineArrowUp';

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            // if the user scrolls down, show the button
            window.scrollY > 500 ? setIsVisible(true) : setIsVisible(false);
        };
        // listen for scroll events
        window.addEventListener('scroll', toggleVisibility);

        // clear the listener on component unmount
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    // handles the animation when scrolling to the top
    const scrollToTop = () => {
        isVisible &&
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
    };

    return (
        <button
            className={`fixed text-white bg-primary bottom-4 right-4 rounded-full p-2 outline-none transition-opacity duration-200 ${
                isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={scrollToTop}
        >
            <AiOutlineArrowUp className="text-xl" />
        </button>
    );
};

export default ScrollToTopButton;
