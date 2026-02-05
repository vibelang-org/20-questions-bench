// Script to replace claudeOpus_high answerer with a random non-opus answerer
// for all pending queue items.
// Run with: bun run update-queue-answerers.ts

import * as fs from "fs";
import * as path from "path";

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const scriptDir = __dirname.startsWith('/') && __dirname[2] === ':'
  ? __dirname.slice(1)
  : __dirname;
const QUEUE_FILE = path.join(scriptDir, "queue.json");

const REPLACEMENT_ANSWERERS = ["claudeSonnet4_5_high", "gpt5_2_high", "gemini3Pro_high", "kimi_k2_5"];

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const raw = fs.readFileSync(QUEUE_FILE, "utf8");
const queue = JSON.parse(raw);

let replacedCount = 0;
const replacementCounts: Record<string, number> = {};

for (const item of queue.items) {
  if (item.status === "pending" && item.answererModelId === "claudeOpus_high") {
    const newAnswerer = randomChoice(REPLACEMENT_ANSWERERS);
    item.answererModelId = newAnswerer;
    replacedCount++;
    replacementCounts[newAnswerer] = (replacementCounts[newAnswerer] || 0) + 1;
  }
}

fs.writeFileSync(QUEUE_FILE, JSON.stringify(queue, null, 2));

console.log(`Updated ${replacedCount} pending items that had claudeOpus_high as answerer.`);
console.log("Replacement distribution:");
for (const [model, count] of Object.entries(replacementCounts).sort()) {
  console.log(`  ${model}: ${count}`);
}
