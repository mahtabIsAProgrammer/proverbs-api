import express from "express";
import {
  getProverbs,
  saveProverbs,
} from "../controllers/proverbsController.js";

const router = express.Router();

// GET Proverbs
router.get("/", (req, res) => {
  const { search, category } = req.query;
  let proverbs = getProverbs();

  // Getting proverbs by Search and Category
  if (search) {
    const keyword = search.toLowerCase();
    proverbs = proverbs.filter((p) =>
      [p.persionText, p.englishText, p.germanText].some((field) =>
        field.toLowerCase().includes(keyword)
      )
    );
  }

  if (category) {
    const categoryLower = category.toLowerCase();

    proverbs = proverbs.filter((p) => {
      if (Array.isArray(p.categories)) {
        return p.categories.some((cat) => cat.toLowerCase() === categoryLower);
      } else if (typeof p.categories === "string") {
        return p.categories.toLowerCase() === categoryLower;
      }
      return false;
    });
  }

  res.json(proverbs);
});

// GET Random Proverbs
router.get("/random", (req, res) => {
  const proverbs = getProverbs();
  const randomIndex = Math.floor(Math.random() * proverbs.length);
  const randomproverb = proverbs[randomIndex];
  res.json(randomproverb);
});

// GET proverbs By ID
router.get("/:id", (req, res) => {
  const proverbs = getProverbs();
  const proverb = proverbs.find((p) => p.id == req.params.id);
  if (proverb) res.json(proverb);
  else res.status(404).json({ message: "Proverb not found" });
});

// POST New Proverb
router.post("/", (req, res) => {
  const proverbs = getProverbs();
  const { persionText, englishText, meaning, categories, germanText } =
    req.body;
  const newProverb = {
    id: Date.now(),
    persionText,
    englishText,
    meaning,
    categories,
    germanText,
  };
  proverbs.push(newProverb);
  saveProverbs(proverbs);
  res.json(newProverb);
});

//  PUT aka Edit a proverb
router.put("/:id", (req, res) => {
  const proverbs = getProverbs();
  const proverb = proverbs.find((p) => p.id == req.params.id);
  if (proverb) {
    proverb.persionText = req.body.persionText || proverb.persionText;
    proverb.englishText = req.body.englishText || proverb.englishText;
    proverb.germanText = req.body.germanText || proverb.germanText;
    proverb.meaning = req.body.meaning || proverb.meaning;
    proverb.categories = req.body.categories || proverb.categories;
    res.json(proverb);
    saveProverbs(proverbs);
  } else {
    res.status(404).json({ message: "PRoverb not found" });
  }
});

// DELETE a Proverb
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
