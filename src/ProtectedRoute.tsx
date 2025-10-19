import React from 'react'
import { Navigate } from "react-router-dom";
import { useAuth } from './context/authContext';
interface Props {
    
}


export default function ProtectedRoute({ children }: {children: React.ReactNode}) {
  const { sessionData , loading} = useAuth();
if(loading){
    return <div>Loading.....</div>
}
  if (!sessionData) {
    // Not logged in → redirect to login
    return <Navigate to="/login" replace />;
  }
  // Logged in → allow access
  return children;
}
