import { createSlice } from '@reduxjs/toolkit';
import { persistLocalStorage } from '../../utilities/localStorage.utility';
import Profile from '../../models/Profile';

export const profileEmptyState: Profile = {
  id: '',
  userId: '',
  name: '',
  lastName: '',
  username: '',
  bio: '',
  image: '',
  updatedAt: '',
};
export const ProfileKey = 'profile';

export const profileSlice = createSlice({
  name: 'profile',
  initialState: localStorage.getItem('profile')
    ? JSON.parse(localStorage.getItem('profile') as string)
    : profileEmptyState,
  reducers: {
    getProfileAction: (state, action) => {
      persistLocalStorage<Profile>(ProfileKey, action.payload);
      return action.payload;
    },
    editProfileAction: (state, action) => {
      persistLocalStorage<Profile>(ProfileKey, action.payload);
      return action.payload;
    },
  },
});

export const { getProfileAction, editProfileAction } = profileSlice.actions;

export default profileSlice.reducer;
