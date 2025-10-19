import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useEffect, useState } from "react";
import Dialog from "../../components/dialog";
interface Props {}

const Dashboard = (props: Props) => {
  const {sessionData } = useAuth();
const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);
  useEffect(() => {
    console.log(sessionData)
  }, [])
  
  return (
    <div className="space-y-4">
      <h1 className="sticky top-0 z-[10] flex items-center justify-between border-b bg-background/50 p-6 md:text-4xl text-2xl backdrop-blur-lg">
        <span className="font-semibold">Dashboard</span>
      </h1>
      <div className="text-xl text-center grid xl:grid-cols-3 grid-cols-2 md:gap-20 xs:gap-15 gap-8 justify-center items-center pt-20 pb-5 2xl:w-[1200px] xl:w-[900px] w-full justify-self-center px-5">
        <div className="w-[100%] should 2xl:h-[333.2px] xl:h-[233.3px] md:max-h-[34.18vw] xs:max-h-[26vw] max-h-[35vw]  rounded-full border-neutral-600 border-1 flex flex-col items-center justify-between py-15 hover:bg-neutral-300 hover:scale-105 transition-all hover:translate-y-[-15px] cursor-pointer">
          <div className="md:text-2xl text-xl font-semibold">Teams</div>
          <div className="md:text-8xl xs:text-5xl text-2xl font-semibold">
            12
          </div>
        </div>
        <div className="w-[100%] should 2xl:h-[333.2px] xl:h-[233.3px] md:max-h-[34.18vw] xs:max-h-[26vw] max-h-[35vw] rounded-full border-neutral-600 border-1 flex flex-col items-center justify-between py-15 hover:bg-neutral-300 hover:scale-105 transition-all hover:translate-y-[-15px] cursor-pointer">
          <div className="md:text-2xl text-xl font-semibold">My Tasks</div>
          <div className="md:text-8xl xs:text-5xl text-2xl font-semibold">
            12
          </div>
        </div>
        <div className="w-[100%] should 2xl:h-[333.2px] xl:h-[233.3px] md:max-h-[34.18vw] xs:max-h-[26vw] max-h-[35vw] rounded-full border-neutral-600 border-1 flex flex-col items-center justify-between py-15 hover:bg-neutral-300 hover:scale-105 transition-all hover:translate-y-[-15px] cursor-pointer">
          <div className="md:text-2xl text-xl font-semibold">Complated</div>
          <div className="md:text-8xl xs:text-5xl text-2xl font-semibold">
            12
          </div>
        </div>
        <div className="w-[100%] should 2xl:h-[333.2px] xl:h-[233.3px] md:max-h-[34.18vw] xs:max-h-[26vw] max-h-[35vw] rounded-full border-neutral-600 border-1 flex flex-col items-center justify-between py-15 hover:bg-neutral-300 hover:scale-105 transition-all hover:translate-y-[-15px] cursor-pointer">
          <div className="md:text-2xl text-xl font-semibold">Pending</div>
          <div className="md:text-8xl xs:text-5xl text-2xl font-semibold">
            12
          </div>
        </div>
        <div className="w-[100%] should 2xl:h-[333.2px] xl:h-[233.3px] md:max-h-[34.18vw] xs:max-h-[26vw] max-h-[35vw] rounded-full border-neutral-600 border-1 flex flex-col items-center justify-between py-15 hover:bg-neutral-300 hover:scale-105 transition-all hover:translate-y-[-15px] cursor-pointer">
          <div className="md:text-2xl text-xl font-semibold">In Progress</div>
          <div className="md:text-8xl xs:text-5xl text-2xl font-semibold">
            12
          </div>
        </div>
      </div>
      <div className="text-xl text-center flex gap-15 justify-center items-center pt-5 pb-20 w-full px-4"></div>
    </div>
  );
};

export default Dashboard;
