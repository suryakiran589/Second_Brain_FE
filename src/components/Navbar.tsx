import { useAuth } from "../Contexts/authContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const auth = useAuth(); // token, setToken
  const navigate = useNavigate();

  const handleLogout = () => {
    auth?.setToken(null); // clears token in context
    localStorage.removeItem("token"); // clears from storage
    navigate("/");
  };

  return (
    <nav className="flex justify-between items-center bg-gradient-to-r from-blue-600 to-cyan-500
 px-8 py-4 text-white shadow-md">
      {/* App Name / Logo */}
      <h1
        className="text-2xl font-extrabold tracking-wide cursor-pointer hover:opacity-90 transition"
        onClick={() => navigate("/")}
      >
        BrainBox
      </h1>

      {/* Navigation / Actions */}
      <div className="flex items-center gap-4">
        {auth?.token && (
          <>
            {/* Example future nav links */}
            {/* <button
              onClick={() => navigate("/")}
              className="hidden sm:inline text-sm font-medium hover:underline"
            >
              My Brains
            </button>
            <button
              onClick={() => navigate("/profile")}
              className="hidden sm:inline text-sm font-medium hover:underline"
            >
              Profile
            </button> */}

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="bg-white text-indigo-700 font-semibold px-4 py-2 rounded-lg shadow hover:bg-gray-100 hover:text-violet-700 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
