import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../services/axios';
import { deckRoutes } from '../../../services/routes/deckRoutes';

interface BoxPayload {
    title: string;
    description: string;
    boxId: string;
}

export const thunks = {
    getDecksByUser: createAsyncThunk('boxes/getDecksByUser', async (userId: string, { rejectWithValue }) => {
        try {
            const response = await api.get(deckRoutes.getDecksByUserId(userId));
            return {data: response.data}

        } catch (error: any) {
            return rejectWithValue(error.message || 'error desconocido');
        }
    }),

    createADeck: createAsyncThunk(
        'boxes/createDeck',
        async ({ data, userId }: { data: Partial<BoxPayload>; userId: string }, { rejectWithValue }) => {
            try {
                const response = await api.post(deckRoutes.createDeck(userId), data);
                return {
                    boxes: response.data,
                };
            } catch (error: any) {
                return rejectWithValue(error.message || 'error desconocido');
            }
        }
    ),
};
