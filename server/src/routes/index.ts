import { Router } from "express";
import tracksRouter from "./tracks";
import podcastsRouter from "./podcasts";
import playlistsRouter from "./playlists"; 

const router = Router();

router.use("/tracks", tracksRouter);
router.use("/podcasts", podcastsRouter);
router.use("/playlists", playlistsRouter); 

export default router;
