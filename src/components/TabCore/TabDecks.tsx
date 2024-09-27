import { FC } from 'react';
import Box from '../../models/Box';
import Deck from '../../models/Deck';
import { FormValuesDeck } from '../../services/decks.service';
import { FormValuesFlashcards } from '../../services/flashcards.service';
import { CreateDeckModal } from './CreateDeckModal';
import { CreateFlashcardsModal } from './CreateFlashcardsModal';

interface TabDecksProps {
  openDialogDeck: boolean;
  handleDialogDeck: () => void;
  handleCreateDeck: (data: FormValuesDeck) => void;
  openDialogFlashcards: boolean;
  handleDialogFlashcards: () => void;
  handleCreateFlashcards: (data: FormValuesFlashcards) => void;
  createdDeck?: Deck;
  loading: boolean;
}
export const TabDecks: FC<TabDecksProps> = ({
  openDialogDeck,
  handleDialogDeck,
  handleCreateDeck,
  openDialogFlashcards,
  handleDialogFlashcards,
  handleCreateFlashcards,
  createdDeck,
  loading,
}) => {
  return (
    <>
      <>
        <CreateDeckModal
          open={openDialogDeck}
          handleClose={handleDialogDeck}
          submitForm={handleCreateDeck}
        />
        <CreateFlashcardsModal
          open={openDialogFlashcards}
          handleClose={handleDialogFlashcards}
          submitForm={handleCreateFlashcards}
          deck={createdDeck}
        />
      </>
    </>
  );
};
