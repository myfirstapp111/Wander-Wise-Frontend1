import React from "react";
import { Link, NavLink } from "react-router-dom";
import Typewriter from "typewriter-effect";
import { LayoutDashboard, Map, ListTodo, Briefcase, LogOut } from "lucide-react";

import { motion } from "framer-motion";

import CustomButton from "../common/CustomButton";
import useAuth from "../../hooks/useAuth";


import TextTransition, { presets } from 'react-text-transition';
import { useEffect, useState } from "react";

const AppNavbar = () => {
    const { logout } = useAuth();

    const navItemClass = ({ isActive }) =>
        `flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200
     ${isActive
            ? "bg-white/60 text-blue-700 shadow font-semibold"
            : "text-gray-700 hover:bg-white/40 hover:text-blue-700"
        }`;


    const TEXTS = ['Fast', 'Modern', 'Beautiful'];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setIndex(i => (i + 1) % TEXTS.length), 2000);
        return () => clearInterval(interval);
    }, []);



    return (
        <header className="flex justify-between items-center px-10 py-3 border-b border-white/40 shadow-lg sticky top-0 z-50 bg-sky-300/80 backdrop-blur-md">

            {/* ========== LEFT ========== */}
            <Link to="/dashboard" className="flex items-center gap-3 text-2xl font-bold">

                <motion.img
                    src="/logo.png"
                    alt="WanderWise Logo"
                    className="w-12 h-12 rounded-full cursor-pointer"
                    animate={{ rotate: -360 }}
                    transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "linear"
                    }}
                    whileHover={{ rotate: 0 }}
                />


                <div className="text-blue-900">


                    <TextTransition springConfig={presets.gentle}>
                        {TEXTS[index]}
                    </TextTransition>

                    <Typewriter
                        options={{
                            strings: ["WanderWise", "Plan. Travel. Enjoy."],
                            autoStart: true,
                            loop: true,
                        }}
                    />
                </div>
            </Link>

            {/* ========== RIGHT ========== */}
            <div className="flex items-center gap-8">

                {/* Navigation */}
                <nav className="flex items-center gap-2">

                    <NavLink to="/dashboard" className={navItemClass}>
                        <LayoutDashboard className="animate-bounce" size={18} />
                        Dashboard
                    </NavLink>

                    <NavLink to="/trips" className={navItemClass}>
                        <Map className="animate-bounce" size={18} />
                        Trips
                    </NavLink>

                    <NavLink to="/itineraries" className={navItemClass}>
                        <ListTodo className="animate-bounce" size={18} />
                        Itineraries
                    </NavLink>

                    <NavLink to="/baggage" className={navItemClass}>
                        <Briefcase className="animate-bounce" size={18} />
                        Baggage
                    </NavLink>

                </nav>

                {/* Logout Button */}
                <button
                    onClick={logout}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl
                    animate-pulse
                    bg-red-500 text-white font-semibold shadow hover:bg-red-600 transition"
                >
                    <LogOut size={18} />
                    Logout
                </button>

            </div>
        </header>
    );
};

export default AppNavbar;
