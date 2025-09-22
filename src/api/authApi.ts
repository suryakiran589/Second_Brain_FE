import axios from "axios";

// const API_URL = "http://localhost:3000/api/v1"; // change if needed

export const loginUser = async (email: string, password: string) => {
  const res = await axios.post(`${import.meta.env.VITE_API_URL}/signin`, { email, password });
  // console.log(res.data)
  return res.data;
};

export const signupUser = async (username: string,name:string, email: string, password: string) => {
  const res = await axios.post(`${import.meta.env.VITE_API_URL}/signup`, { username,name, email, password });
  return res.data;
};
