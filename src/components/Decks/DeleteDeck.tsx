import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store/store';
import { toggleDeleteBoxDialog } from '../../redux/slices';
import { thunks} from '../../redux/slices/decks/thunks';
import { thunks as boxThunks} from '../../redux/slices/boxes/thunks';

import { useState } from 'react';
import { DeleteModal } from '../DeleteModal';

export const DeleteDeckModal = () => {
    const { openDeleteDeckDialog, deckSelected} = useSelector((state: RootState) => state.decks);
    const user = useSelector((store: RootState) => store.user);
    const [_, setShowToast] = useState(false);
    const dispatch = useDispatch<AppDispatch>()

    const handleClose = () => {
        dispatch(toggleDeleteBoxDialog())
    }
    const handleDeleteBox = async () => {
        try {
            if (!deckSelected?.id) throw new Error('Box ID is required');
            await dispatch(thunks.deleteDeck(deckSelected.id)).unwrap();
            dispatch(thunks.getDecksByUser(user.id));
            dispatch(boxThunks.getBoxesByUser(user.id));
            dispatch(toggleDeleteBoxDialog())
            setShowToast(true);
        } catch (error) {
            console.error(error);
            throw new Error(error as string);
        }
    }
  return (
    <DeleteModal
      open={openDeleteDeckDialog}
      onClose={handleClose}
      onConfirm={handleDeleteBox}
      resourceName="Deck"
    />
  );
}
