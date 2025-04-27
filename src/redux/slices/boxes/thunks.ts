import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../services/axios';
import { boxRoutes } from '../../../services/routes/boxRoutes';

export interface BoxPayload {
    title: string;
    description: string;
    boxId: string;
}

export interface BoxEditPayload {
    boxId: string | undefined;
    title: string;
}

export const thunks = {
    getBoxesByUser: createAsyncThunk('boxes/getBoxesByUser', async (userId: string, { rejectWithValue }) => {
        try {
            const response = await api.get(boxRoutes.getBoxesByUserId(userId));
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

    updateBox: createAsyncThunk(
        'boxes/updateBox',
        async ({ data, boxId }: { data: Partial<BoxEditPayload>; boxId: string }, { rejectWithValue }) => {
            try {
                const response = await api.put(boxRoutes.updateBox(boxId), data);
                return response.data;
            } catch (error: any) {
                return rejectWithValue(error.message || 'Error actualizando la caja');
            }
        }
    ),

    deleteBox: createAsyncThunk(
        'boxes/deleteBox',
        async (boxId: string, { rejectWithValue }) => {
            try {
                const response = await api.delete(boxRoutes.deleteBox(boxId));
                return response.data;
            } catch (error: any) {
                return rejectWithValue(error.message || 'Error eliminando la caja');
            }
        }
    ),

    getBoxById: createAsyncThunk(
        'boxes/getBoxById',
        async (boxId: string, { rejectWithValue }) => {
            try {
                const response = await api.get(boxRoutes.getBoxById(boxId));
                return response.data;
            } catch (error: any) {
                return rejectWithValue(error.message || 'Error obteniendo la caja por id');
            }
        }
    ),
};
