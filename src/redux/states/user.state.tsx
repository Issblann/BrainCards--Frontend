import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../models';

export const userEmptyState: User = {
  id: '',
  username: '',
  email: '',
  password: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState: userEmptyState,
  reducers: {
    loginUser: (state, action) => action.payload,

    logoutUser: (state) => userEmptyState,
  },
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
