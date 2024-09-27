import { createSlice } from '@reduxjs/toolkit';
import { persistLocalStorage } from '../../utilities/localStorage.utility';
import Box from '../../models/Box';

export const boxEmptyState: Box[] = [];
export const BoxKey = 'box';

export const boxSlice = createSlice({
  name: 'box',
  initialState: localStorage.getItem(BoxKey)
    ? JSON.parse(localStorage.getItem(BoxKey) as string)
    : boxEmptyState,
  reducers: {
    getBoxesAction: (_, action) => {
      const newBoxes = action.payload;
      //   const updatedBoxes = [...state, ...newBoxes];
      persistLocalStorage<Box[]>(BoxKey, newBoxes);
      return newBoxes;
    },

    clearBoxesAction: () => {
      localStorage.removeItem(BoxKey);
      return boxEmptyState;
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

export const { getBoxesAction, clearBoxesAction } = boxSlice.actions;

export default boxSlice.reducer;
