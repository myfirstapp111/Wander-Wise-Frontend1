import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 px-20 py-16">
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-4">
            WanderWise
          </h2>
          <p className="text-gray-400 leading-relaxed">
            Your smart travel companion for unforgettable journeys —
            from Earth to the galaxies beyond.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-purple-400">Home</a></li>
            <li><a href="/about" className="hover:text-purple-400">About</a></li>
            <li><a href="/contact" className="hover:text-purple-400">Contact</a></li>
            <li><a href="/features" className="hover:text-purple-400">Features</a></li>
          </ul>
        </div>

        {/* Explore */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            Explore
          </h3>
          <ul className="space-y-2">
            <li className="hover:text-purple-400 cursor-pointer">Milky Way</li>
            <li className="hover:text-purple-400 cursor-pointer">Andromeda</li>
            <li className="hover:text-purple-400 cursor-pointer">Nebula Trips</li>
            <li className="hover:text-purple-400 cursor-pointer">Space Adventures</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            Stay Updated
          </h3>
          <p className="text-gray-400 mb-4">
            Subscribe to get the latest travel updates.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-4 py-2 rounded-l-lg focus:outline-none text-gray-900"
            />
            <button className="bg-purple-600 px-5 rounded-r-lg text-white hover:bg-purple-500">
              Subscribe
            </button>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-500">
        © {new Date().getFullYear()} WanderWise. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;
