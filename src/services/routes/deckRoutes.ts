import { BASE_URL } from "../axios";

const BASE_URL_DECKS = `${BASE_URL}/decks`;

export const deckRoutes = {
  getDecksByUserId: (userId: string) => `${BASE_URL_DECKS}/getDecksByUserId/${userId}`,
  createDeck: (userId: string) => `${BASE_URL_DECKS}/createBox/${userId}`,
};
