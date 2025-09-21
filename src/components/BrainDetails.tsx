import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toggleShare } from "../api/shareApi";

function BrainDetails() {
  const { id } = useParams();
  const [brain, setBrain] = useState<any>(null);
  const [shareLink, setShareLink] = useState("");

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL
}/content/brains/${id}`).then((res) => {
      setBrain(res.data.data);
      setShareLink(res.data.data.shareLink || ""); // <-- set shareLink after fetching
    });
  }, [id]);

  const handleShareToggle = async (id:any) => {
    const token = localStorage.getItem("token") || "";
    const data = await toggleShare(token, id, shareLink === "");
    console.log(data)
    if (data.hash) setShareLink(data.hash);
    else setShareLink("");
  };

  const handleCopyLink = () => {
    if (!shareLink) return alert("This brain is private. Make it public first.");
    navigator.clipboard.writeText(`${window.location.origin}/brain/public/${shareLink}`);
    alert("Link copied to clipboard!");
  };

  if (!brain) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-12 p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-4">{brain.title}</h2>
      <p className="text-gray-700 text-lg mb-6">{brain.description}</p>

      {brain.link && (
        <a
          href={brain.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-indigo-600 font-medium mb-6 hover:text-indigo-800 transition-colors"
        >
          Visit Resource &rarr;
        </a>
      )}

      {/* Share Link Buttons */}
      <div className="flex gap-2 mt-2">
        <button
          onClick={() =>{handleShareToggle(brain._id)}}
          className={`px-3 py-1 rounded ${
            shareLink ? "bg-red-500 text-white" : "bg-purple-600 text-white"
          }`}
        >
          {shareLink ? "Make Private" : "Make Public"}
        </button>
        <button
          onClick={handleCopyLink}
          className="px-3 py-1 bg-indigo-600 text-white rounded"
        >
          Copy Link
        </button>
      </div>
    </div>
  );
}

export default BrainDetails;
