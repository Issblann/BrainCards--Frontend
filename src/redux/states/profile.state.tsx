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
      return { ...state, ...action.payload };
    },
    editProfileAction: (state, action) => {
      persistLocalStorage<Profile>(ProfileKey, action.payload);
      return state;
    },
    cleanProfileAction: () => {
      localStorage.removeItem(ProfileKey);
      return profileEmptyState;
    },
  },
});

export const { getProfileAction, editProfileAction, cleanProfileAction } =
  profileSlice.actions;

export default profileSlice.reducer;
