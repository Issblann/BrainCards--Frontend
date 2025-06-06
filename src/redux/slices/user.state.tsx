import { createSlice } from '@reduxjs/toolkit';
import { UserLogged } from '../../models/User';
import {
  clearLocalStorage,
  persistLocalStorage,
} from '../../utilities/localStorage.utility';

export const userEmptyState: UserLogged = {
  id: '',
  username: '',
  email: '',
  password: '',
  createdAt: '',
  updatedAt: '',
  message: '',
};
export const UserKey = 'user';

export const userSlice = createSlice({
  name: 'user',
  initialState: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') as string)
    : userEmptyState,
  reducers: {
    loginUserAction: (_, action) => {
      persistLocalStorage<UserLogged>(UserKey, action.payload);
      return action.payload;
    },

    logoutUser: (_) => {
      clearLocalStorage(UserKey);
      return userEmptyState;
    },
  },
});

export const { loginUserAction, logoutUser } = userSlice.actions;

export default userSlice.reducer;
