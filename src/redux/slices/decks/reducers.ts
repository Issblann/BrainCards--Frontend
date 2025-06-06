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

      setDialogEditDeckOpen(state: DeckState, action: PayloadAction<boolean>) {
        state.openEditDeckDialog = action.payload;
      },

      toggleDialogEditDeck(state: DeckState) {
        state.openEditDeckDialog = !state.openEditDeckDialog;
      },

      toggleDeleteDeckDialog(state: DeckState) {
         state.openDeleteDeckDialog = !state.openDeleteDeckDialog;
      }
    }

export default decksReducers;