import Deck from "../../../models/Deck";

export interface DeckState {
    data: Deck[];
    deck: Deck | null;
    loading: boolean;
    error: string | null;
    trigger: boolean;
    openDialogDeck: boolean;
}

const initialState: DeckState = {
    data: [],
    deck: null,
    loading: false,
    error: null,
    trigger: false,
    openDialogDeck: false,
}

export default initialState;