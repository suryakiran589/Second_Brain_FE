import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PublicBrainDetails() {
  const { hash } = useParams();
  const [brain, setBrain] = useState<any>(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL
}/content/brain/public/${hash}`)
      .then(res => setBrain(res.data));
  }, [hash]);

  if (!brain) return <p>Loading...</p>;

  return (
    <div>
      <h2>{brain.title}</h2>
      <p>{brain.description}</p>
      {brain.link && <a href={brain.link}>Visit Resource</a>}
    </div>
  );
}

export default PublicBrainDetails