import React from "react";
import { createContext, useContext, useState, useEffect } from "react";

type sessiondatatype = {
  username: string;
  email: string;
};

type authType = {
  status: number;
  sessionData: sessiondatatype | null;
  loading: boolean;
};

const initialValue: authType = {
  status: 0,
  sessionData: null,
  loading: true,
};

const AuthContext = createContext<authType>(initialValue);

type ConnectionWithChildProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: ConnectionWithChildProps) => {
  const [resData, setresData] = useState<authType>(initialValue);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
   fetch(`https://total-task-backend.onrender.com/check-session`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setresData(data);
        }
      })
      .catch((err) => console.error("Auth check failed:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        status: resData.status,
        sessionData: resData.sessionData,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const allData = useContext(AuthContext);
  return allData;
};
