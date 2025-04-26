import { PayloadAction } from "@reduxjs/toolkit";
import { thunks } from "./thunks"
import { FlashcardsState } from "./state";
import Flashcard from "../../../models/Flashcards";

const extraReducers = (builder:any)  => {
    builder.addCase(thunks.getFlashcardsByDeckId.pending, (state:FlashcardsState) => {
        state.loading = true; 
    }).addCase(thunks.getFlashcardsByDeckId.fulfilled, (state:FlashcardsState, action:PayloadAction<FlashcardsState>) => {
        state.loading = false;
        state.data = action.payload.data;
    }).addCase(thunks.getFlashcardsByDeckId.rejected, (state:FlashcardsState, action:PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
    }),

    builder.addCase(thunks.createFlashcards.pending, (state:FlashcardsState) => {
        state.loading = true; 
    }).addCase(thunks.createFlashcards.fulfilled, (state:FlashcardsState, action:PayloadAction<Flashcard>) => {
        state.loading = false;
        state.data =  [...state.data, action.payload];
        state.openDialogFlashcard = false;
    }).addCase(thunks.createFlashcards.rejected, (state:FlashcardsState, action:PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
    })
}

export default extraReducers;