import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store/store';
import { toggleDeleteFlashcard } from '../../redux/slices';
import { thunks } from '../../redux/slices/flashcards/thunks';

import { useState } from 'react';
import { DeleteModal } from '../DeleteModal';

export const DeleteFlashcardModal = () => {
    const { openDialogDeleteFlashcard, flashcardId} = useSelector((state: RootState) => state.flashcards);
    // const user = useSelector((store: RootState) => store.user);

    console.log('flashcardId', flashcardId);
    console.log(openDialogDeleteFlashcard)
    const [_, setShowToast] = useState(false);
    const dispatch = useDispatch<AppDispatch>()

    const handleClose = () => {
        dispatch(toggleDeleteFlashcard())
    }
    const handleDeleteFlashcard = async () => {
        try {
            if (!flashcardId) throw new Error('Flashcard ID is required');
            handleClose();
            await dispatch(thunks.deleteFlashcard(flashcardId)).unwrap();
            dispatch(thunks.getFlashcardsByDeckId(flashcardId));
            setShowToast(true);
        } catch (error) {
            console.error(error);
            throw new Error(error as string);
        }
    }
  return (
    <DeleteModal
      open={openDialogDeleteFlashcard}
      onClose={handleClose}
      onConfirm={handleDeleteFlashcard}
      resourceName="Flashcard"
    />
  );
}
