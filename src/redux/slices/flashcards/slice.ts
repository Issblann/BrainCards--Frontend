import { createSlice } from "@reduxjs/toolkit";
import initialState from "./state";
import extraReducers from "./extraReducers";
import decksReducers from "./reducers";

export const flashcardSlice = createSlice({
    name: 'flashcards',
    initialState,
    reducers: decksReducers,
    extraReducers
});

export default flashcardSlice.reducer;

export const {setDialogFlashcardOpen,setTrigger,toggleDialogFlashcard,toggleTrigger} = flashcardSlice.actions;