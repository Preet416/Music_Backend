import React, { useEffect, useState } from "react";
import { usePlayer } from "../context/PlayerContext";

const Podcast = () => {
  const { playTrack } = usePlayer();
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPodcasts = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/podcasts");
        const data = await res.json();
        setEpisodes(data);
      } catch (err) {
        console.error("Failed to load podcasts", err);
      } finally {
        setLoading(false);
      }
    };

    loadPodcasts();
  }, []);

  const handlePlay = (ep) => {
    // podcast episode bhi same player se chalega
    playTrack(ep);
  };

  return (
    <div className="p-6 space-y-4 text-sm">
      <h2 className="text-2xl font-semibold mb-2">Podcasts</h2>
      <p className="text-slate-300">
        Browse podcast episodes and play them with the same player.
      </p>

      {loading && <div className="text-slate-400 text-xs">Loading...</div>}

      {!loading && episodes.length === 0 && (
        <div className="text-slate-400 text-xs">No podcast episodes yet.</div>
      )}

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {episodes.map((ep) => (
          <li
            key={ep.id}
            onClick={() => handlePlay(ep)}
            className="rounded-lg border border-slate-800 bg-slate-900/80 px-4 py-3 hover:border-emerald-500 cursor-pointer flex flex-col gap-2"
          >
            {ep.coverUrl && (
              <img
                src={ep.coverUrl}
                alt={ep.title}
                className="w-full h-40 object-cover rounded-md"
              />
            )}

            <div className="font-medium">{ep.title}</div>
            <div className="text-xs text-slate-400">
              {ep.host || "Unknown host"}
            </div>
            {ep.description && (
              <div className="text-[0.7rem] text-slate-500 line-clamp-2">
                {ep.description}
              </div>
            )}

            <div className="text-[0.7rem] text-slate-500 mt-1">
              Click to play episode
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Podcast;
