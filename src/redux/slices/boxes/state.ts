import Box from "../../../models/Box";

export interface BoxState {
    data: Box[]
    loading: boolean
    error: string | null;
    trigger: boolean;
    openDialogBox: boolean;
}

const initialState: BoxState = {
    data: [],
    loading: false,
    error: null,
    trigger: false,
    openDialogBox: false,
}

export default initialState;