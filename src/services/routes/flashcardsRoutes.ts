import { BASE_URL } from "../axios";

const BASE_URL_FLASHCARDS = `${BASE_URL}/flashcards`;

export const flashcardsRoutes = {
  getFlashcardsByDeckId: (deckId: string) => `${BASE_URL_FLASHCARDS}/getFlashcardsByDeckId/${deckId}`,
  createFlashcards: (deckId: string) => `${BASE_URL_FLASHCARDS}/createFlashCards/${deckId}`,
  deleteFlashcard: (flashcardId: string) =>`${BASE_URL_FLASHCARDS}/deleteFlashcard/${flashcardId}`,
};
