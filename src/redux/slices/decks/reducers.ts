import { PayloadAction } from "@reduxjs/toolkit";
import { DeckState } from "./state";

const decksReducers = {
      toggleTriggerDeck(state: DeckState) {
        state.trigger = !state.trigger;
      },
      setTriggerDeck(state: DeckState, action: PayloadAction<boolean>) {
        state.trigger = action.payload;
      },
      toggleDialogDeck(state: DeckState) {
        state.openDialogDeck = !state.openDialogDeck;
      },
      setDialogDeckOpen(state: DeckState, action: PayloadAction<boolean>) {
        state.openDialogDeck = action.payload;
      },
    }

export default decksReducers;