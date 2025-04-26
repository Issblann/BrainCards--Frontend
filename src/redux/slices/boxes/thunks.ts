import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../services/axios';
import { boxRoutes } from '../../../services/routes/boxRoutes';

export interface BoxPayload {
    title: string;
    description: string;
    boxId: string;
}

export const thunks = {
    getBoxesByUser: createAsyncThunk('boxes/getBoxesByUser', async (userId: string, { rejectWithValue }) => {
        try {
            const response = await api.get(boxRoutes.getBoxesByUserId(userId));
            console.log('response', response.data);
            return {data: response.data};
            
        } catch (error: any) {
            return rejectWithValue(error.message || 'error desconocido');
        }
    }),

    createABox: createAsyncThunk(
        'boxes/createBox',
        async ({ data, userId }: { data: Partial<BoxPayload>; userId: string }, { rejectWithValue }) => {
            try {
                const response = await api.post(boxRoutes.createBox(userId), data);
                return response.data;
            } catch (error: any) {
                return rejectWithValue(error.message || 'Error creando la caja');
            }
        }
    ),
};
