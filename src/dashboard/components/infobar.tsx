import { Search } from "lucide-react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useState, useRef } from "react";

const Infobar = () => {
  const [showDrop, setshowDrop] = useState(false);
  const needFocus = useRef<HTMLButtonElement>(null);
  const HandlelogOut = async()=>{
    await fetch("https://total-task-backend.onrender.com/logout", {
      method : "POST",
      credentials: "include"
    })
    window.location.href= "/"
  }
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
        <IoMdNotificationsOutline size={32} />
        <div className="dropdown">
          <button
            ref={needFocus}
            onClick={() => {
              setshowDrop(!showDrop);
            }}
            id="dropdownDefaultButton"
            data-dropdown-toggle="dropdown"
            type="button"
            className="dropbtn cursor-pointer"
          >
            <div className="bg-green-400 rounded-full w-[40px] h-[40px] flex items-center justify-center text-[20px] font-semibold">
              CA
            </div>
          </button>
          <div
            id="myDropdown"
            className={`dropdown-content ${
              showDrop ? "absolute" : "hidden"
            } z-20 bg-neutral-100 divide-y divide-gray-200 rounded-lg shadow-2xl w-44 right-[-3px]`}
          >
            <ul
              className="py-2 text-sm dark:text-gray-200"
              aria-labelledby="dropdownDefaultButton"
            >
              <li>
                <div
                  onClick={HandlelogOut}
                  className="block px-4 text-red-600 cursor-pointer py-2 hover:bg-gray-200"
                >
                  Log Out
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Infobar;
