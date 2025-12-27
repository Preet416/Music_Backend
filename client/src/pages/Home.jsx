import React from "react";
import { usePlayer } from "../context/PlayerContext";

const Home = () => {
  const { tracks, playTrack } = usePlayer();

  const handleClick = (t) => {
    playTrack(t);
  };

  return (
    <div className="flex-1 px-10 py-6 text-sm">
      <h2 className="text-2xl font-semibold mb-4">Home</h2>

      <p className="text-slate-300 mb-4">
        Tracks loaded from Supabase via Express:
      </p>

      {!tracks.length ? (
        <div className="text-slate-400">Loading tracks...</div>
      ) : (
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
          {tracks.map((t) => (
            <li
              key={t.id}
              onClick={() => handleClick(t)}
              className="rounded-lg border border-slate-800 bg-slate-900/80 px-4 py-3 hover:border-emerald-500 cursor-pointer"
            >
              <div className="font-medium mb-1">{t.title}</div>
              <div className="text-xs text-slate-400">{t.artist}</div>
              <div className="text-[0.7rem] text-slate-500 mt-1">
                Click to play
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
