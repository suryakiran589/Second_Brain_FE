import { useEffect, useState } from "react";
import { loginUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/authContext";
import type { AxiosError } from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const {setToken}=useAuth()


  useEffect(()=>{
    if(localStorage.getItem("token")){
      navigate("/")
    }
  },[])

  const handleLogin = async (e:React.FormEvent) => {
    e.preventDefault()
    try {
      const data = await loginUser(email, password);
      // console.log(data)
      localStorage.setItem("token", data.token);
      setToken(data.token)

      navigate("/");
    } catch(err) {
      // console.log(error.response.data.message)
      const error = err as AxiosError<{ success: boolean; message: string }>;

      if (error.response) {
        // ✅ This is where your backend message is
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h1>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition duration-300"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <a href="/signup" className="text-indigo-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
