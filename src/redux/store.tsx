import { configureStore } from '@reduxjs/toolkit';

import { userSlice, profileSlice } from './states';
import { UserLogged } from '../models';
import Profile from '../models/Profile';

export interface AppStore {
  user: UserLogged;
  profile: Profile;
}

export default configureStore<AppStore>({
  reducer: {
    user: userSlice.reducer,
    profile: profileSlice.reducer,
  },
});
