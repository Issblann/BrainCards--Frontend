import { configureStore } from '@reduxjs/toolkit';

import { userSlice } from './states';
import { UserLogged } from '../models';

export interface AppStore {
  user: UserLogged;
}

export default configureStore<AppStore>({
  reducer: {
    user: userSlice.reducer,
  },
});
