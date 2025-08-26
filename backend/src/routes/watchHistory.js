import { Router } from "express";
import { getWatchHistory, recordWatch } from "../controllers/watchHistoryController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.post("/", requireAuth, recordWatch);
router.get("/:userId", requireAuth, getWatchHistory);

export default router;

