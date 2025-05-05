import { readFileSync, writeFileSync } from "fs";

const path = "./data/proverbs.json";

export const getProverbs = () => {
  const data = readFileSync(path, "utf-8");
  return JSON.parse(data);
};

export const saveProverbs = (proverb) => {
  const proverbs = getProverbs();
  proverbs.push(proverb);
  writeFileSync(path, JSON.stringify(proverbs, null, 2));
};
