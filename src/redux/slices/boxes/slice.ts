import { createSlice } from "@reduxjs/toolkit";
import initialState from "./state";
import extraReducers from "./extraReducers";

const boxesSlice = createSlice({
    name: 'boxes',
    initialState: initialState,
    reducers: {},
    extraReducers
});

export default boxesSlice.reducer;