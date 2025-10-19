import React, { createContext, useContext, useState, useEffect } from "react";

export type taskType = {
  taskId: string;
  taskTitle: string;
  projectName: string;
  assignedTo: string;
  fromTeam: string;
  teamId: string;
  status: string;
  dueData: string;
};
type teamcontexttype = {
  tasks: taskType[] | null;
  loadingTasks: boolean;
};
const initialValue: teamcontexttype = {
  tasks: null,
  loadingTasks: true,
};
const TeamContext = createContext<teamcontexttype>(initialValue);

type props = {
  children: React.ReactNode;
};
export const TaskProvider = ({ children }: props) => {
  const [teamData, setteamData] = useState<taskType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    fetch("https://total-task-backend.onrender.com/get/task/byEmail", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setteamData(data))
      .catch((err) => console.error("Auth check failed:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <TeamContext.Provider value={{ tasks: teamData, loadingTasks: loading }}>
      {children}
    </TeamContext.Provider>
  );
};

export const useTasks = () => {
  const allTasks = useContext(TeamContext);
  return allTasks;
};
