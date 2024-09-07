import axios from 'axios';
import { AxiosCall } from '../models';
import Flashcard, { DifficultyLevelEnum } from '../models/Flashcards';
import { loadAbort } from '../utilities';

export type FormValuesFlashcards = {
  topic: string;
  description?: string;
  quantityFlashcards: number;
  difficultyLevel: DifficultyLevelEnum;
};

interface CreateFlashcards {
  (
    deckId: string | undefined | number,
    flashcardData: FormValuesFlashcards
  ): AxiosCall<Flashcard[]>;
}
const BASE_URL = 'http://localhost:3000/api/flashcards';

export const createFlashcards: CreateFlashcards = (
  deckId,
  flashcardData
): AxiosCall<Flashcard[]> => {
  const controller = loadAbort();
  return {
    call: axios.post(`${BASE_URL}/createFlashCards/${deckId}`, flashcardData, {
      signal: controller.signal,
    }),
    controller,
  };
};
