import express from "express";
import { getProverbs } from "../controllers/proverbsController.js";

const router = express.Router();

// GET categories
router.get("/", (req, res) => {
  const proverbs = getProverbs();
  const categories = proverbs.map((p) => p.category);
  res.json(categories);
});

export default router;
