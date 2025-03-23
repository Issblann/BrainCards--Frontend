import { createSlice } from '@reduxjs/toolkit';
import { persistLocalStorage } from '../../utilities/localStorage.utility';

import Deck from '../../models/Deck';

export const deckEmptyState: Deck = {
  id: '',
  boxId: '',
  title: '',
  description: '',
  flashCards: [],
};
export const DeckKey = 'deck';

export const deckSlice = createSlice({
  name: 'deck',
  initialState: localStorage.getItem(DeckKey)
    ? JSON.parse(localStorage.getItem(DeckKey) as string)
    : deckEmptyState,
  reducers: {
    getDecksAction: (state, action) => {
      persistLocalStorage<Deck[]>(DeckKey, action.payload);
      return [{ ...state, ...action.payload }];
    },

    clearDecksAction: () => {
      localStorage.removeItem(DeckKey);
      return deckEmptyState;
    },
    // editProfileAction: (state, action) => {
    //   persistLocalStorage<Profile>(ProfileKey, action.payload);
    //   return state;
    // },
    // cleanProfileAction: () => {
    //   localStorage.removeItem(ProfileKey);
    //   return profileEmptyState;
    // },
  },
});

export const { getDecksAction, clearDecksAction } = deckSlice.actions;

export default deckSlice.reducer;
