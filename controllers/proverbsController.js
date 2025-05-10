import { readFileSync, writeFileSync } from "fs";

const path = "./data/proverbs.json";

// GET proverbs from the json
export const getProverbs = () => {
  const data = readFileSync(path, "utf-8");
  return JSON.parse(data);
};

// Save changing prverbs in the json
export const saveProverbs = (proverbs) => {
  writeFileSync(path, JSON.stringify(proverbs, null, 2));
};
