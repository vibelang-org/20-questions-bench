// Benchmark dataset for 20 Questions
// 50 secrets across 5 categories (10 each)

export interface DatasetEntry {
  category: string;
  secret: string;
}

export const dataset: DatasetEntry[] = [
  // Celebrities (10)
  { category: "celebrity", secret: "Taylor Swift" },
  { category: "celebrity", secret: "Elon Musk" },
  { category: "celebrity", secret: "Beyoncé" },
  { category: "celebrity", secret: "Tom Hanks" },
  { category: "celebrity", secret: "Oprah Winfrey" },
  { category: "celebrity", secret: "LeBron James" },
  { category: "celebrity", secret: "Adele" },
  { category: "celebrity", secret: "Dwayne Johnson" },
  { category: "celebrity", secret: "Kim Kardashian" },
  { category: "celebrity", secret: "Cristiano Ronaldo" },

  // Creatures (10) - includes animals, insects, birds, fish, etc.
  { category: "creature", secret: "elephant" },
  { category: "creature", secret: "penguin" },
  { category: "creature", secret: "butterfly" },
  { category: "creature", secret: "dolphin" },
  { category: "creature", secret: "spider" },
  { category: "creature", secret: "eagle" },
  { category: "creature", secret: "octopus" },
  { category: "creature", secret: "bee" },
  { category: "creature", secret: "shark" },
  { category: "creature", secret: "hummingbird" },

  // Historical Figures (10)
  { category: "historical figure", secret: "Albert Einstein" },
  { category: "historical figure", secret: "Cleopatra" },
  { category: "historical figure", secret: "Napoleon Bonaparte" },
  { category: "historical figure", secret: "Leonardo da Vinci" },
  { category: "historical figure", secret: "Mahatma Gandhi" },
  { category: "historical figure", secret: "Julius Caesar" },
  { category: "historical figure", secret: "Marie Curie" },
  { category: "historical figure", secret: "Abraham Lincoln" },
  { category: "historical figure", secret: "William Shakespeare" },
  { category: "historical figure", secret: "Genghis Khan" },

  // Places (10)
  { category: "place", secret: "Eiffel Tower" },
  { category: "place", secret: "Grand Canyon" },
  { category: "place", secret: "Tokyo" },
  { category: "place", secret: "Amazon Rainforest" },
  { category: "place", secret: "Great Wall of China" },
  { category: "place", secret: "Sahara Desert" },
  { category: "place", secret: "Venice" },
  { category: "place", secret: "Mount Everest" },
  { category: "place", secret: "Machu Picchu" },
  { category: "place", secret: "Antarctica" },

  // Wildcard (10) - anything is fair game
  { category: "wildcard", secret: "pizza" },
  { category: "wildcard", secret: "smartphone" },
  { category: "wildcard", secret: "Bitcoin" },
  { category: "wildcard", secret: "the Internet" },
  { category: "wildcard", secret: "yoga" },
  { category: "wildcard", secret: "sushi" },
  { category: "wildcard", secret: "a black hole" },
  { category: "wildcard", secret: "the Olympics" },
  { category: "wildcard", secret: "a rainbow" },
  { category: "wildcard", secret: "coffee" },
];

export function getRandomEntry(): DatasetEntry {
  const index = Math.floor(Math.random() * dataset.length);
  return dataset[index];
}
