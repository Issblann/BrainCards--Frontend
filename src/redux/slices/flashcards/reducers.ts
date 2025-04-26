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
      setDialogFlashcardOpen(state: FlashcardsState, action: PayloadAction<boolean>) {
        state.openDialogFlashcard = action.payload;
      },
    }

export default flashCardReducers;