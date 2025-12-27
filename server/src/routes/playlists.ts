import { Router } from "express";

const router = Router();

// TODO: CRUD for playlists in Supabase
router.get("/", async (_req, res) => {
  res.json([]);
});

export default router;
