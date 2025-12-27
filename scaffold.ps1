# Run this from PowerShell:  cd path\to\music-streaming-app ; .\scaffold.ps1

# ----- CLIENT FILES -----
Set-Location ".\client"

@'
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppShell from "./components/layout/AppShell";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Library from "./pages/Library";
import Podcast from "./pages/Podcast";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { PlayerProvider } from "./context/PlayerContext";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <PlayerProvider>
        <BrowserRouter>
          <AppShell>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/library" element={<Library />} />
              <Route path="/podcasts" element={<Podcast />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </AppShell>
        </BrowserRouter>
      </PlayerProvider>
    </AuthProvider>
  </React.StrictMode>
);
'@ | Set-Content ".\src\main.jsx"

@'
import React from "react";
import PlayerBar from "../player/PlayerBar";

const AppShell = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="h-14 border-b flex items-center px-4">
        <h1 className="font-semibold">Music & Podcast Player</h1>
      </header>
      <main className="flex-1 flex">{children}</main>
      <PlayerBar />
    </div>
  );
};

export default AppShell;
'@ | Set-Content ".\src\components\layout\AppShell.jsx"

@'
import React from "react";
import { usePlayer } from "../../context/PlayerContext";
// ElevenLabs UI Waveform will be plugged in here.

const PlayerBar = () => {
  const { currentTrack, isPlaying, togglePlay } = usePlayer();

  if (!currentTrack) {
    return (
      <div className="h-20 border-t flex items-center px-4 text-sm text-muted-foreground">
        Nothing playing
      </div>
    );
  }

  return (
    <div className="h-24 border-t flex items-center px-4 gap-4">
      <div className="flex flex-col">
        <span className="text-sm font-medium">{currentTrack.title}</span>
        <span className="text-xs text-muted-foreground">
          {currentTrack.artist}
        </span>
      </div>
      <button
        onClick={togglePlay}
        className="px-3 py-1 rounded bg-primary text-primary-foreground text-sm"
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
      <div className="flex-1">
        {/* Waveform visualization (ElevenLabs Waveform) will be rendered here */}
      </div>
      <audio id="global-audio-element" />
    </div>
  );
};

export default PlayerBar;
'@ | Set-Content ".\src\components\player\PlayerBar.jsx"

@'
import React, { createContext, useContext, useState, useEffect } from "react";

const PlayerContext = createContext(null);

export const PlayerProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = document.getElementById("global-audio-element");
    if (!audio || !currentTrack) return;
    audio.src = currentTrack.audioUrl;
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [currentTrack, isPlaying]);

  const playTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const togglePlay = () => setIsPlaying((p) => !p);

  return (
    <PlayerContext.Provider
      value={{ currentTrack, isPlaying, playTrack, togglePlay }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);
'@ | Set-Content ".\src\context\PlayerContext.jsx"

@'
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // integrate Supabase auth later

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
'@ | Set-Content ".\src\context\AuthContext.jsx"

@'
@tailwind base;
@tailwind components;
@tailwind utilities;
'@ | Set-Content ".\src\index.css"

@'
// Placeholder functions to call Express backend and external APIs
export const searchTracks = async (q) => {
  const res = await fetch(`/api/tracks/search?q=${encodeURIComponent(q)}`);
  return res.json();
};
'@ | Set-Content ".\src\api\musicApi.js"

$pages = "Home","Search","Library","Podcast","Admin","Login","Register"
foreach ($p in $pages) {
@"
import React from "react";

const $p = () => {
  return <div className="p-4">$p page</div>;
};

export default $p;
"@ | Set-Content ".\src\pages\$p.jsx"
}

# ----- SERVER FILES -----
Set-Location "..\server"

@'
import express from "express";
import cors from "cors";
import tracksRouter from "./routes/tracks";
import playlistsRouter from "./routes/playlists";
import podcastsRouter from "./routes/podcasts";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/tracks", tracksRouter);
app.use("/api/playlists", playlistsRouter);
app.use("/api/podcasts", podcastsRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
'@ | Set-Content ".\src\index.ts"

@'
import { Router } from "express";

const router = Router();

// GET /api/tracks
router.get("/", async (_req, res) => {
  // TODO: fetch from Supabase
  res.json([]);
});

// GET /api/tracks/search?q=
router.get("/search", async (req, res) => {
  const q = (req.query.q as string) || "";
  // TODO: proxy to MusicBrainz / TheAudioDB then store in Supabase
  res.json({ query: q, results: [] });
});

export default router;
'@ | Set-Content ".\src\routes\tracks.ts"

@'
import { Router } from "express";

const router = Router();

// TODO: CRUD for playlists in Supabase
router.get("/", async (_req, res) => {
  res.json([]);
});

export default router;
'@ | Set-Content ".\src\routes\playlists.ts"

@'
import { Router } from "express";

const router = Router();

// TODO: integrate Listen Notes / PodcastIndex
router.get("/search", async (req, res) => {
  const q = (req.query.q as string) || "";
  res.json({ query: q, results: [] });
});

export default router;
'@ | Set-Content ".\src\routes\podcasts.ts"

@'
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_ANON_KEY as string
);
'@ | Set-Content ".\src\db\supabase.ts"

# ----- SUPABASE -----
Set-Location "..\supabase"

@'
-- Define tables: users, tracks, podcasts, playlists, playlist_tracks, recently_played
-- Use Supabase SQL editor or migrations to complete.
'@ | Set-Content ".\schema.sql"
