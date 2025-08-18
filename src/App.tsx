import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./pages/Dashboard";
import PublicBrain from "./pages/PublicBrain";
import {  useState } from "react";
import { AuthContext } from "./Contexts/authContext";

export default function App() {

 
  function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setTokenState] = useState<string | null>(localStorage.getItem("token"));

  const setToken = (t: string | null) => {
    if (t) {
      localStorage.setItem("token", t);
    } else {
      localStorage.removeItem("token");
    }
    setTokenState(t); // re-renders any component using token
  };

  return (

    <AuthContext.Provider value={{ token, setToken}}>
      {children}
    </AuthContext.Provider>
  );
}

  return (
    <BrowserRouter>
    <AuthProvider>

      <Navbar />
      <Routes>
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/brain/:shareLink" element={<PublicBrain />} />
      </Routes>
    </AuthProvider>
    </BrowserRouter>
  );
}
