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
    <nav className="flex justify-between items-center bg-gray-800 p-4 text-white">
      <h1 className="text-lg font-bold cursor-pointer" onClick={() => navigate("/")}>
        My App
      </h1>

      <div>
        {auth?.token && (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        ) }
      </div>
    </nav>
  );
}
