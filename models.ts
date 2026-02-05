// Model configurations for 20 Questions benchmark
// All model definitions in TypeScript for easy queue generation

export interface ModelConfig {
  id: string;           // Unique ID used in queue (e.g., "gpt5_2_high")
  name: string;         // Model name for API (e.g., "gpt-5.2")
  provider: string;     // "openai" | "anthropic" | "google" | "openrouter"
  thinkingLevel?: string; // "low" | "medium" | "high" | "max"
}

// API keys resolved at runtime via env()
export const API_KEYS: Record<string, string> = {
  openai: "OPENAI_API_KEY",
  anthropic: "ANTHROPIC_API_KEY",
  google: "GOOGLE_API_KEY",
  openrouter: "OPENROUTER_API_KEY",
};

export const PROVIDER_URLS: Record<string, string> = {
  openai: "https://api.openai.com/v1",
  anthropic: "https://api.anthropic.com",
  google: "https://generativelanguage.googleapis.com",
  openrouter: "https://openrouter.ai/api/v1",
};

// 14 Guesser Models
export const GUESSER_MODELS: ModelConfig[] = [
  // OpenAI
  { id: "gpt5_2_medium", name: "gpt-5.2", provider: "openai", thinkingLevel: "medium" },
  { id: "gpt5_2_high", name: "gpt-5.2", provider: "openai", thinkingLevel: "high" },
  { id: "gpt5_2_max", name: "gpt-5.2", provider: "openai", thinkingLevel: "max" },

  // Google
  { id: "gemini3Flash_high", name: "gemini-3-flash-preview", provider: "google", thinkingLevel: "high" },
  { id: "gemini3Pro_low", name: "gemini-3-pro-preview", provider: "google", thinkingLevel: "low" },
  { id: "gemini3Pro_high", name: "gemini-3-pro-preview", provider: "google", thinkingLevel: "high" },

  // Anthropic
  { id: "claudeHaiku_medium", name: "claude-haiku-4-5-20251001", provider: "anthropic", thinkingLevel: "medium" },
  { id: "claudeSonnet_medium", name: "claude-sonnet-4-5-20250929", provider: "anthropic", thinkingLevel: "medium" },
  { id: "claudeOpus_medium", name: "claude-opus-4-5-20251101", provider: "anthropic", thinkingLevel: "medium" },

  // OpenRouter (xAI)
  // Grok 4: Always-on reasoning, cannot be configured
  { id: "grok4", name: "x-ai/grok-4", provider: "openrouter" },
  // Grok 4.1 Fast: Boolean reasoning (thinkingLevel → reasoning.enabled)
  { id: "grok4_1_fast", name: "x-ai/grok-4.1-fast", provider: "openrouter", thinkingLevel: "high" },

  // OpenRouter (Chinese models)
  // DeepSeek V3.2: Boolean reasoning (thinkingLevel → reasoning.enabled)
  { id: "deepseek_v3_2", name: "deepseek/deepseek-v3.2-20251201", provider: "openrouter", thinkingLevel: "high" },
  // GLM 4.7: No reasoning support
  { id: "glm_4_7", name: "z-ai/glm-4.7", provider: "openrouter" },
  // Kimi K2.5: Boolean reasoning (thinkingLevel → reasoning.enabled)
  { id: "kimi_k2_5", name: "moonshotai/kimi-k2.5", provider: "openrouter", thinkingLevel: "high" },
];

// 4 Answerer Models (high thinking where supported)
export const ANSWERER_MODELS: ModelConfig[] = [
  { id: "claudeSonnet4_5_high", name: "claude-sonnet-4-5-20250929", provider: "anthropic", thinkingLevel: "high" },
  { id: "gpt5_2_high", name: "gpt-5.2", provider: "openai", thinkingLevel: "high" },
  { id: "gemini3Pro_high", name: "gemini-3-pro-preview", provider: "google", thinkingLevel: "high" },
  // Kimi K2.5: Boolean reasoning (thinkingLevel → reasoning.enabled)
  { id: "kimi_k2_5", name: "moonshotai/kimi-k2.5", provider: "openrouter", thinkingLevel: "high" },
];

// All models for lookup
export const ALL_MODELS: ModelConfig[] = [...GUESSER_MODELS, ...ANSWERER_MODELS];

export function getModelConfig(id: string): ModelConfig | undefined {
  return ALL_MODELS.find(m => m.id === id);
}

// Helper functions for Vibe to get model properties
export function getApiKeyEnvVar(config: ModelConfig): string {
  return API_KEYS[config.provider];
}

export function getProviderUrl(config: ModelConfig): string {
  return PROVIDER_URLS[config.provider];
}

export function getThinkingLevel(config: ModelConfig): string | null {
  return config.thinkingLevel || null;
}
