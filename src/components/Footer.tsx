import React from "react";
import NavBar from "./NavBar";
interface Props {}

const Footer = (props: Props) => {
  return (
    <div className="bg-[#A0D495] min-h-[200px] relative">
      <div className="2xl:w-[1532px] w-full justify-self-center md:px-8 py-5 ">
        <NavBar />
      </div>
      <div className="absolute bottom-2 left-0 right-0 text-center text-xl text-[#344634]">
        Cppyright-2025 Total task- All rights reserved!
      </div>
    </div>
  );
};

export default Footer;
