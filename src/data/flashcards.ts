import { FlashcardData } from "@/components/Flashcard";

// Define categories for flashcards
export type Category = {
  id: string;
  name: string;
  color: string;
  icon?: string;
  isCustom?: boolean;
  userId?: string;
};

export type Topic = {
  id: string;
  name: string;
  description?: string;
  categoryIds: string[];
  image?: string;
  userId?: string;
};

// Default categories
export const defaultCategories: Category[] = [
  { id: "vocabulary", name: "Vocabulary", color: "bg-blue-500", icon: "book" },
  { id: "idioms", name: "Idioms & Phrases", color: "bg-purple-500", icon: "quote" },
  { id: "academic", name: "Academic", color: "bg-green-500", icon: "graduation-cap" },
  { id: "business", name: "Business", color: "bg-amber-500", icon: "briefcase" },
  { id: "other", name: "Other", color: "bg-slate-500", icon: "bookmark" },
];

// Default topics
export const defaultTopics: Topic[] = [
  {
    id: "essential-vocabulary",
    name: "Essential Vocabulary",
    description: "Frequently used English words for everyday communication",
    categoryIds: ["vocabulary"],
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500&q=60"
  },
  {
    id: "business-english",
    name: "Business English",
    description: "Essential vocabulary for professional settings",
    categoryIds: ["business"],
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=500&q=60"
  },
  {
    id: "academic-writing",
    name: "Academic Writing",
    description: "Terms and expressions for scholarly writing",
    categoryIds: ["academic"],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=500&q=60"
  },
  {
    id: "common-idioms",
    name: "Common Idioms",
    description: "Popular idiomatic expressions in English",
    categoryIds: ["idioms"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=500&q=60"
  }
];

// Function to get all categories (default + custom)
export const getCategories = (userId?: string): Category[] => {
  // In a real app, this would fetch from a database
  // For now, we're just returning the default categories
  const customCategories: Category[] = [
    // This would normally be fetched from a database based on userId
  ];
  
  return [...defaultCategories, ...customCategories];
};

// Function to get all topics (default + custom)
export const getTopics = (userId?: string): Topic[] => {
  // In a real app, this would fetch from a database
  // For now, we're just returning the default topics
  const customTopics: Topic[] = [
    // This would normally be fetched from a database based on userId
  ];
  
  return [...defaultTopics, ...customTopics];
};

// Default flashcard data
export const defaultFlashcardData: FlashcardData[] = [
  {
    id: 1,
    word: "Serendipity",
    pronunciation: "/ˌsɛrənˈdɪpɪti/",
    definition: "The occurrence and development of events by chance in a happy or beneficial way.",
    example: "The discovery of penicillin was a serendipity as it was accidentally discovered by Alexander Fleming.",
    categoryId: "vocabulary"
  },
  {
    id: 2,
    word: "Eloquent",
    pronunciation: "/ˈɛləkwənt/",
    definition: "Fluent or persuasive in speaking or writing; clearly expressing or indicating something.",
    example: "Her eloquent speech moved the audience to tears.",
    categoryId: "vocabulary"
  },
  {
    id: 3,
    word: "Ephemeral",
    pronunciation: "/ɪˈfɛm(ə)r(ə)l/",
    definition: "Lasting for a very short time; transitory.",
    example: "The ephemeral beauty of cherry blossoms lasts for only about a week.",
    categoryId: "vocabulary"
  },
  {
    id: 4,
    word: "Ubiquitous",
    pronunciation: "/juːˈbɪkwɪtəs/",
    definition: "Present, appearing, or found everywhere.",
    example: "Mobile phones have become ubiquitous in modern society.",
    categoryId: "vocabulary"
  },
  {
    id: 5,
    word: "Pernicious",
    pronunciation: "/pəˈnɪʃəs/",
    definition: "Having a harmful effect, especially in a gradual or subtle way.",
    example: "The pernicious influence of corruption undermined the government's authority.",
    categoryId: "academic"
  },
  {
    id: 6,
    word: "Resilience",
    pronunciation: "/rɪˈzɪlɪəns/",
    definition: "The capacity to recover quickly from difficulties; toughness.",
    example: "The resilience of the community was evident in how quickly they rebuilt after the disaster.",
    categoryId: "business"
  },
  {
    id: 7,
    word: "Meticulous",
    pronunciation: "/məˈtɪkjʊləs/",
    definition: "Showing great attention to detail; very careful and precise.",
    example: "The watchmaker was meticulous in assembling the tiny components.",
    categoryId: "vocabulary"
  },
  {
    id: 8,
    word: "Paradox",
    pronunciation: "/ˈparədɒks/",
    definition: "A seemingly absurd or contradictory statement that when investigated may prove to be well-founded or true.",
    example: "The paradox of the liar - 'This statement is false' - creates a logical contradiction.",
    categoryId: "academic"
  }
];

// Function to get all flashcards (default + user-specific)
export const getFlashcards = (userId?: string): FlashcardData[] => {
  // In a real app, this would fetch from a database
  // For now, we're just returning the default flashcards
  const userFlashcards: FlashcardData[] = [
    // This would normally be fetched from a database based on userId
  ];
  
  return [...defaultFlashcardData];
};

// Functions for managing flashcards (these would connect to a database in a real app)
export const addFlashcard = (card: Omit<FlashcardData, "id">): FlashcardData => {
  const id = Math.max(0, ...defaultFlashcardData.map(card => card.id)) + 1;
  const newCard = { ...card, id };
  defaultFlashcardData.push(newCard);
  return newCard;
};

export const updateFlashcard = (id: number, data: Partial<FlashcardData>): boolean => {
  const index = defaultFlashcardData.findIndex(card => card.id === id);
  if (index === -1) return false;
  defaultFlashcardData[index] = { ...defaultFlashcardData[index], ...data };
  return true;
};

export const deleteFlashcard = (id: number): boolean => {
  const index = defaultFlashcardData.findIndex(card => card.id === id);
  if (index === -1) return false;
  defaultFlashcardData.splice(index, 1);
  return true;
};

// Functions for managing categories
export const addCategory = (category: Omit<Category, "id">): Category => {
  const id = `custom-${Date.now()}`;
  const newCategory = { ...category, id, isCustom: true };
  // In a real app, this would be saved to a database
  return newCategory;
};

// Functions for managing topics
export const addTopic = (topic: Omit<Topic, "id">): Topic => {
  const id = `topic-${Date.now()}`;
  const newTopic = { ...topic, id };
  // In a real app, this would be saved to a database
  return newTopic;
};
