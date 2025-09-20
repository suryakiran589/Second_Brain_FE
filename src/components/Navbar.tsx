import { useAuth } from "../Contexts/authContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const auth = useAuth(); // token, setToken
  const navigate = useNavigate();

  const handleLogout = () => {
    auth?.setToken(null); // clears token in context
    localStorage.removeItem("token"); // clears from storage
  };

  return (
    <nav className="flex justify-between items-center bg-gradient-to-r from-indigo-600 to-violet-600 p-4 text-white shadow-md">
  {/* App Name / Logo */}
  <h1
    className="text-xl font-extrabold tracking-wide cursor-pointer hover:text-gray-200 transition"
    onClick={() => navigate("/")}
  >
    BrainBox
  </h1>

  {/* Right Side Buttons */}
  <div>
    {auth?.token && (
      <button
        onClick={handleLogout}
        className="bg-white text-indigo-700 font-medium px-4 py-2 rounded-lg shadow hover:bg-gray-100 hover:text-violet-700 transition cursor-pointer"
      >
        Logout
      </button>
    )}
  </div>
</nav> 
  );
}
