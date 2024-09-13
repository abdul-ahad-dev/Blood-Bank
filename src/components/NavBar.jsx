import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import user from '../assets/user.png'
import logo from '../assets/logo.jpg'


export default function Navbar() {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false);

    const naviagte = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('userId');
        naviagte('/login')
    };

    return (

        <nav className="bg-red-700 text-white border-b-2 border-gray-300">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img
                        src={logo}
                        className="h-12 w-12 rounded-full "
                        alt="Logo"
                    />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        Chat Hub
                    </span>
                </a>

                <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <button
                        type="button"
                        className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                        id="user-menu-button"
                        onClick={() => setDropdownOpen(!isDropdownOpen)}
                        aria-expanded={isDropdownOpen}
                    >
                        <span className="sr-only">Open user menu</span>
                        <img
                            className="w-8 h-8 object-cover bg-center bg-gray-400 rounded-full"
                            src={user}
                            alt="user photo"
                        />
                    </button>

                    {/* Dropdown menu */}
                    {isDropdownOpen && (
                        <div
                            className="z-50 absolute top-14 right-0 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                            id="user-dropdown"
                        >
                            <div className="px-4 py-3">
                                <span className="block text-sm text-gray-900 dark:text-white">
                                    Abdul Ahad
                                </span>
                                <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                                    abdulahad@gmail.com
                                </span>
                            </div>
                            <ul className="py-2" aria-labelledby="user-menu-button">
                                <li>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                        Dashboard
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                        Settings
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                        Earnings
                                    </a>
                                </li>
                                <li>
                                    <a href="#" onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                        Sign out
                                    </a>
                                </li>
                            </ul>
                        </div>
                    )}

                    <button
                        onClick={() => setMenuOpen(!isMenuOpen)}
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-user"
                        aria-expanded={isMenuOpen}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>
                </div>

                <div className={`md:flex md:w-auto md:order-1  ${isMenuOpen ? "block" : "hidden"} w-full overflow-hidden`} id="navbar-user">
                    <ul className="flex flex-col font-medium p-4 bg-transparent text-white md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <Link to={'/home'} className="block py-2 px-3">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to={'/chatlist'} className="block py-2 px-3">
                                Donar List
                            </Link>
                        </li>
                        <li>
                            <Link to={'/location'} className="block py-2 px-3 ">
                                Location
                            </Link>
                        </li>
                        <li>
                            <Link to={'/location'} className="block py-2 px-3 ">
                                Profile
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>


    )
}