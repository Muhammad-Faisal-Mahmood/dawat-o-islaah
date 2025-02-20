import React, { useState } from "react";
import MenuItems from "./MenuItems";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex justify-between lg:justify-around items-center p-4 px-8 bg-[#C9A227]">
      {/* Logo */}
      <img
        src="../../../../assets/Icons/IconMain.jpeg"
        className="w-14 items-center"
        alt="Logo"
      />

      {/* Desktop Menu - Hidden on small screens */}
      <div className="hidden lg:flex gap-x-8">
        <MenuItems />
      </div>

      {/* Hamburger Icon for Small Screens */}
      <button
        className="lg:hidden text-white text-2xl"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle Menu"
      >
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-30 right-4 w-[45%] md:w-[25%] max-w-[300px] bg-[#C9A227] rounded-lg shadow-lg z-50">
          <MenuItems isMobile={true} />
        </div>
      )}
    </div>
  );
};

export default Header;
