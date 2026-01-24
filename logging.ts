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
  input_tokens: number;
  output_tokens: number;
  cachedInputTokens: number;
  thinkingTokens: number;
};

type ModelInfo = {
  name: string;
  provider: string;
};

type BenchmarkLogEntry = {
  timestamp: string;
  runId: string;
  guesser: ModelInfo;
  answerer: ModelInfo;
  guesserUsage: UsageTotals;
  answererUsage: UsageTotals;
  totalQuestions: number;
  won: boolean;
  rounds: RoundResult[];
};

const RESULTS_DIR = "./results";
const LOG_FILE = path.join(RESULTS_DIR, "benchmark-results.jsonl");

function ensureResultsDir(): void {
  if (!fs.existsSync(RESULTS_DIR)) {
    fs.mkdirSync(RESULTS_DIR, { recursive: true });
  }
}

export function calculateUsageTotals(usage: UsageEntry[]): UsageTotals {
  return usage.reduce(
    (acc, curr) => ({
      input_tokens: acc.input_tokens + curr.inputTokens,
      output_tokens: acc.output_tokens + curr.outputTokens,
      cachedInputTokens: acc.cachedInputTokens + curr.cachedInputTokens,
      thinkingTokens: acc.thinkingTokens + curr.thinkingTokens,
    }),
    {
      input_tokens: 0,
      output_tokens: 0,
      cachedInputTokens: 0,
      thinkingTokens: 0,
    }
  );
}

export function logBenchmarkRun(
    runId: string,
    rounds: RoundResult[],
    guesserModel: { name: string; provider: string; usage: UsageEntry[] },
    answererModel: { name: string; provider: string; usage: UsageEntry[] }
): BenchmarkLogEntry {
  ensureResultsDir();

  const won = rounds.some((r) => r.answererResults.finalSecretCorrect);

  const entry: BenchmarkLogEntry = {
    timestamp: new Date().toISOString(),
    runId,
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

  fs.appendFileSync(LOG_FILE, JSON.stringify(entry) + "\n");

  return entry;
}
