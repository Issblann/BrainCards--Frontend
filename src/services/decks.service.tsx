import axios from 'axios';
import { AxiosCall } from '../models';
import Deck from '../models/Deck';
import { loadAbort } from '../utilities';

type DeckPost = {
  title: string;
  description?: string;
  boxId?: string;
};
interface GetDecks {
  (userId: string | undefined): AxiosCall<Deck>;
}

interface CreateDeck {
  (userId: string, Deck: DeckPost): AxiosCall<Deck>;
}
const BASE_URL = 'http://localhost:3000/api/decks';

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
