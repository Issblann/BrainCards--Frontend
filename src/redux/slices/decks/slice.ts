import { createSlice } from "@reduxjs/toolkit";
import initialState from "./state";
import extraReducers from "./extraReducers";

const deckSlice = createSlice({
    name: 'decks',
    initialState,
    reducers: {},
    extraReducers
});

export default deckSlice.reducer;