import { Router } from "express";
import { supabase } from "../db/supabase";

const router = Router();

// GET /api/tracks
router.get("/", async (_req, res) => {
  const { data, error } = await supabase
    .from("tracks")
    .select("id, title, artist, audio_url, cover_url, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase tracks error", error);
    return res.status(500).json({ error: "Failed to fetch tracks" });
  }

  const mapped =
    data?.map((t) => ({
      id: t.id,
      title: t.title,
      artist: t.artist,
      audioUrl: t.audio_url,
      coverUrl: t.cover_url,
    })) ?? [];

  res.json(mapped);
});

// dummy search for later
router.get("/search", async (req, res) => {
  const q = (req.query.q as string) || "";

  const { data, error } = await supabase
    .from("tracks")
    .select("id, title, artist, audio_url, cover_url")
    .ilike("title", `%${q}%`);

  if (error) {
    console.error("Supabase search error", error);
    return res.status(500).json({ error: "Failed to search tracks" });
  }

  const mapped =
    data?.map((t) => ({
      id: t.id,
      title: t.title,
      artist: t.artist,
      audioUrl: t.audio_url,
      coverUrl: t.cover_url,
    })) ?? [];

  res.json(mapped);
});

export default router;
