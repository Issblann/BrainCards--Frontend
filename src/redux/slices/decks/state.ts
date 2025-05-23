import Deck from "../../../models/Deck";

export interface DeckState {
    data: Deck[];
    deck: Deck | null;
    loading: boolean;
    error: string | null;
    trigger: boolean;
    openDialogDeck: boolean;
    editMode: boolean;
    deckSelected: Deck | null;
    openDeleteDeckDialog: boolean;
    openEditDeckDialog: boolean;
}

const initialState: DeckState = {
    data: [],
    deck: null,
    loading: false,
    error: null,
    trigger: false,
    openDialogDeck: false,
    editMode: false,
    deckSelected: null,
    openDeleteDeckDialog: false,
    openEditDeckDialog: false,
}

export default initialState;