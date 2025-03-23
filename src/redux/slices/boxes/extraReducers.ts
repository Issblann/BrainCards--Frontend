import { PayloadAction } from "@reduxjs/toolkit";
import { BoxState } from "./state";
import { thunks } from "./thunks"

const extraReducers = (builder:any)  => {
    builder.addCase(thunks.getDecksByUser.pending, (state:BoxState) => {
        state.loading = true; 
    }).addCase(thunks.getDecksByUser.fulfilled, (state:BoxState, action:PayloadAction<BoxState>) => {
        state.loading = false;
        state.boxes = action.payload.boxes;
    }).addCase(thunks.getDecksByUser.rejected, (state:BoxState, action:PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
    }),

    builder.addCase(thunks.createADeck.pending, (state:BoxState) => {
        state.loading = true; 
    }).addCase(thunks.createADeck.fulfilled, (state:BoxState, action:PayloadAction<BoxState>) => {
        state.loading = false;
        state.boxes =  {...state.boxes, ...action.payload.boxes};
    }).addCase(thunks.createADeck.rejected, (state:BoxState, action:PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
    })
}

export default extraReducers;