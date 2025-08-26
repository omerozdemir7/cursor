import { Router } from "express";
import { addFavorite, getFavorites, removeFavorite } from "../controllers/favoriteController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.post("/", requireAuth, addFavorite);
router.delete("/:id", requireAuth, removeFavorite);
router.get("/:userId", requireAuth, getFavorites);

export default router;

