import Deck from "../../../models/Deck";

export interface DeckState {
    data: Deck[];
    loading: boolean;
    error: string | null;
    trigger: boolean;
    openDialogDeck: boolean;
}

const initialState: DeckState = {
    data: [],
    loading: false,
    error: null,
    trigger: false,
    openDialogDeck: false,
}

export default initialState;