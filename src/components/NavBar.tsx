import React from "react";
import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <div className="flex items-center justify-between 2xl:w-[1532px] w-full lg:px-8 px-5 justify-self-center py-4">
      <Link to={"/"}>
        <div className="text-3xl font-bold text-[#1DBADB]">
          Total <span className="text-[#FB6201]">Task</span>
        </div>
      </Link>
      <ul className="gap-5 text-xl text-[#344634] md:flex hidden">
        <Link to={"/"}>
        <li className="hover:text-[#FB6201] hover:underline cursor-pointer transition-all">
          Home
        </li>        
        </Link>
        <li className="hover:text-[#FB6201] hover:underline cursor-pointer transition-all">
          Products
        </li>
        <li className="hover:text-[#FB6201] hover:underline cursor-pointer transition-all">
          About
        </li>
        <li className="hover:text-[#FB6201] hover:underline cursor-pointer transition-all">
          Contact
        </li>
      </ul>
      <div>
        <Link to={'/dashboard'}>
        <button className="px-5 py-2 bg-[#FB6201] text-white rounded-2xl text-xl font-semibold cursor-pointer hover:bg-[#FB6201]/70 transition-all">
          Get Started
        </button>        
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
