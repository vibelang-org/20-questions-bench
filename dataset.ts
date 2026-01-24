// Benchmark dataset for 20 Questions
// Each item has a category (known to guesser) and secret (known only to answerer)

export interface DatasetEntry {
  category: string;
  secret: string;
}

export const dataset: DatasetEntry[] = [
  // Animals
  { category: "animal", secret: "elephant" },
  { category: "animal", secret: "penguin" },

  // Food
  { category: "food", secret: "pizza" },
  { category: "food", secret: "sushi" },

  // Places
  { category: "place", secret: "Japan" },
  { category: "place", secret: "Brazil" },

  // Famous People
  { category: "famous person", secret: "Einstein" },
  { category: "famous person", secret: "Shakespeare" },

  // Objects
  { category: "object", secret: "telescope" },
  { category: "object", secret: "umbrella" },
];

export function getRandomEntry(): DatasetEntry {
  const index = Math.floor(Math.random() * dataset.length);
  return dataset[index];
}
