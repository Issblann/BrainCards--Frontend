import Box from "../../../models/Box";

export interface BoxState {
    data: Box[]
    loading: boolean
    error: string | null;
    trigger: boolean;
    openDialogBox: boolean;
    editMode: boolean;
    boxSelected: Box | null;
    openDeleteBoxDialog: boolean;
}

const initialState: BoxState = {
    data: [],
    loading: false,
    error: null,
    trigger: false,
    openDialogBox: false,
    editMode: false,
    boxSelected: null,
    openDeleteBoxDialog: false,
}

export default initialState;