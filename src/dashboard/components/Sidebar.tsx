import { ClipboardList, Handshake, LayoutDashboard } from "lucide-react";
import { Link, useLocation } from "react-router";

const Sidebar = () => {
  const { pathname } = useLocation();
  return (
    <div className="lg:w-[400px] md:w-[250px] xs:w-[300px] flex flex-col lg:px-5 px-1 py-5 gap-11">
      <div className="text-3xl font-bold text-[#1DBADB] xs:block hidden">
        <Link to={"/"}>
          Total <span className="text-[#FB6201]">Task</span>
        </Link>
      </div>
      <div className="text-3xl font-bold text-[#1DBADB] xs:hidden">
        <Link to={"/"}>
          T <span className="text-[#FB6201]">T</span>
        </Link>
      </div>
      <ul className="flex flex-col gap-3 justify-start xs:w-[80%] xs:px-0  font-semibold">
        <Link to={"/dashboard"}>
          <li
            className={`${
              pathname === "/dashboard"
                ? "bg-[#b94a05] text-white"
                : "hover:bg-[#f5cdb4]"
            } py-2 md:px-5 px-3 rounded-2xl transition-all flex gap-4`}
          >
            <div>
              <LayoutDashboard />
            </div>
            <div className="xs:block hidden">Dashboard</div>
          </li>
        </Link>
        <Link to={"/mytasks"}>
          <li
            className={`${
              pathname === "/mytasks"
                ? "bg-[#b94a05] text-white"
                : "hover:bg-[#f5cdb4]"
            } py-2 md:px-5 px-3  rounded-2xl transition-all flex gap-4`}
          >
            <div>
              <ClipboardList />
            </div>
            <div className="xs:block hidden">My Tasks</div>
          </li>
        </Link>
        <Link to={"/teams"}>
          <li
            className={`${
              pathname === "/teams"
                ? "bg-[#b94a05] text-white"
                : "hover:bg-[#f5cdb4]"
            } py-2 md:px-5 px-3  rounded-2xl transition-all flex gap-4`}
          >
            <div>
              <Handshake />{" "}
            </div>
            <div className="xs:block hidden">Teams</div>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
