import { BiCart } from "react-icons/bi";
import { Link } from "react-router-dom";
import UserData from "./userData";
import { IoHomeOutline } from "react-icons/io5";
import { IoCubeOutline } from "react-icons/io5";
import { CiPhone } from "react-icons/ci";
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Header() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <>
            <header className="sticky top-0 z-50 w-full h-[80px] glass dark:glass-dark flex justify-between items-center px-6 transition-colors duration-300">
                <Link to="/" className="h-full py-2">
                    {/* Assuming the logo might need to look good on dark mode, maybe invert it or use a text logo if no image is available. */}
                    <img src="/logo.png" className="h-full object-contain drop-shadow-md" alt="Dr.Computer Logo" />
                </Link>
                <div className="hidden lg:flex h-full justify-center items-center gap-8 font-medium">
                    <Link to="/" className="text-slate-700 dark:text-slate-300 hover:text-accent dark:hover:text-accent-dark transition-colors">Home</Link>
                    <Link to="/products" className="text-slate-700 dark:text-slate-300 hover:text-accent dark:hover:text-accent-dark transition-colors">Products</Link>
                    <Link to="/contact-us" className="text-slate-700 dark:text-slate-300 hover:text-accent dark:hover:text-accent-dark transition-colors">Contact Us</Link>
                </div>
                <div className="flex justify-center items-center gap-4">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
                        aria-label="Toggle Theme"
                    >
                        {theme === 'dark' ? <IoSunnyOutline size={24} /> : <IoMoonOutline size={24} />}
                    </button>
                    <Link to="/cart" className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors">
                        <BiCart size={26} />
                    </Link>
                    <UserData />
                </div>
            </header>

            <div className="fixed bottom-0 left-0 z-50 w-full h-[70px] glass dark:glass-dark shadow-[0_-4px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.5)] flex lg:hidden justify-evenly items-center pb-2 pt-1 rounded-t-xl transition-colors duration-300">
                <Link to="/" className="h-full flex flex-col justify-center items-center text-slate-500 hover:text-accent dark:text-slate-400 dark:hover:text-accent-dark transition-colors group">
                    <IoHomeOutline className="text-2xl group-hover:-translate-y-1 transition-transform" />
                    <span className="text-xs font-medium mt-1">Home</span>
                </Link>
                <Link to="/products" className="h-full flex flex-col justify-center items-center text-slate-500 hover:text-accent dark:text-slate-400 dark:hover:text-accent-dark transition-colors group">
                    <IoCubeOutline className="text-2xl group-hover:-translate-y-1 transition-transform" />
                    <span className="text-xs font-medium mt-1">Products</span>
                </Link>
                <Link to="/contact-us" className="h-full flex flex-col justify-center items-center text-slate-500 hover:text-accent dark:text-slate-400 dark:hover:text-accent-dark transition-colors group">
                    <CiPhone className="text-2xl group-hover:-translate-y-1 transition-transform" />
                    <span className="text-xs font-medium mt-1">Contact</span>
                </Link>
                <div className="h-full flex flex-col justify-center items-center text-slate-500 dark:text-slate-400 group">
                    <UserData />
                </div>
            </div>
        </>
    )
}