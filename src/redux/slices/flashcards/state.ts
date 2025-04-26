import Flashcard from "../../../models/Flashcards";

export interface FlashcardsState {
    data: Flashcard[];
    loading: boolean;
    error: string | null;
    trigger: boolean;
    openDialogFlashcard: boolean;
}

const initialState: FlashcardsState  = {
    data: [],
    loading: false,
    error: null,
    trigger: false,
    openDialogFlashcard: false,
}

export default initialState;