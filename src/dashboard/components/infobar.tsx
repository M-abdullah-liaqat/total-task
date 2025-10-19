import { Search } from "lucide-react";
import { IoMdNotificationsOutline } from "react-icons/io";

import React from "react";

interface Props {}

const Infobar = (props: Props) => {
  return (
    <div className="bg-white md:py-5 py-2 flex justify-between items-center md:px-15 px-6">
      <div className="flex bg-neutral-200 md:w-[350px] w-[60%] items-center gap-2 ring-black px-3 rounded-full">
        <Search />
        <input
          type="search"
          className="bg-neutral-200 py-1 w-full outline-0"
          placeholder="Search task"
        />
      </div>
      <div className="flex items-center justify-center gap-4">
        <IoMdNotificationsOutline size={32}/>
        <div className="bg-green-400 rounded-full w-[40px] h-[40px] flex items-center justify-center text-[20px] font-semibold">CA</div>
      </div>
    </div>
  );
};

export default Infobar;
