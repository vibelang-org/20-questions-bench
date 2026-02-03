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
  { category: "celebrity", secret: "Chuck Norris" },
  { category: "celebrity", secret: "Oprah Winfrey" },
  { category: "celebrity", secret: "LeBron James" },
  { category: "celebrity", secret: "John Candy" },
  { category: "celebrity", secret: "Dwayne Johnson" },
  { category: "celebrity", secret: "Ryan Reynolds" },
  { category: "celebrity", secret: "Cristiano Ronaldo" },

  // Creatures (10) - includes animals, insects, birds, fish, etc.
  { category: "creature", secret: "elephant" },
  { category: "creature", secret: "penguin" },
  { category: "creature", secret: "butterfly" },
  { category: "creature", secret: "dolphin" },
  { category: "creature", secret: "aardvark" },
  { category: "creature", secret: "eagle" },
  { category: "creature", secret: "giant squid" },
  { category: "creature", secret: "tardigrade" },
  { category: "creature", secret: "shark" },
  { category: "creature", secret: "hummingbird" },

  // Historical Figures (10)
  { category: "historical figure", secret: "Albert Einstein" },
  { category: "historical figure", secret: "Cleopatra" },
  { category: "historical figure", secret: "Napoleon Bonaparte" },
  { category: "historical figure", secret: "Leonardo da Vinci" },
  { category: "historical figure", secret: "Martin Luther" },
  { category: "historical figure", secret: "Marcus Aurelius" },
  { category: "historical figure", secret: "Marie Curie" },
  { category: "historical figure", secret: "Abraham Lincoln" },
  { category: "historical figure", secret: "Neville Chamberlain" },
  { category: "historical figure", secret: "Hammurabi" },

  // Places (10)
  { category: "place", secret: "Eiffel Tower" },
  { category: "place", secret: "Grand Canyon" },
  { category: "place", secret: "Puget Sound" },
  { category: "place", secret: "Amazon Rainforest" },
  { category: "place", secret: "Great Wall of China" },
  { category: "place", secret: "Sahara Desert" },
  { category: "place", secret: "Svalbard" },
  { category: "place", secret: "Mount Everest" },
  { category: "place", secret: "Machu Picchu" },
  { category: "place", secret: "the Falkland Islands" },

  // Historical Events (10)
  { category: "historical event", secret: "the Moon landing" },
  { category: "historical event", secret: "the French Revolution" },
  { category: "historical event", secret: "the fall of the Berlin Wall" },
  { category: "historical event", secret: "the sinking of the Titanic" },
  { category: "historical event", secret: "the signing of the Declaration of Independence" },
  { category: "historical event", secret: "the Russian Revolution" },
  { category: "historical event", secret: "the burning of the Library of Alexandria" },
  { category: "historical event", secret: "D-Day" },
  { category: "historical event", secret: "the Great Awakening" },
  { category: "historical event", secret: "the Norman Conquest" },
];

export function getRandomEntry(): DatasetEntry {
  const index = Math.floor(Math.random() * dataset.length);
  return dataset[index];
}
