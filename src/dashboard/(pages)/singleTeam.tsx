import { useParams } from "react-router";
import { useTeams } from "../../context/teamContext";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useAuth } from "../../context/authContext";
import type { TeamType } from "../../context/teamContext";
import Dialog from "../../components/dialog";


const Team = () => {
  const [TaskDate, setTaskDate] = useState("");
  const [AssignTask, setAssignTask] = useState("");
  const [TaskProject, setTaskProject] = useState("");
  const [TaskTitle, setTaskTitle] = useState("");
  const [name, setname] = useState("");
  const [role, setrole] = useState("");
  const [email, setemail] = useState("");
  const [Adding, setAdding] = useState(false);
  const [selectedMember, setselectedMember] = useState<string>("");
  const [isConfirm, setIsConfirm] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isTsakOpen, setIsTaskOpen] = useState(false);
  const { productId } = useParams();
  const { teams, loadingTeams } = useTeams();
  const { sessionData } = useAuth();
  const [CurrentTeam, setCurrentTeam] = useState<TeamType | null>(null);
  useEffect(() => {
    if (teams) {
      const demo = teams.find((item) => item.teamId === productId);
      console.log(demo);
      if (demo) {
        setCurrentTeam(demo);
      }
    }
  }, [loadingTeams]);
  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);
  const handleOpenTask = () => setIsTaskOpen(true);
  const handleCloseTask = () => setIsTaskOpen(false);
  const handleOpenConfirm = () => setIsConfirm(true);
  const handleCloseConfirm = () => setIsConfirm(false);
  if (loadingTeams) {
    return <div>Loading....</div>;
  }
  const HandleAddmember = async () => {
    setAdding(true);
    if (name || role || email) {
      const addNew = [...(CurrentTeam?.members ?? []), { name, email, role }];
      const res = await fetch("https://total-task-backend.onrender.com/addteam", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ members: addNew, Id: CurrentTeam?.teamId }),
      }).then((e) => e.json());
      console.log(res);
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
      } else {
        window.location.reload();
      }
    } else {
      toast.error("Fill all Details", {
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
    setAdding(false);
    setIsDialogOpen(false);
  };
  const handelDeleteMember = async () => {
    console.log(selectedMember);
    const addNew = CurrentTeam?.members?.filter(
      (item) => item.email != selectedMember
    );
    console.log(addNew);
    if (sessionData?.email === CurrentTeam?.createdBy) {
      if (selectedMember !== CurrentTeam?.createdBy) {
        const res = await fetch("https://total-task-backend.onrender.com/addteam", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ members: addNew, Id: CurrentTeam?.teamId }),
        }).then((e) => e.json());
        console.log(res);
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
        } else {
          window.location.reload();
        }
      } else {
        setIsConfirm(false);
        toast.error("Team creater cannot Delete itself", {
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
  const handleCreateTask = async () => {
    if (TaskTitle || TaskDate || TaskProject || AssignTask) {
      const newTask = {
        taskTitle: TaskTitle,
        projectName: TaskProject,
        assignedTo: AssignTask,
        dueData: TaskDate,
        status: "pending",
        fromTeam: CurrentTeam?.teamName,
        teamId: CurrentTeam?.teamId,
      };
      const res = await fetch("https://total-task-backend.onrender.com/createtask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ allData: newTask }),
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
      toast.error("Please Fill all Details", {
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
    setIsTaskOpen(false);
  };
  return (
    <div>
      {CurrentTeam ? (
        <div className="space-y-4 pb-10">
          <div>
            <h1 className="sticky top-0 z-[10] flex items-center justify-between border-b bg-background/50 p-6 md:text-4xl text-2xl backdrop-blur-lg">
              <span className="font-semibold">{CurrentTeam.teamName}</span>
              <div className="flex gap-2 md:flex-row flex-col">
                <Link to={`/teamTasks/${CurrentTeam.teamId}`}>
                <button className="md:text-xl text-lg py-2 md:px-4 px-3 bg-neutral-400 rounded-xl hover:scale-105 cursor-pointer transition-all hover:bg-neutral-500">
                  See Tasks
                </button>                
                </Link>
                <button
                  onClick={handleOpenTask}
                  className="md:text-xl text-lg py-2 md:px-4 px-3 bg-neutral-400 rounded-xl hover:scale-105 cursor-pointer transition-all hover:bg-neutral-500"
                >
                  Create Task
                </button>

                <button
                  onClick={handleOpenDialog}
                  className="md:text-xl text-lg font-semibold py-2 md:px-4 px-3 bg-[#FB6201] rounded-xl hover:scale-105 cursor-pointer transition-all hover:bg-[#FB6201]/80"
                >
                  Add Member
                </button>
              </div>
            </h1>
          </div>
          <div className="px-10">
            <div className="md:text-xl font-semibold">Team Members</div>
            <div className="">
              <div className="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 bg-white 2xl:px-5 px-3 gap-2 py-1 font-semibold border-1 border-neutral-500">
                <div className="py-2">Full Name</div>
                <div className="py-2 lg:block hidden">Email</div>
                <div className="py-2 xl:block hidden">Role</div>
                <div className="py-2 md:text-center text-right">Actions</div>
              </div>
              {CurrentTeam.members &&
                CurrentTeam.members.map((item, index) => (
                  <div
                    key={index}
                    className="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2  bg-white 2xl:px-5 px-3 gap-2 border-b-1 py-1.5 items-center border-x-1 border-neutral-500"
                  >
                    <div className="flex items-center md:gap-3 gap-2">
                      <div className="bg-green-400 rounded-full min-w-[40px]  min-h-[40px] flex items-center justify-center text-[20px] font-semibold">
                        {item.name[0]}
                      </div>
                      <div className="xl:text-xl">{item.name}</div>
                    </div>
                    <div className="py-2 lg:block hidden">{item.email}</div>
                    <div className="py-2 xl:block hidden">{item.role}</div>
                    <div
                      onClick={() => {
                        setselectedMember(item.email);
                        handleOpenConfirm();
                      }}
                      className="py-2 text-red-600 cursor-pointer md:text-center text-right"
                    >
                      Delete
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-xl py-4 font-semibold text-center">
          This Team no longer available
        </div>
      )}
      <Dialog isOpen={isDialogOpen} onClose={handleCloseDialog}>
        <h2 className="text-xl font-bold">Add Member</h2>
        <div>
          <div className="flex gap-10 py-2">
            <div className="space-y-2">
              <div>Full Name</div>
              <input
                value={name}
                onChange={(e) => setname(e.target.value)}
                type="text"
                className="bg-neutral-200 py-1 px-4 w-[200px] rounded-lg"
                placeholder="Jhon Doe"
              />
            </div>
            <div className="space-y-2">
              <div>Email</div>
              <input
                value={email}
                onChange={(e) => setemail(e.target.value)}
                type="text"
                className="bg-neutral-200 py-1 px-4 w-[200px] rounded-lg"
                placeholder="example@gamil.com"
              />
            </div>
          </div>
          <div className="flex gap-10 py-2">
            <div className="space-y-2">
              <div>Role</div>
              <input
                value={role}
                onChange={(e) => setrole(e.target.value)}
                type="text"
                className="bg-neutral-200 py-1 px-4 w-[200px] rounded-lg"
                placeholder="Deisgner"
              />
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-end space-x-3">
          <button
            disabled={!name || !role || !email || Adding}
            onClick={HandleAddmember}
            className="rounded bg-black px-4 py-2 text-white hover:bg-black/80 disabled:bg-neutral-800"
          >
            Add
          </button>
          <button
            onClick={handleCloseDialog}
            className="rounded bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </Dialog>
      <Dialog onClose={handleCloseConfirm} isOpen={isConfirm}>
        <h2 className="text-xl font-bold">Confirm</h2>
        <div>Click Confirm if you really want to delete thsi Member</div>
        <div className="mt-4 flex justify-end space-x-3">
          <button
            onClick={handelDeleteMember}
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
      <Dialog isOpen={isTsakOpen} onClose={handleCloseTask}>
        <h2 className="text-xl font-bold">Add Member</h2>
        <div>
          <div className="flex gap-10 py-2">
            <div className="space-y-2">
              <div>Title</div>
              <input
                value={TaskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                type="text"
                className="bg-neutral-200 py-1 px-4 w-[415px] rounded-lg"
                placeholder="Title"
              />
            </div>
          </div>
          <div className="flex gap-[15px] py-2">
            <div className="space-y-2">
              <div>Project Name</div>
              <input
                value={TaskProject}
                onChange={(e) => setTaskProject(e.target.value)}
                type="text"
                className="bg-neutral-200 py-1 px-4 w-[200px] rounded-lg"
                placeholder="Jhon Doe"
              />
            </div>
            <div className="space-y-2">
              <div>Due date</div>
              <input
                onChange={(e) => {
                  setTaskDate(e.target.value);
                  console.log(TaskDate);
                }}
                type="date"
                className="bg-neutral-200 py-1 px-4 w-[200px] rounded-lg"
                placeholder="example@gamil.com"
              />
            </div>
          </div>
          <div className="flex gap-[15px] py-2">
            <div className="space-y-2">
              <div>Assigned to</div>
              <select
                onChange={(e) => {
                  setAssignTask(e.target.value);
                  console.log(AssignTask);
                }}
                id="myDropdown"
                name="mySelection"
                className="py-1 px-4 border-1 border-neutral-500"
              >
                <option value="">Select</option>
                {CurrentTeam?.members &&
                  CurrentTeam?.members.map((item, index) => (
                    <option key={index} value={item.email}>
                      {item.name}/{item.role}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-end space-x-3">
          <button
            onClick={handleCreateTask}
            className="rounded bg-black px-4 py-2 text-white hover:bg-black/80 disabled:bg-neutral-800"
          >
            Create
          </button>
          <button
            onClick={handleCloseTask}
            className="rounded bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400"
          >
            Cancel
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

export default Team;
