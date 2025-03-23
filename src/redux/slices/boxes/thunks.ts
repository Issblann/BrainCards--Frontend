import { createAsyncThunk } from '@reduxjs/toolkit';
import { api, BASE_URL } from '../../../services/axios';

interface BoxPayload {
    title: string;
    description: string;
    boxId: string;
}

export const thunks = {
    getDecksByUser: createAsyncThunk('boxes/getDecksByUser', async (userId: string, { rejectWithValue }) => {
        try {
            const response = await api.get(`${BASE_URL}/getDecksByUserId/${userId}`);
            return {
                boxes: response.data,
            };
        } catch (error: any) {
            return rejectWithValue(error.message || 'error desconocido');
        }
    }),

    createADeck: createAsyncThunk(
        'boxes/createDeck',
        async ({ data, userId }: { data: Partial<BoxPayload>; userId: string }, { rejectWithValue }) => {
            try {
                const response = await api.post(`${BASE_URL}/createDeck/${userId}`, data);
                return {
                    boxes: response.data,
                };
            } catch (error: any) {
                return rejectWithValue(error.message || 'error desconocido');
            }
        }
    ),
};
