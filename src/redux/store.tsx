import { configureStore } from '@reduxjs/toolkit';

import { userSlice, profileSlice, deckSlice, boxSlice } from './states';
import { UserLogged } from '../models';
import Profile from '../models/Profile';
import Deck from '../models/Deck';
import Box from '../models/Box';

export interface AppStore {
  user: UserLogged;
  profile: Profile;
  decks: Deck[];
  boxes: Box[];
}

export default configureStore<AppStore>({
  reducer: {
    user: userSlice.reducer,
    profile: profileSlice.reducer,
    decks: deckSlice.reducer,
    boxes: boxSlice.reducer,
  },
});
