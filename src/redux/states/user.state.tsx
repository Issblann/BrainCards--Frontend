import { createSlice } from '@reduxjs/toolkit';
import { UserLogged } from '../../models/User';

export const userEmptyState: UserLogged = {
  id: '',
  username: '',
  email: '',
  password: '',
  createdAt: '',
  updatedAt: '',
  message: '',
  token: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState: userEmptyState,
  reducers: {
    loginUserAction: (state, action) => action.payload,

    logoutUser: (state) => userEmptyState,
  },
});

export const { loginUserAction, logoutUser } = userSlice.actions;

export default userSlice.reducer;
