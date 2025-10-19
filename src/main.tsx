import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./dashboard/(pages)/Dashboard.tsx";
import Teams from "./dashboard/(pages)/Teams.tsx";
import Sidebar from "./dashboard/components/Sidebar.tsx";
import Infobar from "./dashboard/components/infobar.tsx";
import MyTasks from "./dashboard/(pages)/tasks.tsx";
import LoginPage from "./Login/Page.tsx";
import { AuthProvider } from "./context/authContext.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import { TeamProvider } from "./context/teamContext.tsx";
import { TaskProvider } from "./context/tsaksContext.tsx";
import Team from "./dashboard/(pages)/singleTeam.tsx";
import TeamTasks from "./dashboard/(pages)/teamTasks.tsx";
import { CookiesProvider } from "react-cookie";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: (
      <div className="flex overflow-hidden h-screen">
        <Sidebar />
        <div className="w-full bg-neutral-200 overflow-y-scroll">
          <Infobar />
          <div className="w-full ">
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          </div>
        </div>
      </div>
    ),
  },
  {
    path: "/teams",
    element: (
      <div className="flex overflow-hidden h-screen ">
        <Sidebar />
        <div className="w-full bg-neutral-200 overflow-y-scroll">
          <Infobar />
          <div className="w-full ">
            <ProtectedRoute>
              <Teams />
            </ProtectedRoute>
          </div>
        </div>
      </div>
    ),
  },
  {
    path: "/team/:productId",
    element: (
      <div className="flex overflow-hidden h-screen">
        <Sidebar />
        <div className="w-full bg-neutral-200 overflow-y-scroll">
          <Infobar />
          <div className="w-full ">
            <ProtectedRoute>
              <Team />
            </ProtectedRoute>
          </div>
        </div>
      </div>
    ),
  },
  {
    path: "/mytasks",
    element: (
      <div className="flex overflow-hidden h-screen">
        <Sidebar />
        <div className="w-full bg-neutral-200 overflow-y-scroll">
          <Infobar />
          <div className="w-full ">
            <ProtectedRoute>
              <MyTasks />
            </ProtectedRoute>
          </div>
        </div>
      </div>
    ),
  },
  {
    path: "/teamTasks/:TeamId",
    element: (
      <div className="flex overflow-hidden h-screen">
        <Sidebar />
        <div className="w-full bg-neutral-200 overflow-y-scroll">
          <Infobar />
          <div className="w-full ">
            <ProtectedRoute>
              <TeamTasks />
            </ProtectedRoute>
          </div>
        </div>
      </div>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CookiesProvider>
      <AuthProvider>
        <TeamProvider>
          <TaskProvider>
            <RouterProvider router={router} />
          </TaskProvider>
        </TeamProvider>
      </AuthProvider>
    </CookiesProvider>
  </StrictMode>
);
