
import { useState, useRef } from "react";
import { useAuth } from "../../context/authContext";
import { useTeams } from "../../context/teamContext";
import Dialog from "../../components/dialog";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { Link } from "react-router";
import type { TeamType } from "../../context/teamContext";

const Teams = () => {
  const [selectedTeam, setselectedTeam] = useState<TeamType>();
  const { teams, loadingTeams } = useTeams();
  const [teamCerating, setteamCerating] = useState(false);
  const { sessionData } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [teamName, setteamName] = useState("");
  const [Organization, setOrganization] = useState("");
  const needFocus = useRef<any>({});
  const [showDrop, setshowDrop] = useState<string | null>(null);

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => {
    setOrganization("");
    setteamName("");
    setIsDialogOpen(false);
  };
  const [isConfirm, setIsConfirm] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const handleCloseConfirm = () => setIsConfirm(false);
  const handleCloseUpdate = () => {
    setOrganization("");
    setteamName("");
    setIsUpdate(false);
  };

  const HandleUpdateTeam = async () => {
    if (teamName && Organization) {
      setteamCerating(true);
      const res = await fetch(`https://total-task-backend.onrender.com/updateteam`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          Id: selectedTeam?.teamId,
          teamName,
          organization: Organization,
        }),
      }).then((r) => r.json());
      if (res.status === 200) {
        window.location.reload();
      } else {
        toast.error(res.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } else {
      toast.error("TeamName and ORginazation is reqired", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
    setteamCerating(false);
  };
  const HandleCreateTeam = async () => {
    if (teamName && Organization) {
      setteamCerating(true);
      const res = await fetch("https://total-task-backend.onrender.com/createteams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          teamName,
          organization: Organization,
          createdBy: sessionData?.email,
          members: [
            {
              name: sessionData?.username,
              email: sessionData?.email,
              role: "teamManager",
            },
          ],
        }),
      }).then((e) => e.json());
      if (!res) {
        toast.error(res.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        return;
      }
      setIsDialogOpen(false);
      setOrganization("");
      setteamName("");
      toast.success(res.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else {
      toast.error("TeamName and ORginazation is reqired", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
    setteamCerating(false);
  };
  const handleDeleteTeam = async () => {
    if (sessionData?.email === selectedTeam?.createdBy) {
      const res = await fetch("https://total-task-backend.onrender.com/deleteteam", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ Id: selectedTeam?.teamId }),
      }).then((r) => r.json());
      if (res.status === 200) {
        window.location.reload();
      } else {
        setIsConfirm(false);
        toast.error(res.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } else {
      setIsConfirm(false);
      toast.error("Only Team creaters can delete Members", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };
  if (loadingTeams) {
    return <div>Loading....</div>;
  }
  return (
    <div className="space-y-4 pb-10">
      <div>
        <h1 className="sticky top-0 z-[10] flex items-center justify-between border-b bg-background/50 p-6 c backdrop-blur-lg">
          <span className="font-semibold">Teams</span>
          <div>
            <button
              onClick={handleOpenDialog}
              className="md:text-xl text-lg font-semibold py-2 px-4 bg-[#FB6201] rounded-xl hover:scale-105 cursor-pointer transition-all hover:bg-[#FB6201]/80"
            >
              Create Team
            </button>
          </div>
        </h1>
      </div>
      <div className="flex flex-col gap-3 md:px-10 px-5">
        <div className="grid lg:grid-cols-3 grid-cols-2 gap-4 md:px-8 px-4 bg-white py-2 rounded-xl transition-all cursor-pointer">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center md:gap-3 gap-2">
              <div className="xl:text-xl">Team Name</div>
            </div>
          </div>
          <div className=" hidden items-center xl:text-xl lg:flex">Members</div>
          <div className="flex items-center justify-end gap-3">Actions</div>
        </div>
        {teams &&
          teams.map((item, index) => (
            <Link key={index} to={`/team/${item.teamId}`}>
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 md:px-8 px-4 bg-white py-2 rounded-xl hover:scale-104 transition-all cursor-pointer">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center md:gap-3 gap-2">
                    <div className="bg-green-400 rounded-full w-[50px] h-[50px] flex items-center justify-center text-[24px] font-semibold">
                      {item.teamName[0]}
                    </div>
                    <div className="xl:text-xl">{item.teamName}</div>
                  </div>
                  <div className="dropdown md:hidden">
                    <button
                      ref={(el) => {
                        needFocus.current[item.teamId] = el;
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        if (showDrop) {
                          setshowDrop(null);
                          return;
                        }
                        setshowDrop(item.teamId);
                      }}
                      id="dropdownDefaultButton"
                      data-dropdown-toggle="dropdown"
                      type="button"
                      className="dropbtn cursor-pointer text-4xl"
                    >
                      ...
                    </button>
                    <div
                      id="myDropdown"
                      className={`dropdown-content ${
                        item.teamId === showDrop ? "absolute" : "hidden"
                      } z-20 bg-neutral-100 right-2 divide-gray-200 rounded-lg shadow-2xl md:w-44 w-30`}
                    >
                      <ul
                        className="py-2 text-sm dark:text-gray-200"
                        aria-labelledby="dropdownDefaultButton"
                      >
                        <li
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            setselectedTeam(item);
                            setIsUpdate(true);
                          }}
                          className="text-blue-600 font-semibold cursor-pointer"
                        >
                          <button className="block px-4 text-blue-600 cursor-pointer py-2 hover:bg-gray-200">
                          Update
                          </button>
                        </li>
                        <li
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            setselectedTeam(item);
                            setIsConfirm(true);
                          }}
                          className="text-red-600 font-semibold cursor-pointer"
                        >
                          <button className="block px-4 text-red-600 cursor-pointer py-2 hover:bg-gray-200">
                            Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className=" hidden items-center xl:text-xl lg:flex">
                  {item.members?.length}
                </div>
                <div className="hidden items-center justify-end gap-3 md:flex">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      setselectedTeam(item);
                      setIsUpdate(true);
                    }}
                    className="text-blue-600 font-semibold cursor-pointer"
                  >
                    Update
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      setselectedTeam(item);
                      setIsConfirm(true);
                    }}
                    className="text-red-600 font-semibold cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </Link>
          ))}
      </div>
      <Dialog isOpen={isDialogOpen} onClose={handleCloseDialog}>
        <h2 className="text-xl font-bold">Create Team</h2>
        <div>
          <div className="flex gap-10 py-2">
            <div className="space-y-2">
              <div>Team Name</div>
              <input
                value={teamName}
                onChange={(e) => setteamName(e.target.value)}
                type="text"
                className="bg-neutral-200 py-1 px-4 w-[200px] rounded-lg"
                placeholder="team name"
              />
            </div>
            <div className="space-y-2">
              <div>Organization</div>
              <input
                value={Organization}
                onChange={(e) => setOrganization(e.target.value)}
                type="text"
                className="bg-neutral-200 py-1 px-4 w-[200px] rounded-lg"
                placeholder="SOftware Company"
              />
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-end space-x-3">
          <button
            disabled={!teamName || !Organization || teamCerating}
            onClick={HandleCreateTeam}
            className="rounded bg-black px-4 py-2 text-white hover:bg-black/80 disabled:bg-neutral-800"
          >
            Create
          </button>
          <button
            onClick={handleCloseDialog}
            className="rounded bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </Dialog>
      <Dialog onClose={handleCloseConfirm} isOpen={isConfirm}>
        <h2 className="text-xl font-bold">Confirm</h2>
        <div>Click Confirm if you really want to delete this team.</div>
        <div className="mt-4 flex justify-end space-x-3">
          <button
            onClick={handleDeleteTeam}
            className="rounded bg-black px-4 py-2 text-white hover:bg-black/80 disabled:bg-neutral-800"
          >
            Confirm
          </button>
          <button
            onClick={handleCloseConfirm}
            className="rounded bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </Dialog>
      <Dialog onClose={handleCloseUpdate} isOpen={isUpdate}>
        <h2 className="text-xl font-bold">Create Team</h2>
        <div>
          <div className="flex gap-10 py-2">
            <div className="space-y-2">
              <div>Team Name</div>
              <input
                value={teamName}
                onChange={(e) => setteamName(e.target.value)}
                type="text"
                className="bg-neutral-200 py-1 px-4 w-[200px] rounded-lg"
                placeholder="team name"
              />
            </div>
            <div className="space-y-2">
              <div>Organization</div>
              <input
                value={Organization}
                onChange={(e) => setOrganization(e.target.value)}
                type="text"
                className="bg-neutral-200 py-1 px-4 w-[200px] rounded-lg"
                placeholder="SOftware Company"
              />
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-end space-x-3">
          <button
            disabled={!teamName || !Organization || teamCerating}
            onClick={HandleUpdateTeam}
            className="rounded bg-black px-4 py-2 text-white hover:bg-black/80 disabled:bg-neutral-800"
          >
            Update
          </button>
          <button
            onClick={handleCloseUpdate}
            className="rounded bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400"
          >
            Calcel
          </button>
        </div>
      </Dialog>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
};

export default Teams;
