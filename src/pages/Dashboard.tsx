import { useEffect, useState } from "react";
import { addContent, deleteContent, getUserContent } from "../api/ContentApi";
// import  from "jsonwebtoken";
import { toggleShare } from "../api/shareApi";
import ContentCard from "../components/ContentCard";
import type { Content } from "../types";

export default function Dashboard() {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [shareLink, setShareLink] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [category,setCategory] = useState("")
  const token = localStorage.getItem("token") || "";
  const [brains, setBrains] = useState<Content[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [description, setDescription] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return; // user not logged in yet

    (async () => {
      const brainsData = await getUserContent();
      setBrains(brainsData);
      console.log(brains);
    })();
  }, [refreshTrigger]);

  async function handleDelete(id: string) {
    await deleteContent(id);
    setRefreshTrigger(!refreshTrigger);
  }

  async function handleAdd() {
    if (!title || !link) return alert("Please fill all fields");
    await addContent(token, title, link, description,category);
    alert("Content added");
    setTitle("");
    setLink("");
    setCategory("")
    setDescription("");
    setShowModal(false);
    setRefreshTrigger(!refreshTrigger);
  }

  const handleShareToggle = async () => {
    const data = await toggleShare(token, shareLink === "");
    if (data.hash) setShareLink(data.hash);
    else setShareLink("");
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">My Brains</h2>
        <div className="flex gap-3">
          <button
            onClick={() => setShowModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold cursor-pointer"
          >
            + Add Brain
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-semibold cursor-pointer ${
              shareLink
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-purple-600 hover:bg-purple-700 text-white"
            }`}
            onClick={handleShareToggle}
          >
            {shareLink ? "Unshare Brain" : "Share Brain"}
          </button>
        </div>
      </div>

      

      {/* Brain List */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        {brains.map((brain) => (
          
          <ContentCard
            key={brain._id}
            id={brain._id}
            title={brain.title}
            link={brain.link}
            description={brain.description}
            createdAt={brain.createdAt}
            onDelete={handleDelete}
            category={brain.category}
            refresh={() => {
              setRefreshTrigger(!refreshTrigger);
            }}
            />
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Brain</h2>
            <input
              className="border p-2 w-full mb-3 rounded"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className="border p-2 w-full mb-3 rounded"
              placeholder="Link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
            <textarea
              className="border p-2 w-full mb-3 rounded"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <select
              className="border p-3 w-full mb-3 rounded-lg"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="math">Math</option>
              <option value="science">Science</option>
              <option value="coding">Coding</option>
            </select>

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                onClick={handleAdd}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
