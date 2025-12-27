import React, { useEffect, useState } from "react";
import { usePlayer } from "../context/PlayerContext";

const Search = () => {
  const { playTrack } = usePlayer();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // simple debounce: 400ms
  useEffect(() => {
    const handler = setTimeout(() => {
      runSearch(query);
    }, 400);

    return () => clearTimeout(handler);
  }, [query]);

  const runSearch = async (text) => {
    const trimmed = text.trim();
    if (!trimmed) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:4000/api/tracks/search?q=${encodeURIComponent(
          trimmed
        )}`
      );
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error("Search failed", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePlay = (track) => {
    playTrack(track);
  };

  return (
    <div className="p-6 space-y-4 text-sm">
      <h2 className="text-2xl font-semibold mb-2">Search</h2>

      <div className="max-w-md">
        <input
          type="text"
          placeholder="Search tracks by title..."
          className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {loading && (
        <div className="text-slate-400 text-xs mt-2">Searching...</div>
      )}

      {!loading && query.trim() && results.length === 0 && (
        <div className="text-slate-400 text-xs mt-2">
          No tracks found for “{query.trim()}”.
        </div>
      )}

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {results.map((t) => (
          <li
            key={t.id}
            onClick={() => handlePlay(t)}
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
    </div>
  );
};

export default Search;
