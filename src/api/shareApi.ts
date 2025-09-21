import axios from "axios";

const API_URL = "http://localhost:3000";
//@ts-ignore
export const toggleShare = async (token: string,id, share: boolean) => {
  const res = await axios.post(
    `${API_URL}/api/v1/content/brain/share`,
    { share ,id},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export const getPublicBrain = async (shareLink: string) => {
  const res = await axios.get(`${API_URL}/brain/${shareLink}`);
  return res.data;
};
