
import { FlashcardData } from "@/components/Flashcard";

// Define categories for flashcards
export type Category = {
  id: string;
  name: string;
  color: string;
};

export const categories: Category[] = [
  { id: "vocabulary", name: "Vocabulary", color: "bg-blue-500" },
  { id: "idioms", name: "Idioms & Phrases", color: "bg-purple-500" },
  { id: "academic", name: "Academic", color: "bg-green-500" },
  { id: "business", name: "Business", color: "bg-amber-500" },
  { id: "other", name: "Other", color: "bg-slate-500" },
];

// In a real application, this data would be stored in a database
// For this demo, we're using a static array that can be modified at runtime
export const flashcardData: FlashcardData[] = [
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

// In a real app with persistent storage, you would add these functions:
/*
export const addFlashcard = (card: Omit<FlashcardData, "id">): FlashcardData => {
  const id = Math.max(0, ...flashcardData.map(card => card.id)) + 1;
  const newCard = { ...card, id };
  flashcardData.push(newCard);
  return newCard;
};

export const updateFlashcard = (id: number, data: Partial<FlashcardData>): boolean => {
  const index = flashcardData.findIndex(card => card.id === id);
  if (index === -1) return false;
  flashcardData[index] = { ...flashcardData[index], ...data };
  return true;
};

export const deleteFlashcard = (id: number): boolean => {
  const index = flashcardData.findIndex(card => card.id === id);
  if (index === -1) return false;
  flashcardData.splice(index, 1);
  return true;
};
*/

