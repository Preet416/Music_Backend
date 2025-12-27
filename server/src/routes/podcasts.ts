import { Router } from "express";
import { supabase } from "../db/supabase";

const router = Router();

// GET /api/podcasts
router.get("/", async (_req, res) => {
  const { data, error } = await supabase
    .from("podcasts")
    .select("id, title, host, description, audio_url, cover_url")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase podcasts error", error);
    return res.status(500).json({ error: "Failed to fetch podcasts" });
  }

  const mapped =
    data?.map((p) => ({
      id: p.id,
      title: p.title,
      host: p.host,
      description: p.description,
      audioUrl: p.audio_url,
      coverUrl: p.cover_url,
    })) ?? [];

  res.json(mapped);
});

export default router;
