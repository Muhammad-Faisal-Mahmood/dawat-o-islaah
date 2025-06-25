import { useEffect, useState } from "react";
import MenuItems from "./MenuItems";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import UserDropdown from "./UserDropdown";
import { useAuthData } from "../../../context/AuthContext";
import { useTranslation } from "../../../hooks/useTranslation";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuthData();

  const translation = useTranslation();
  const login = translation?.header?.login;

  const isUser = !!user;

  return (
    <div className="flex justify-between px-4 lg:px-20 items-center p-4 bg-[#C9A227]">
      {/* Logo */}
      <Link to="/">
        <img
          src="/assets/img/logo.jpeg"
          className="w-14 items-center"
          alt="Logo"
        />
      </Link>

      <div className="flex items-center">
        {/* Desktop Menu - Hidden on small screens */}
        <div className="hidden lg:flex gap-x-8 ">
          <MenuItems isUser={isUser} />
        </div>

        {isUser ? (
          <UserDropdown />
        ) : (
          <Link
            to="/signin"
            className="
          hidden lg:flex
    bg-[#1E3A5F] 
    text-white 
    hover:scale-105
    rounded-lg h-fit ml-8 px-6 py-2 
    font-medium text-sm
    cursor-pointer 
    transition-all duration-200 
    hover:bg-[#2a4b7a] 
    hover:shadow-md 
  "
          >
            {login}
          </Link>
        )}

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
            <MenuItems isMobile={true} isUser={isUser} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
