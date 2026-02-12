import React, { useState } from "react";
import CustomButton from "../common/CustomButton";
import Typewriter from "typewriter-effect";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-sky-300">
      <div className="flex justify-between items-center px-4 sm:px-6 md:px-20 py-3 sm:py-4">
        
        {/* Left */}
        <div className="flex items-center gap-2 sm:gap-3 font-bold">
          <img
            src="/logo.png"
            alt="WanderWise Logo"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
          />

          {/* Hide typewriter on very small screens */}
          <div className="
            hidden sm:block
            text-lg sm:text-xl md:text-2xl
          ">
            <Typewriter
              options={{
                strings: ["WanderWise"],
                autoStart: true,
                loop: true,
              }}
            />
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          <nav
            className="
              flex items-center gap-4 lg:gap-6
              [&>a]:text-sm md:[&>a]:text-base lg:[&>a]:text-lg
              [&>a]:font-medium
              [&>a]:hover:text-purple-600
              transition
            "
          >
            <a href="#features">Features</a>
            <a href="#about">About</a>
            <a href="#famous">Famous</a>
            <a href="#contact">Contact</a>
          </nav>

          <Link to="/login1">
            <CustomButton texty="Sign In" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-sky-200 px-6 pb-6 animate-slideDown">
          <nav className="
            flex flex-col gap-4
            text-base sm:text-lg
            font-medium
          ">
            <a onClick={() => setOpen(false)} href="#features">Features</a>
            <a onClick={() => setOpen(false)} href="#about">About</a>
            <a onClick={() => setOpen(false)} href="#famous">Famous</a>
            <a onClick={() => setOpen(false)} href="#contact">Contact</a>
          </nav>

          <div className="mt-4">
            <Link to="/login1" onClick={() => setOpen(false)}>
              <CustomButton texty="Sign In" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
