import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


function BrainDetails() {
  const { id } = useParams();
  console.log(id)
  const [brain, setBrain] = useState<any>(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/v1/content/brains/${id}`).then((res) => {
        console.log(res)
      setBrain(res.data.data);
    });
  }, [id]);

  if (!brain) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-12 p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
  {/* Title */}
  <h2 className="text-3xl font-extrabold text-gray-800 mb-4">{brain.title}</h2>

  {/* Description */}
  <p className="text-gray-700 text-lg mb-6">{brain.description}</p>

  {/* External Link */}
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

  {/* Share Link Button */}
  <button
    onClick={() => {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!"); // optional feedback
    }}
    className="mt-4 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-md hover:bg-indigo-700 transition"
  >
    Copy Share Link
  </button>
</div>

  );
}

export default BrainDetails