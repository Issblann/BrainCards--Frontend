import axios from 'axios';
import { AxiosCall } from '../models';
import Deck from '../models/Deck';
import { loadAbort } from '../utilities';

interface GetDecks {
  (userId: string | undefined): AxiosCall<Deck>;
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
