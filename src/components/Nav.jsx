import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";

export default function Nav() {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("user"))
    const [isOpen, setIsOpen] = useState(false)

    const logout = () => {
        localStorage.removeItem("user")
        setIsOpen(false)
        navigate("/login")
    };

    if (!user) return null

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50 text-lg">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-green-600">Chat App</h1>

                <div className="hidden md:flex items-center gap-8">
                    <Link to="/"
                        className="text-gray-700 hover:text-green-600 font-semibold">
                        Chats</Link>

                    <Link to="/profile"
                        className="text-gray-700 hover:text-green-600 font-semibold">
                        Profile </Link>
                </div>

                <div className="hidden md:block">
                    <button onClick={logout}
                        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded cursor-pointer">
                        Logout</button>
                </div>

                <button className="md:hidden text-3xl text-green-700"
                    onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <HiX /> : <HiMenuAlt3 />}
                </button>


            </div>

            {isOpen && (<div className="md:hidden bg-white shadow-md px-6 py-4 space-y-3 text-base">
                <Link to="/"
                    className="block text-gray-700 hover:text-green-600 font-semibold"
                    onClick={() => setIsOpen(false)}>
                    Chats </Link>

                <Link to="/profile"
                    className="block text-gray-700 hover:text-green-600 font-semibold"
                    onClick={() => setIsOpen(false)}>
                    Profile</Link>
                <button onClick={logout}
                    className="w-full text-left text-gray-700 hover:text-green-600 font-semibold">
                    Logout </button>
            </div>
            )}


        </nav>
    )
}
