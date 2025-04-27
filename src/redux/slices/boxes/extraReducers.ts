import { PayloadAction } from "@reduxjs/toolkit";
import { BoxState } from "./state";
import { thunks } from "./thunks"
import Box from "../../../models/Box";

const extraReducers = (builder:any)  => {
    builder.addCase(thunks.getBoxesByUser.pending, (state:BoxState) => {
        state.loading = true; 
    }).addCase(thunks.getBoxesByUser.fulfilled, (state:BoxState, action:PayloadAction<BoxState>) => {
        state.loading = false;
        state.data = action.payload.data;
    }).addCase(thunks.getBoxesByUser.rejected, (state:BoxState, action:PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
    }),

    builder.addCase(thunks.createABox.pending, (state:BoxState) => {
        state.loading = true; 
    }).addCase(thunks.createABox.fulfilled, (state:BoxState, action:PayloadAction<Box>) => {
        state.loading = false;
        state.data =  [...state.data, action.payload];
        state.openDialogBox = false;
    }).addCase(thunks.createABox.rejected, (state:BoxState, action:PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
    }),

    builder.addCase(thunks.updateBox.pending, (state:BoxState) => {
        state.loading = true; 
    }).addCase(thunks.updateBox.fulfilled, (state:BoxState, action:PayloadAction<Box>) => {
        state.loading = false;
        state.data = state.data.filter((box:Box) => box.id !== action.payload.id);
        state.data = [...state.data, action.payload];
        state.openDialogBox = false;
        state.boxSelected = null;
    }).addCase(thunks.updateBox.rejected, (state:BoxState, action:PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
    }),

    builder.addCase(thunks.deleteBox.pending, (state:BoxState) => {
        state.loading = true; 
    }).addCase(thunks.deleteBox.fulfilled, (state:BoxState) => {
        state.loading = false;
        state.boxSelected = null;
    }).addCase(thunks.deleteBox.rejected, (state:BoxState, action:PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
    }),

    builder.addCase(thunks.getBoxById.pending, (state:BoxState) => {
        state.loading = true; 
    }).addCase(thunks.getBoxById.fulfilled, (state:BoxState, action:PayloadAction<Box>) => {
        state.loading = false;
        state.boxSelected = action.payload;
    }).addCase(thunks.getBoxById.rejected, (state:BoxState, action:PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
    })
}

export default extraReducers;