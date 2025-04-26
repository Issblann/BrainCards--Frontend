import { PayloadAction } from "@reduxjs/toolkit";
import { DeckState } from "./state";
import { thunks } from "./thunks"

const extraReducers = (builder:any)  => {
    builder.addCase(thunks.getDecksByUser.pending, (state:DeckState) => {
        state.loading = true; 
    }).addCase(thunks.getDecksByUser.fulfilled, (state:DeckState, action:PayloadAction<DeckState>) => {
        state.loading = false;
        state.data = action.payload.data;
    }).addCase(thunks.getDecksByUser.rejected, (state:DeckState, action:PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
    }),

    builder.addCase(thunks.createADeck.pending, (state:DeckState) => {
        state.loading = true; 
    }).addCase(thunks.createADeck.fulfilled, (state:DeckState, action:PayloadAction<DeckState>) => {
        state.loading = false;
        state.data =  {...state.data, ...action.payload.data};
    }).addCase(thunks.createADeck.rejected, (state:DeckState, action:PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
    })
}

export default extraReducers;