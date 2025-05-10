import express from "express";
import {
  getProverbs,
  saveProverbs,
} from "../controllers/proverbsController.js";

const router = express.Router();

router.get("/", (req, res) => {
  const { search, category } = req.query;
  let proverbs = getProverbs();

  if (search) {
    proverbs = proverbs.filter((p) =>
      p.text.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (category) {
    proverbs = proverbs.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }

  res.json(proverbs);
});

router.get("/random", (req, res) => {
  const proverbs = getProverbs();
  const randomIndex = Math.floor(Math.random() * proverbs.length);
  const randomproverb = proverbs[randomIndex];
  res.json(randomproverb);
});

router.get("/:id", (req, res) => {
  const proverbs = getProverbs();
  const proverb = proverbs.find((p) => p.id == req.params.id);
  if (proverb) res.json(proverb);
  else res.status(404).json({ message: "Proverb not found" });
});

router.post("/", (req, res) => {
  const proverbs = getProverbs();
  const { persionText, translationEn, meaning, category } = req.body;
  const newProverb = {
    id: Date.now(),
    persionText,
    translationEn,
    meaning,
    category,
  };
  proverbs.push(newProverb);
  saveProverbs(proverbs);
  res.json(newProverb);
});

router.put("/:id", (req, res) => {
  const proverbs = getProverbs();
  const proverb = proverbs.find((p) => p.id == req.params.id);
  if (proverb) {
    proverb.persionText = req.body.persionText || proverb.persionText;
    proverb.translationEn = req.body.translationEn || proverb.translationEn;
    proverb.meaning = req.body.meaning || proverb.meaning;
    proverb.category = req.body.category || proverb.category;
    res.json(proverb);
    saveProverbs(proverbs);
  } else {
    res.status(404).json({ message: "PRoverb not found" });
  }
});

router.delete("/:id", (req, res) => {
  let proverbs = getProverbs();
  const id = req.params.id;
  const proverbToDelete = proverbs.find((p) => p.id == id);
  const index = proverbs.indexOf(proverbToDelete);
  proverbs.splice(index, 1);
  saveProverbs(proverbs);
  res.json({ message: "Proverb Deleted" });
});

export default router;
