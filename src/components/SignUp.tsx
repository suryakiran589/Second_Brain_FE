import { useState } from "react";
import { signupUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/authContext";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {setToken}=useAuth()

  const handleSignup = async () => {
    try {
      const data =await signupUser(username,name, email, password);
      localStorage.setItem("token", data.token);
      setToken(data.token)


      navigate("/");
    } catch {
      alert("Signup failed");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      <input className="border p-2 w-full mb-3" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input className="border p-2 w-full mb-3" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} />
      <input className="border p-2 w-full mb-3" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input className="border p-2 w-full mb-3" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={handleSignup}>Signup</button>
    </div>
  );
}

