import { useState, useEffect, useRef } from "react";
import { useTasks } from "../../context/tsaksContext";
import { useAuth } from "../../context/authContext";
import type { taskType } from "../../context/tsaksContext";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useTeams } from "../../context/teamContext";
import Dialog from "../../components/dialog";
const MyTasks = () => {
  const [SelectedTask, setSelectedTask] = useState<taskType>();
  const [isUpdate, setIsUpdate] = useState(false);
  const [isUpdating, setisUpdating] = useState(false);
  const [UpdatetaskTitle, setUpdatetaskTitle] = useState<string>("");
  const [UpdatetaskProject, setUpdatetaskProject] = useState<string>("");
  const handleCloseUpdate = () => {
    setUpdatetaskTitle("");
    setUpdatetaskProject("");
    setIsUpdate(false);
  };
  const { teams } = useTeams();
  const needFocus = useRef<any>({});
  const [showDrop, setshowDrop] = useState<string | null>(null);
  const { sessionData } = useAuth();
  const [AllTasks, setAllTasks] = useState<taskType[] | null>(null);
  const { tasks, loadingTasks } = useTasks();
  const [tsakStatus, settsakStatus] = useState<string>("all");
  useEffect(() => {
    setAllTasks(tasks);
  }, [loadingTasks]);
  const ChangeStatus = async (status: string, user: string, id: string) => {
    if (sessionData?.email === user) {
      const res = await fetch(
        "https://total-task-backend.onrender.com/updatetask/status",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ status: status, Id: id }),
        }
      ).then((r) => r.json());
      if (res.status === 200) {
        if (AllTasks) {
          const dummy: taskType[] | null = AllTasks?.map((item) => {
            if (item.taskId === id) {
              item.status = status;
              return item;
            }
            return item;
          });
          setAllTasks(dummy);
        }
      } else {
        toast.error("Error during status update", {
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
      toast.error("only Assigned user can change Status", {
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

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        showDrop &&
        needFocus.current[showDrop] &&
        !needFocus.current[showDrop].contains(e.target)
      ) {
        setshowDrop(null);
      }
    };

    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, [showDrop]);
  const handleDeleteTask = async (Id: string, teamID: string) => {
    const team = teams?.find((doc) => doc.teamId === teamID);
    if (team?.createdBy === sessionData?.email) {
      const res = await fetch(
        "https://total-task-backend.onrender.com/deleteTask",
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ Id: Id }),
        }
      ).then((r) => r.json());
      if (res.status === 200) {
        if (AllTasks) {
          const dummy = AllTasks?.filter((doc) => doc.taskId !== Id);
          setAllTasks(dummy);
          console.log(dummy);
        }
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
      toast.error("Only Team Creater can delete Tasks", {
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
  const HandleUpdateTask = async () => {
    setisUpdating(true);
    if (UpdatetaskProject && UpdatetaskTitle) {
      const res = await fetch(
        "https://total-task-backend.onrender.com/updatetask/update",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            Id: SelectedTask?.taskId,
            taskTitle: UpdatetaskTitle,
            projectName: UpdatetaskProject,
          }),
        }
      ).then((r) => r.json());
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
      toast.error("Fill all details", {
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
    setisUpdating(true);
  };
  const Thetasks = tasks;
  const finalData =
    tsakStatus === "all"
      ? tasks
      : Thetasks
      ? Thetasks.filter((doc) => doc.status === tsakStatus)
      : null;

  if (loadingTasks) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col gap-4">
      <h1 className="sticky top-0 z-[10] flex items-center justify-between border-b bg-background/50 p-6 md:text-4xl text-2xl backdrop-blur-lg">
        <span className="font-semibold">My Tasks</span>
      </h1>
      <div className="grid lg:grid-cols-4 grid-cols-2 md:gap-4 gap-2 px-7">
        <div
          onClick={() => settsakStatus("all")}
          className={` ${
            tsakStatus === "all" ? "bg-neutral-400" : "bg-white"
          } flex items-center justify-center md:gap-5 gap-3 xs:px-4 px-1.5 cursor-pointer  lg:h-[50px] h-[35px]`}
        >
          <div className="xl:text-xl">All Tasks</div>
        </div>
        <div
          onClick={() => {
            settsakStatus("pending");
          }}
          className={` ${
            tsakStatus === "pending" ? "bg-neutral-400" : "bg-white"
          } flex items-center justify-center md:gap-5 gap-3 xs:px-4 px-1.5 cursor-pointer  lg:h-[50px] h-[35px]`}
        >
          <div className="w-[20px] h-[20px] bg-red-500 rounded-full"></div>
          <div className="xl:text-xl">Pending</div>
        </div>
        <div
          onClick={() => {
            settsakStatus("inProgress");
          }}
          className={` ${
            tsakStatus === "inProgress" ? "bg-neutral-400" : "bg-white"
          } flex items-center justify-center md:gap-5 gap-3 xs:px-4 px-1.5 cursor-pointer  lg:h-[50px] h-[35px]`}
        >
          <div className="w-[20px] h-[20px] bg-yellow-500 rounded-full"></div>
          <div className="xl:text-xl">In Progress</div>
        </div>
        <div
          onClick={() => {
            settsakStatus("complected");
          }}
          className={` ${
            tsakStatus === "complected" ? "bg-neutral-400" : "bg-white"
          } flex items-center justify-center md:gap-5 gap-3 xs:px-4 px-1.5 cursor-pointer  lg:h-[50px] h-[35px]`}
        >
          <div className="w-[20px] h-[20px] bg-green-500 rounded-full"></div>
          <div className="xl:text-xl">Complated</div>
        </div>
      </div>
      <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7 px-7 pb-10">
        {finalData &&
          finalData.map((item, index) => (
            <div
              key={index}
              className=" bg-white px-4 rounded-xl hover:rounded-[0px] hover:shadow-lg transition-all py-5 cursor-pointer"
            >
              <div className=" pt-3 pb-1 flex items-center justify-between">
                <div
                  className={`w-[20px] h-[20px]  ${
                    item.status === "pending"
                      ? "bg-red-500"
                      : item.status === "inProgress"
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  } rounded-full`}
                ></div>
                <div className="dropdown">
                  <button
                    ref={(el) => {
                      needFocus.current[item.taskId] = el;
                    }}
                    onClick={() => {
                      if (showDrop) {
                        setshowDrop(null);
                        return;
                      }
                      setshowDrop(item.taskId);
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
                      item.taskId === showDrop ? "absolute" : "hidden"
                    } z-20 bg-neutral-100 divide-y divide-gray-200 rounded-lg shadow-2xl w-44`}
                  >
                    <ul
                      className="py-2 text-sm dark:text-gray-200"
                      aria-labelledby="dropdownDefaultButton"
                    >
                      <li
                        onClick={() => {
                          setSelectedTask(item);
                          setIsUpdate(true);
                        }}
                      >
                        <div className="block px-4 text-blue-600 cursor-pointer py-2 hover:bg-gray-200">
                          Update
                        </div>
                      </li>
                      <li
                        onClick={() =>
                          handleDeleteTask(item.taskId, item.teamId)
                        }
                      >
                        <div className="block px-4 text-red-600 cursor-pointer py-2 hover:bg-gray-200">
                          Delete
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className=" py-3 2xl:text-xl text-lg">{item.taskTitle}</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-lg font-semibold">Project</div>
                  <div className="">{item.projectName}</div>
                </div>
                <div className="flex items-center justify-between px-10">
                  <div>Assigned to </div>
                  <div>{item.assignedTo}</div>
                </div>
                <div className="flex items-center justify-between px-10">
                  <div>From team </div>
                  <div>{item.fromTeam}</div>
                </div>
                <div className="flex items-center justify-between gap-2 lg:px-10 px-5">
                  <div>Last Date</div>
                  <div>{item.dueData}</div>
                </div>
                <div className="flex items-center justify-between gap-2 lg:px-10 px-5">
                  <div>Change Statue</div>
                  <div>
                    {" "}
                    <select
                      onChange={(e) => {
                        ChangeStatus(
                          e.target.value,
                          item.assignedTo,
                          item.taskId
                        );
                      }}
                      value={item.status}
                      id="myDropdown"
                      name="mySelection"
                      className="py-1 px-4 border-1 border-neutral-500"
                    >
                      <option value="pending">Pending</option>
                      <option value={"inProgress"}>In Progress</option>
                      <option value={"complected"}>Complected</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <Dialog onClose={handleCloseUpdate} isOpen={isUpdate}>
        <h2 className="text-xl font-bold">Create Team</h2>
        <div>
          <div className="flex gap-10 py-2">
            <div className="space-y-2">
              <div>Task Title</div>
              <input
                value={UpdatetaskTitle}
                onChange={(e) => setUpdatetaskTitle(e.target.value)}
                type="text"
                className="bg-neutral-200 py-1 px-4 w-[200px] rounded-lg"
                placeholder="Task Title"
              />
            </div>
            <div className="space-y-2">
              <div>Project</div>
              <input
                value={UpdatetaskProject}
                onChange={(e) => setUpdatetaskProject(e.target.value)}
                type="text"
                className="bg-neutral-200 py-1 px-4 w-[200px] rounded-lg"
                placeholder="Project Name"
              />
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-end space-x-3">
          <button
            disabled={!UpdatetaskTitle || !UpdatetaskProject || isUpdating}
            onClick={HandleUpdateTask}
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

export default MyTasks;
