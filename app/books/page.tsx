import Image from 'next/image';
import React from 'react';
import img1 from '@/public/images/categories/image-1.jpeg';
import { BsArrowRight } from '@react-icons/all-files/bs/BsArrowRight';
import { GET_ALL_BOOKS } from '@/apollo/query/book-query';
import books from '@/utils/dummy-data/books.json';
import BookCard from '@/components/home/BookCard';
import BookCard2 from '@/components/home/BookCard2';
import BookCard3 from '@/components/home/BookCard3';
import Pagination from '@/components/layouts/Pagination';

const genres = [
    'Action',
    'Adventure',
    'Comedy',
    'Drama',
    'Fantasy',
    'Horror',
    'Science Fiction',
    'Mystery',
    'Romance',
    'Thriller',
    'Crime',
    'Animation',
    'Family',
    'Documentary',
    'Biography',
    'Musical',
    'History',
    'War',
    'Western',
    'Sport',
    'Music',
    'Superhero',
    'Film Noir',
    'Fantasy',
    'Romantic Comedy',
    'Sci-Fi',
    'Spy',
    'Teen',
    'Coming of Age',
    'Epic',
    'Experimental',
    'Film Adaptation',
    'Martial Arts',
    'Period',
    'Political',
    'Satire',
    'Surreal',
    'Zombie',
    'Alien',
    'Cyberpunk',
    'Post-Apocalyptic',
    'Steampunk',
    'Vampire',
    'Werewolf',
    'Time Travel',
    'Space Opera',
    'Courtroom Drama',
    'Gangster',
    'Heist',
    'Psychological Thriller',
    'Neo-Noir',
    'Social Drama',
    'Survival',
    'Animation',
    'CGI',
    'Stop-Motion',
    'Musical Comedy',
    'True Crime',
];

const categories = [
    {
        id: 1,
        name: 'Manga',
        image: 'https://i.pinimg.com/originals/6b/b0/67/6bb067ec86a18d17740846f76be34cfc.jpg',
    },
    {
        id: 2,
        name: 'Manhwa',
        image: 'https://wallpaperaccess.com/full/10811.jpg',
    },
    {
        id: 3,
        name: 'Manhua',
        image: 'https://a-static.besthdwallpaper.com/anime-girl-fantasy-blue-eyes-wallpaper-2400x1350-82099_50.jpg',
    },
    {
        id: 4,
        name: 'Comics',
        image: 'https://wallpaperaccess.com/full/692818.jpg',
    },
];

const getBooks = async () => {
    const resp = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: GET_ALL_BOOKS }),
        cache: 'no-cache',
        next: {
            tags: ['books'],
        },
    });

    const { data } = await resp.json();

    return data.getAllBooks;
};

const page = async () => {
    const fetchedBooks = await getBooks();
    const combinedBooks = [...fetchedBooks.books, ...books];

    return (
        <div className="my-10 text-white mb-28">
            <div className="flex justify-between mt-4 items-center">
                <div className="border-l-4 pl-4 border-l-primary">
                    <h4 className="font-semibold uppercase text-2xl">
                        Main Categories
                    </h4>
                </div>
            </div>
            <div className="grid grid-cols-4 mt-6 gap-4">
                {categories.map((category) => (
                    <div
                        style={{
                            height: '190px',
                            borderRadius: '5px',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.0) 0%,rgba(0,0,0,0.1) 50%,rgba(0,0,0,0.0) 100%), url(${category.image})`,
                        }}
                        className=" mb-5 relative book2"
                    >
                        <div className="flex justify-center okay-narsa bottom-0 w-full items-center">
                            <h3 className="wtf py-[0.2rem] font-oswald tracking-wider font-bold m-2  text-xl">
                                {category.name}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex text-white items-start mt-10 mb-10">
                <div className="basis-2/3 mr-4 ">
                    <div className="flex justify-between items-center">
                        <div className="border-l-4 pl-4 border-l-primary">
                            <h4 className="font-semibold uppercase text-2xl">
                                All Books
                            </h4>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-sm tracking-wider mr-4">
                                Order By:
                            </p>
                            <select
                                data-te-select-init
                                // onChange={onSelectChangeHandler}
                                className="bg-secondary-light px-2 py-1 w-36 text-white rounded-sm"
                            >
                                <option value={1}>A - Z</option>
                                <option value={2}>Z - A</option>
                                <option value={3}>Added Date</option>
                                <option value={4}>Most Popular</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 mb-10 gap-6 mt-6">
                        {[...combinedBooks, ...combinedBooks].map((book) => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                    <Pagination />
                </div>
                <div className="basis-1/3 ml-4 flex flex-col justify-start ">
                    <div className="flex justify-between items-center">
                        <div className="border-l-4 pl-4 border-l-primary">
                            <h4 className="font-semibold uppercase text-lg">
                                Top Reads
                            </h4>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="text-xs font-thin text-gray-400">
                                <span className="mr-2">Day</span>
                                <span className="mr-2">Week</span>
                                <span className="mr-2">Month</span>
                                <span className="mr-2">Year</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6">
                        {combinedBooks.map((book) => (
                            <BookCard2 key={book.id} book={book} />
                        ))}
                    </div>
                    <div className="flex justify-between items-center mt-10">
                        <div className="border-l-4 pl-4 border-l-primary">
                            <h4 className="font-semibold uppercase text-lg">
                                New Chapter
                            </h4>
                        </div>
                    </div>
                    <div className="mt-6">
                        {combinedBooks.map((book) => (
                            <BookCard3 key={book.id} book={book} />
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex mt-4 justify-between items-center">
                <div className="border-l-4 pl-4 border-l-primary">
                    <h4 className="font-semibold uppercase text-2xl">Genres</h4>
                </div>
            </div>
            <div className="flex items-center flex-wrap mt-6">
                {genres.map((genre) => (
                    <div className=" bg-secondary-light text-sm px-4 py-[0.4rem] mr-4 mb-4 font-thin flex items-center justify-center rounded-md">
                        {genre} <p className="text-gray-400 ml-1">({4})</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default page;
