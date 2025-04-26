import { BASE_URL } from "../axios";

const BASE_URL_BOXES = `${BASE_URL}/flashcards`;

export const flashcardsRoutes = {
  getFlashcardsByDeckId: (deckId: string) => `${BASE_URL_BOXES}/getFlashcardsByDeckId/${deckId}`,
  createFlashcards: (deckId: string) => `${BASE_URL_BOXES}/createFlashCards/${deckId}`,
};
