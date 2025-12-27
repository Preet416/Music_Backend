import React, { useEffect, useState } from "react";
import { authFetch } from "../api/http";

const Library = () => {
  const [playlists, setPlaylists] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  const loadPlaylists = async () => {
    try {
      setLoading(true);
      const res = await authFetch("http://localhost:4000/api/playlists");
      const data = await res.json();
      setPlaylists(data);
    } catch (err) {
      console.error("Failed to load playlists", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlaylists();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      setCreating(true);
      const res = await authFetch("http://localhost:4000/api/playlists", {
        method: "POST",
        body: { name },
      });
      const data = await res.json();
      if (res.ok) {
        setPlaylists((prev) => [data, ...prev]);
        setName("");
      } else {
        console.error("Create playlist error", data);
      }
    } catch (err) {
      console.error("Create playlist failed", err);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="flex-1 px-10 py-6 text-sm">
      <h2 className="text-2xl font-semibold mb-4">Your Playlists</h2>

      <form onSubmit={handleCreate} className="mb-4">
        <div className="flex gap-2 max-w-lg">
          <input
            type="text"
            placeholder="New playlist name"
            className="flex-1 rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            type="submit"
            disabled={creating}
            className="px-3 py-2 rounded-md bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-semibold disabled:opacity-60"
          >
            {creating ? "Creating..." : "Create"}
          </button>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Playlists are saved per user in Supabase.
        </p>
      </form>

      {loading && (
        <div className="text-slate-400 text-xs mt-2">Loading playlists...</div>
      )}

      {!loading && playlists.length === 0 && (
        <div className="text-slate-400 text-xs mt-2">
          No playlists yet. Create your first playlist above.
        </div>
      )}

      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5 mt-4">
        {playlists.map((pl) => (
          <li
            key={pl.id}
            className="rounded-lg border border-slate-800 bg-slate-900/80 px-4 py-3"
          >
            <div className="font-medium mb-1">{pl.name}</div>
            <div className="text-xs text-slate-400">
              {pl.trackCount} tracks
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Library;
