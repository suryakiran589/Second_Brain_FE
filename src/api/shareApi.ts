import axios from "axios";

const API_URL = "http://localhost:3000";

export const toggleShare = async (token: string, share: boolean) => {
  const res = await axios.post(
    `${API_URL}/brain/share`,
    { share },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export const getPublicBrain = async (shareLink: string) => {
  const res = await axios.get(`${API_URL}/brain/${shareLink}`);
  return res.data;
};
