import { configureStore } from '@reduxjs/toolkit';

import { userSlice, profileSlice, deckSlice, boxesSlice } from '../slices';

import { UserLogged } from '../../models';
import Profile from '../../models/Profile';
// export interface AppStore {
//   user: UserLogged;
//   profile: Profile;
//   decks: Deck[];
//   boxes: Box;
// }

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    profile: profileSlice.reducer,
    decks: deckSlice.reducer,
    boxes: boxesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;