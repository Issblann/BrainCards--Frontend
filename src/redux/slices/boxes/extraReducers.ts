import { PayloadAction } from "@reduxjs/toolkit";
import { BoxState } from "./state";
import { thunks } from "./thunks"

const extraReducers = (builder:any)  => {
    builder.addCase(thunks.getBoxesByUser.pending, (state:BoxState) => {
        state.loading = true; 
    }).addCase(thunks.getBoxesByUser.fulfilled, (state:BoxState, action:PayloadAction<BoxState>) => {
        state.loading = false;
        state.boxes = action.payload.boxes;
    }).addCase(thunks.getBoxesByUser.rejected, (state:BoxState, action:PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
    }),

    builder.addCase(thunks.createABox.pending, (state:BoxState) => {
        state.loading = true; 
    }).addCase(thunks.createABox.fulfilled, (state:BoxState, action:PayloadAction<BoxState>) => {
        state.loading = false;
        state.boxes =  {...state.boxes, ...action.payload.boxes};
    }).addCase(thunks.createABox.rejected, (state:BoxState, action:PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
    })
}

export default extraReducers;