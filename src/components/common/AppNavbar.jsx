import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Typewriter from "typewriter-effect";
import {
  LayoutDashboard,
  Map,
  ListTodo,
  Briefcase,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";

import TextTransition, { presets } from "react-text-transition";

const AppNavbar = () => {
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);

  const navItemClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm sm:text-base
     ${
       isActive
         ? "bg-white/60 text-blue-700 shadow font-semibold"
         : "text-gray-700 hover:bg-white/40 hover:text-blue-700"
     }`;

  const TEXTS = ["Fast", "Modern", "Beautiful"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((i) => (i + 1) % TEXTS.length),
      2000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-sky-300/80 backdrop-blur-md border-b border-white/40 shadow-lg">
      <div className="flex justify-between items-center px-4 sm:px-8 py-3">
        {/* ===== LEFT ===== */}
        <Link to="/dashboard" className="flex items-center gap-3">
          <motion.img
            src="/logo.png"
            alt="WanderWise Logo"
            className="w-9 h-9 sm:w-11 sm:h-11 rounded-full cursor-pointer"
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            whileHover={{ rotate: 0 }}
          />

          {/* Hide fancy text on very small screens */}
          <div className="hidden sm:block text-blue-900 font-bold leading-tight mb-3">
            <TextTransition springConfig={presets.gentle}>
              {TEXTS[index]}
            </TextTransition>

            <div className="text-base sm:text-lg">
              <Typewriter
                options={{
                  strings: ["WanderWise", "Plan. Travel. Enjoy."],
                  autoStart: true,
                  loop: true,
                }}
              />
            </div>
          </div>
        </Link>

        {/* ===== DESKTOP NAV ===== */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-2">
            <NavLink to="/dashboard" className={navItemClass}>
              <LayoutDashboard size={18} />
              Dashboard
            </NavLink>

            <NavLink to="/trips" className={navItemClass}>
              <Map size={18} />
              Trips
            </NavLink>

            <NavLink to="/itineraries" className={navItemClass}>
              <ListTodo size={18} />
              Itineraries
            </NavLink>

            <NavLink to="/baggage" className={navItemClass}>
              <Briefcase size={18} />
              Baggage
            </NavLink>
          </nav>

          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl
            bg-red-500 text-white font-semibold shadow hover:bg-red-600 transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {/* ===== MOBILE MENU BUTTON ===== */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-800"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* ===== MOBILE DROPDOWN ===== */}
      {open && (
        <div className="md:hidden px-4 pb-6 bg-sky-200 space-y-3">
          <nav className="flex flex-col gap-2">
            <NavLink
              to="/dashboard"
              onClick={() => setOpen(false)}
              className={navItemClass}
            >
              <LayoutDashboard size={18} />
              Dashboard
            </NavLink>

            <NavLink
              to="/trips"
              onClick={() => setOpen(false)}
              className={navItemClass}
            >
              <Map size={18} />
              Trips
            </NavLink>

            <NavLink
              to="/itineraries"
              onClick={() => setOpen(false)}
              className={navItemClass}
            >
              <ListTodo size={18} />
              Itineraries
            </NavLink>

            <NavLink
              to="/baggage"
              onClick={() => setOpen(false)}
              className={navItemClass}
            >
              <Briefcase size={18} />
              Baggage
            </NavLink>
          </nav>

          <button
            onClick={() => {
              logout();
              setOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl
            bg-red-500 text-white font-semibold shadow hover:bg-red-600 transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default AppNavbar;
