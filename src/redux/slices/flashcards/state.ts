import Flashcard from "../../../models/Flashcards";

export interface FlashcardsState {
    data: Flashcard[];
    loading: boolean;
    error: string | null;
    trigger: boolean;
    openDialogFlashcard: boolean;
    isEditMode: boolean;
    openDialogDeleteFlashcard: boolean;
    flashcardId: string | null;
}

const initialState: FlashcardsState  = {
    data: [],
    loading: false,
    error: null,
    trigger: false,
    openDialogFlashcard: false,
    isEditMode: false,
    openDialogDeleteFlashcard: false,
    flashcardId: null,
}

export default initialState;