import React from "react";
import { usePlayer } from "../../context/PlayerContext";
import WaveformBar from "./WaveformBar";

const PlayerBar = () => {
  const { currentTrack, isPlaying, togglePlay } = usePlayer();

  return (
    <div className="h-24 border-t border-slate-800 bg-slate-900 px-4 flex items-center gap-4 text-sm">
      {/* ✅ Cover image */}
      {currentTrack && (
        <img
          src={currentTrack.coverUrl}
          alt={currentTrack.title}
          className="w-14 h-14 rounded-md object-cover"
        />
      )}

      <div className="flex flex-col min-w-0">
        <span className="font-medium truncate">
          {currentTrack ? currentTrack.title : "Nothing playing"}
        </span>
        <span className="text-xs text-slate-400 truncate">
          {currentTrack ? currentTrack.artist : "Select a track to start"}
        </span>
      </div>

      <button
        onClick={togglePlay}
        className="px-3 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-semibold"
        disabled={!currentTrack}
      >
        {isPlaying ? "Pause" : "Play"}
      </button>

      <div className="flex-1 h-10 mx-4 rounded bg-slate-800/80 overflow-hidden">
        {currentTrack && <WaveformBar />}
      </div>

      {/* audio element that both PlayerContext and WaveSurfer use */}
      <audio id="global-audio-element" controls className="w-48" />
    </div>
  );
};

export default PlayerBar;
