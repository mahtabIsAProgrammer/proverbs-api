import express from "express";
import { getProverbs } from "../controllers/proverbsController.js";

const router = express.Router();

router.get("/", (req, res) => {
  const proverbs = getProverbs();
  const categories = proverbs.map((p) => p.category);
  res.json(categories);
});

export default router;
