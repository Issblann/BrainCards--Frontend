import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../services/axios';
import { flashcardsRoutes } from '../../../services/routes/flashcardsRoutes';

export interface FlashcardPayload {
    title: string;
    description: string;
    boxId: string;
}

export const thunks = {
    getFlashcardsByDeckId: createAsyncThunk('flashCards/getFlashcardsByDeckId', async (deckId: string, { rejectWithValue }) => {
        try {
            const response = await api.get(flashcardsRoutes.getFlashcardsByDeckId(deckId));
            return {data: response.data}

        } catch (error: any) {
            return rejectWithValue(error.message || 'error desconocido');
        }
    }),

    createFlashcards: createAsyncThunk(
        'flashCards/createFlashcards',
        async ({ data, deckId }: { data: Partial<FlashcardPayload>; deckId: string }, { rejectWithValue }) => {
            try {
                const response = await api.post(flashcardsRoutes.createFlashcards(deckId), data);
                return response.data
            } catch (error: any) {
                return rejectWithValue(error.message || 'error desconocido');
            }
        }
    ),
};
