import Box from "../../../models/Box";

export interface BoxState {
    boxes: Box[]
    loading: boolean
    error: string | null;
}

const initialState: BoxState = {
    boxes: [],
    loading: false,
    error: null
}

export default initialState;