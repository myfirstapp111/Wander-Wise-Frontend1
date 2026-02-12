import React from "react";
import Typewriter from "typewriter-effect";

const Footer1 = () => {
  return (
    <footer className="bg-gray-400 px-6 py-12 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">

        {/* LEFT SIDE */}
        <div className="flex flex-col gap-6 text-center lg:text-left">

          {/* Brand */}
          <div>
            <div className="
              font-bold mb-2
              text-2xl sm:text-3xl md:text-4xl
            ">
              <Typewriter
                options={{
                  strings: ["WanderWise"],
                  autoStart: true,
                  loop: true,
                }}
              />
            </div>

            <p className="
              text-sm sm:text-base md:text-lg
              text-gray-700 max-w-md mx-auto lg:mx-0
            ">
              WanderWise is a travel platform that helps you plan your perfect trip.
            </p>
          </div>

          {/* Company Info */}
          <div className="
            text-sm sm:text-base md:text-lg
            text-gray-800 space-y-1
          ">
            <p>Clove I.T. Private Limited</p>
            <p>Mahendra Chowk, Biratnagar, Nepal</p>
            <p>+977-9800000001</p>
          </div>

          {/* Copyright */}
          <p className="
            text-xs sm:text-sm md:text-base
            text-gray-700
          ">
            &copy; {new Date().getFullYear()} WanderWise. All rights reserved.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col sm:flex-row gap-10 sm:gap-20 text-center sm:text-left">

          {/* Features */}
          <div className="
            flex flex-col gap-2
            text-sm sm:text-base md:text-lg
            font-medium text-gray-700
          ">
            <h2 className="
              text-base sm:text-lg md:text-xl
              text-black mb-2
            ">
              Features
            </h2>

            <a className="hover:underline hover:text-purple-600" href="#">
              Your Trips
            </a>
            <a className="hover:underline hover:text-purple-600" href="#">
              Itineraries
            </a>
            <a className="hover:underline hover:text-purple-600" href="#">
              Packages List
            </a>
            <a className="hover:underline hover:text-purple-600" href="#">
              Collaborate
            </a>
          </div>

          {/* Useful Links */}
          <div className="
            flex flex-col gap-2
            text-sm sm:text-base md:text-lg
            font-medium text-gray-700
          ">
            <h2 className="
              text-base sm:text-lg md:text-xl
              text-black mb-2
            ">
              Useful Links
            </h2>

            <a className="hover:underline hover:text-purple-600" href="#">
              About Us
            </a>
            <a className="hover:underline hover:text-purple-600" href="#">
              Contact Us
            </a>
            <a className="hover:underline hover:text-purple-600" href="#">
              Privacy Policy
            </a>
            <a className="hover:underline hover:text-purple-600" href="#">
              Terms & Conditions
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer1;
