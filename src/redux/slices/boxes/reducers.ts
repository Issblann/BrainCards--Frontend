import { PayloadAction } from "@reduxjs/toolkit";
import { BoxState } from "./state";

const boxesReducers = {
    toggleTriggerBox(state: BoxState) {
        state.trigger = !state.trigger;
      },
      setTriggerBox(state: BoxState, action: PayloadAction<boolean>) {
        state.trigger = action.payload;
      },
      toggleDialogBox(state: BoxState) {
        state.openDialogBox = !state.openDialogBox;
      },
      setDialogBoxOpen(state: BoxState, action: PayloadAction<boolean>) {
        state.openDialogBox = action.payload;
      },
    }

export default boxesReducers;