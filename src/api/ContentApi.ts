import axios from "axios";

const API_URL = "http://localhost:3000/api/v1";

export const addContent = async (token: string, title: string, link: string,description:string,category:string) => {
  const res = await axios.post(
    `${API_URL}/content`,
    { title, link,description,category },
    { headers: { authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export async function getUserContent() {
  try {
    const token = localStorage.getItem("token");


    const res = await axios.get(`${API_URL}/content`, {
      headers: {
        Authorization: `Bearer ${token}`, // JWT authentication
      },
    });

    return res.data.result; // Array of content objects
  } catch (err) {
    // console.error("Error fetching user content:", err);
    // throw err;
  }
}

export async function deleteContent(id:string){
  const token = localStorage.getItem("token");
  await axios.delete(`${API_URL}/content/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // JWT authentication
      },})
}

export async function updateContent(token: string | null,id:string, title: string, link: string,description:string){
  await axios.put(
    `${API_URL}/content/${id}`,
    { title, link,description },
    { headers: { authorization: `Bearer ${token}` } }
  );
}

