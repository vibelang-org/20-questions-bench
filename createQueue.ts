// Queue generation script for 20 Questions benchmark
// Run with: bun run create-queue.ts

import * as fs from "fs";
import * as path from "path";
import { GUESSER_MODELS, ANSWERER_MODELS, type ModelConfig } from "./models.ts";
import { dataset, type DatasetEntry } from "./datasetBasic1.ts";

// Get the directory where this script lives
const __dirname = path.dirname(new URL(import.meta.url).pathname);
// On Windows, remove leading slash from /C:/...
const scriptDir = __dirname.startsWith('/') && __dirname[2] === ':'
  ? __dirname.slice(1)
  : __dirname;
const QUEUE_FILE = path.join(scriptDir, "queue.json");

interface QueueItem {
  id: string;
  guesserModelId: string;
  answererModelId: string;
  secret: DatasetEntry;
  status: "pending" | "running" | "completed" | "failed";
}

interface QueueFile {
  createdAt: string;
  totalItems: number;
  completedCount: number;
  items: QueueItem[];
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateQueue(): QueueItem[] {
  const items: QueueItem[] = [];
  let index = 0;

  // Every guesser sees every secret (grouped by secret)
  for (const secret of dataset) {
    for (const guesser of GUESSER_MODELS) {
      // Random answerer for each run
      const answerer = randomChoice(ANSWERER_MODELS);
      items.push({
        id: `item-${String(index).padStart(5, "0")}`,
        guesserModelId: guesser.id,
        answererModelId: answerer.id,
        secret,
        status: "pending",
      });
      index++;
    }
  }

  return items;
}

// Main
console.log("Generating benchmark queue...");
console.log(`  Guesser models: ${GUESSER_MODELS.length}`);
console.log(`  Answerer models: ${ANSWERER_MODELS.length}`);
console.log(`  Secrets: ${dataset.length}`);

const items = generateQueue();
const queue: QueueFile = {
  createdAt: new Date().toISOString(),
  totalItems: items.length,
  completedCount: 0,
  items,
};

fs.writeFileSync(QUEUE_FILE, JSON.stringify(queue, null, 2));
console.log(`\nCreated ${QUEUE_FILE} with ${items.length} items`);
console.log(`  (${GUESSER_MODELS.length} guessers × ${dataset.length} secrets = ${items.length} runs)`);
