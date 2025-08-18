import { useEffect, useState } from "react";
import { getPublicBrain } from "../api/shareApi";
import { useParams } from "react-router-dom";
import ContentCard from "../components/ContentCard";

export default function PublicBrain() {
  const { shareLink } = useParams();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (shareLink) {
      getPublicBrain(shareLink).then(setData);
    }
  }, [shareLink]);

  if (!data) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{data.username}'s Brain</h2>
      <div className="space-y-4">
        {data.content.map((c: any, i: number) => (
          <ContentCard key={i} title={c.title} link={c.link} />
        ))}
      </div>
    </div>
  );
}
