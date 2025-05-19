import express from "express";
import { getProverbs } from "../controllers/proverbsController.js";

const router = express.Router();

// GET categories
router.get("/", (req, res) => {
  const proverbs = getProverbs();
  const categories = proverbs.map((p) => p.categories).flat();
  // remove duplicates
  const uniqueCategories = [...new Set(categories)];
  res.json(uniqueCategories);
});

export default router;
