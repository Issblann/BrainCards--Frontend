import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../services/axios';
import { deckRoutes } from '../../../services/routes/deckRoutes';

export interface DeckPayload {
    title: string;
    description: string;
    boxId: string;
}

export const thunks = {
    getDecksByUser: createAsyncThunk('decks/getDecksByUser', async (userId: string, { rejectWithValue }) => {
        try {
            const response = await api.get(deckRoutes.getDecksByUserId(userId));
            return {data: response.data}

        } catch (error: any) {
            return rejectWithValue(error.message || 'error desconocido');
        }
    }),

    createADeck: createAsyncThunk(
        'decks/createDeck',
        async ({ data, userId }: { data: Partial<DeckPayload>; userId: string }, { rejectWithValue }) => {
            try {
                const response = await api.post(deckRoutes.createDeck(userId), data);
                return response.data
            } catch (error: any) {
                return rejectWithValue(error.message || 'error desconocido');
            }
        }
    ),

    getDeckById: createAsyncThunk('decks/getDeckById', async (deckId: string, { rejectWithValue }) => {
        try {
            const response = await api.get(deckRoutes.getDeckById(deckId));
            return {data: response.data}
        } catch (error: any) {
            return rejectWithValue(error.message || 'error desconocido');
        }
    }),
};
