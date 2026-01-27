// @ts-ignore - Node.js modules available at runtime
import * as fs from "fs";
// @ts-ignore - Node.js modules available at runtime
import * as path from "path";

type AnswererResult = {
  answerCorrect: string;
  finalSecretCorrect: boolean;
};

type RoundResult = {
  roundNumber: number;
  questions: string;
  answererResults: AnswererResult;
};

type UsageEntry = {
  inputTokens: number;
  outputTokens: number;
  cachedInputTokens: number;
  thinkingTokens: number;
};

type UsageTotals = {
  inputTokens: number;
  outputTokens: number;
  cachedInputTokens: number;
  thinkingTokens: number;
};

type ModelInfo = {
  name: string;
  provider: string;
};

type SecretEntry = {
  category: string;
  secret: string;
};

type BenchmarkLogEntry = {
  timestamp: string;
  runId: string;
  secret: SecretEntry;
  guesser: ModelInfo;
  answerer: ModelInfo;
  guesserUsage: UsageTotals;
  answererUsage: UsageTotals;
  totalQuestions: number;
  won: boolean;
  rounds: RoundResult[];
};

const RESULTS_DIR = "./results";

/**
 * Generate a timestamp-based run ID with millisecond precision in UTC.
 * Format: ISO-style readable timestamp (e.g., "2026-01-27T06-55-09.931Z")
 * Uses dashes instead of colons for Windows filename compatibility.
 * Uses UTC to match vibe-logs timestamps.
 */
export function getRunId(): string {
  const now = new Date();
  const pad = (n: number, len = 2) => String(n).padStart(len, '0');

  const year = now.getUTCFullYear();
  const month = pad(now.getUTCMonth() + 1);
  const day = pad(now.getUTCDate());
  const hours = pad(now.getUTCHours());
  const minutes = pad(now.getUTCMinutes());
  const seconds = pad(now.getUTCSeconds());
  const millis = pad(now.getUTCMilliseconds(), 3);

  return `${year}-${month}-${day}T${hours}-${minutes}-${seconds}.${millis}Z`;
}

function ensureResultsDir(): void {
  if (!fs.existsSync(RESULTS_DIR)) {
    fs.mkdirSync(RESULTS_DIR, { recursive: true });
  }
}

export function calculateUsageTotals(usage: UsageEntry[]): UsageTotals {
  return usage.reduce(
    (acc, curr) => ({
      inputTokens: acc.inputTokens + curr.inputTokens,
      outputTokens: acc.outputTokens + curr.outputTokens,
      cachedInputTokens: acc.cachedInputTokens + curr.cachedInputTokens,
      thinkingTokens: acc.thinkingTokens + curr.thinkingTokens,
    }),
    {
      inputTokens: 0,
      outputTokens: 0,
      cachedInputTokens: 0,
      thinkingTokens: 0,
    }
  );
}

export function logBenchmarkRun(
    runId: string,
    rounds: RoundResult[],
    guesserModel: { name: string; provider: string; usage: UsageEntry[] },
    answererModel: { name: string; provider: string; usage: UsageEntry[] },
    secret: { category: string; secret: string }
): BenchmarkLogEntry {
  ensureResultsDir();

  const won = rounds.some((r) => r.answererResults.finalSecretCorrect);

  const entry: BenchmarkLogEntry = {
    timestamp: new Date().toISOString(),
    runId,
    secret,
    guesser: {
      name: guesserModel.name,
      provider: guesserModel.provider,
    },
    answerer: {
      name: answererModel.name,
      provider: answererModel.provider,
    },
    guesserUsage: calculateUsageTotals(guesserModel.usage),
    answererUsage: calculateUsageTotals(answererModel.usage),
    totalQuestions: rounds.length,
    won,
    rounds,
  };

  // Write to individual file per runId
  const runFile = path.join(RESULTS_DIR, `run-${runId}.json`);
  fs.writeFileSync(runFile, JSON.stringify(entry, null, 2));

  return entry;
}
