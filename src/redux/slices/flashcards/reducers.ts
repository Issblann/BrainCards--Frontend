import { PayloadAction } from "@reduxjs/toolkit";
import {  FlashcardsState } from "./state";

const flashCardReducers = {
    toggleTrigger(state: FlashcardsState) {
        state.trigger = !state.trigger;
      },
      setTrigger(state: FlashcardsState, action: PayloadAction<boolean>) {
        state.trigger = action.payload;
      },
      toggleDialogFlashcard(state: FlashcardsState) {
        state.openDialogFlashcard = !state.openDialogFlashcard;
      },
       setEditModeFlashcards(state: FlashcardsState) {
              state.isEditMode = !state.isEditMode;
            },
      setDialogFlashcardOpen(state: FlashcardsState, action: PayloadAction<boolean>) {
        state.openDialogFlashcard = action.payload;
      },

      toggleDeleteFlashcard(state: FlashcardsState) {
       state.openDialogDeleteFlashcard = !state.openDialogDeleteFlashcard;
      },

      setFlashcardId(state: FlashcardsState, action: PayloadAction<string>) {
      state.flashcardId = action.payload;
    },

    }

export default flashCardReducers;