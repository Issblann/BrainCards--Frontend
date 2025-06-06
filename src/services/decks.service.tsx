import axios from 'axios';
import { AxiosCall } from '../models';
import Deck from '../models/Deck';
import { loadAbort } from '../utilities';

export type FormValuesDeck = {
  title: string;
  description?: string;
  boxId: string;
};

interface GetDecks {
  (userId: string | undefined): AxiosCall<Deck>;
}

interface CreateDeck {
  (userId: string, Deck: FormValuesDeck): AxiosCall<Deck>;
}
const BASE_URL = `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/decks`;

export const getDeckById = (deckId: string): AxiosCall<Deck> => {
  const controller = loadAbort();
  return {
    call: axios.get(`${BASE_URL}/getDeckById/${deckId}`, {
      signal: controller.signal,
    }),
    controller,
  };
};
export const getDecksByUserId: GetDecks = (userId): AxiosCall<Deck> => {
  const controller = loadAbort();
  return {
    call: axios.get(`${BASE_URL}/getDecksByUserId/${userId}`, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const createDeck: CreateDeck = (userId, deck): AxiosCall<Deck> => {
  const controller = loadAbort();
  return {
    call: axios.post(`${BASE_URL}/createDeck/${userId}`, deck, {
      signal: controller.signal,
    }),
    controller,
  };
};
