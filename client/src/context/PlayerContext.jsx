import React, { createContext, useContext, useState, useEffect } from "react";

const PlayerContext = createContext(null);

export const PlayerProvider = ({ children }) => {
  const [tracks, setTracks] = useState([]);        // Backend se aane wale saare songs
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // 1) Backend (Express) se tracks fetch
  useEffect(() => {
    async function loadTracks() {
      try {
        const res = await fetch("http://localhost:4000/api/tracks");
        const data = await res.json();
        console.log("tracks from API:", data);     // Debug ke liye
        setTracks(data);
      } catch (err) {
        console.error("Failed to load tracks", err);
      }
    }

    loadTracks();
  }, []); // component mount par ek baar chalega[web:208][web:215]

  // 2) Global audio element ko control karna
  useEffect(() => {
    const audio = document.getElementById("global-audio-element");
    if (!audio) return;

    if (currentTrack) {
      audio.src = currentTrack.audioUrl;
    }

    if (currentTrack && isPlaying) {
      audio
        .play()
        .catch((err) => {
          console.error("Audio play failed", err);
        });
    } else {
      audio.pause();
    }
  }, [currentTrack, isPlaying]);

  // 3) Controls
  const playTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (!currentTrack) return;
    setIsPlaying((p) => !p);
  };

  return (
    <PlayerContext.Provider
      value={{
        tracks,        // list of songs
        setTracks,
        currentTrack,
        isPlaying,
        playTrack,
        togglePlay,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);
