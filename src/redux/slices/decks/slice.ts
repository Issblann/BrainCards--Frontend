import { createSlice } from "@reduxjs/toolkit";
import initialState from "./state";
import extraReducers from "./extraReducers";
import decksReducers from "./reducers";

export const deckSlice = createSlice({
    name: 'decks',
    initialState,
    reducers: decksReducers,
    extraReducers
});

export default deckSlice.reducer;

export const {setDialogDeckOpen,setTrigger,toggleDialogDeck,toggleTrigger} = deckSlice.actions;