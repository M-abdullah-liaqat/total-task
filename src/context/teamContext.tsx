import React, { createContext, useContext, useState, useEffect } from "react";

type teamMembers = {
  email: string;
  name: string;
  role: string;
};
export interface TeamType  {
  teamId: string;
  teamName: string;
  organization: string;
  members: teamMembers[] | null;
  createdBy: string;
};
type teamcontexttype = {
  teams: TeamType[] | null;
  loadingTeams: boolean;
};
const initialValue: teamcontexttype = {
  teams: null,
  loadingTeams: true,
};
const TeamContext = createContext<teamcontexttype>(initialValue);

type props = {
  children: React.ReactNode;
};
export const TeamProvider = ({ children }: props) => {
  const [teamData, setteamData] = useState<TeamType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    fetch(`https://total-task-backend.onrender.com/get/team`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setteamData(data))
      .catch((err) => console.error("Auth check failed:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <TeamContext.Provider value={{ teams: teamData, loadingTeams: loading }}>
      {children}
    </TeamContext.Provider>
  );
};

export const useTeams = () => {
  const allTeams = useContext(TeamContext);
  return allTeams;
};
