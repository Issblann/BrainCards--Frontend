import Deck from "../../../models/Deck";

export interface DeckState {
    decks: Deck[];
    loading: boolean;
    error: string | null;
}

const initialState: DeckState = {
    decks: [],
    loading: false,
    error: null
}

export default initialState;