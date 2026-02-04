// Queue management for benchmark runs with crash recovery
// Queue generation is handled by create-queue.ts (run separately)
// @ts-ignore - Node.js modules available at runtime
import * as fs from "fs";

import { type DatasetEntry } from "./dataset.ts";

export interface QueueItem {
  id: string;
  guesserModelId: string;  // Model config ID (e.g., "gpt5_2_high")
  answererModelId: string; // Model config ID
  secret: DatasetEntry;
  status: "pending" | "running" | "completed" | "failed";
  runId?: string;        // Set when started
  completedAt?: string;  // ISO timestamp
  error?: string;        // Error message if failed
}

export interface QueueFile {
  createdAt: string;
  totalItems: number;
  completedCount: number;
  items: QueueItem[];
}

const QUEUE_FILE = "./queue.json";

/**
 * Load existing queue or return null if not found
 */
export function loadQueue(): QueueFile | null {
  if (!fs.existsSync(QUEUE_FILE)) {
    return null;
  }

  const content = fs.readFileSync(QUEUE_FILE, "utf-8");
  return JSON.parse(content) as QueueFile;
}

/**
 * Save queue to file
 */
export function saveQueue(queue: QueueFile): void {
  fs.writeFileSync(QUEUE_FILE, JSON.stringify(queue, null, 2));
}

/**
 * Get next pending item from queue
 */
export function getNextPendingItem(queue: QueueFile): QueueItem | null {
  return queue.items.find((item) => item.status === "pending") ?? null;
}

/**
 * Mark item as running (started)
 */
export function markItemRunning(queue: QueueFile, itemId: string, runId: string): void {
  const item = queue.items.find((i) => i.id === itemId);
  if (item) {
    item.status = "running";
    item.runId = runId;
    saveQueue(queue);
  }
}

/**
 * Mark item as completed
 */
export function markItemCompleted(queue: QueueFile, itemId: string): void {
  const item = queue.items.find((i) => i.id === itemId);
  if (item) {
    item.status = "completed";
    item.completedAt = new Date().toISOString();
    queue.completedCount++;
    saveQueue(queue);
  }
}

/**
 * Mark item as failed
 */
export function markItemFailed(queue: QueueFile, itemId: string, error: string): void {
  const item = queue.items.find((i) => i.id === itemId);
  if (item) {
    item.status = "failed";
    item.error = error;
    item.completedAt = new Date().toISOString();
    saveQueue(queue);
  }
}

/**
 * Reset any "running" items back to "pending" (for crash recovery)
 */
export function resetRunningItems(queue: QueueFile): number {
  let resetCount = 0;
  for (const item of queue.items) {
    if (item.status === "running") {
      item.status = "pending";
      item.runId = undefined;
      resetCount++;
    }
  }
  if (resetCount > 0) {
    saveQueue(queue);
  }
  return resetCount;
}

/**
 * Get queue progress summary
 */
export function getQueueProgress(queue: QueueFile): {
  total: number;
  completed: number;
  pending: number;
  running: number;
  failed: number;
  percentComplete: number;
} {
  const completed = queue.items.filter((i) => i.status === "completed").length;
  const pending = queue.items.filter((i) => i.status === "pending").length;
  const running = queue.items.filter((i) => i.status === "running").length;
  const failed = queue.items.filter((i) => i.status === "failed").length;

  return {
    total: queue.totalItems,
    completed,
    pending,
    running,
    failed,
    percentComplete: Math.round((completed / queue.totalItems) * 100),
  };
}

/**
 * Get current timestamp in milliseconds (for Vibe code that lacks Date)
 */
export function getTimestamp(): number {
  return Date.now();
}

/**
 * Count how many timestamps fall within a recent window
 */
export function countRecentErrors(timestamps: number[], now: number, windowMs: number): number {
  const cutoff = now - windowMs;
  return timestamps.filter((t) => t >= cutoff).length;
}

/**
 * Delete queue file (for fresh start)
 */
export function deleteQueue(): void {
  if (fs.existsSync(QUEUE_FILE)) {
    fs.unlinkSync(QUEUE_FILE);
  }
}
