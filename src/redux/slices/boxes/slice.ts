import { createSlice } from "@reduxjs/toolkit";
import initialState from "./state";
import extraReducers from "./extraReducers";
import boxesReducers from "./reducers";

export const boxesSlice = createSlice({
    name: 'boxes',
    initialState: initialState,
    reducers: boxesReducers,
    extraReducers
});

export default boxesSlice.reducer;

export const {setDialogBoxOpen,setTriggerBox,toggleDialogBox,toggleTriggerBox, setEditMode, toggleDeleteBoxDialog} = boxesSlice.actions;