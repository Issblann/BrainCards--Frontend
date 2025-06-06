import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store/store';
import { toggleDeleteBoxDialog } from '../../redux/slices';
import { thunks } from '../../redux/slices/boxes/thunks';
import { thunks as deckThunks} from '../../redux/slices/decks/thunks';

import { useState } from 'react';
import { DeleteModal } from '../DeleteModal';

export const DeleteBoxModal = () => {
    const { openDeleteBoxDialog, boxSelected} = useSelector((state: RootState) => state.boxes);
    const user = useSelector((store: RootState) => store.user);
    const [_, setShowToast] = useState(false);
    const dispatch = useDispatch<AppDispatch>()

    const handleClose = () => {
        dispatch(toggleDeleteBoxDialog())
    }
    const handleDeleteBox = async () => {
        try {
            if (!boxSelected?.id) throw new Error('Box ID is required');
            await dispatch(thunks.deleteBox(boxSelected.id)).unwrap();
            dispatch(thunks.getBoxesByUser(user.id));
            dispatch(deckThunks.getDecksByUser(user.id));
            dispatch(toggleDeleteBoxDialog())
            setShowToast(true);
        } catch (error) {
            console.error(error);
            throw new Error(error as string);
        }
    }
  return (
    <DeleteModal
      open={openDeleteBoxDialog}
      onClose={handleClose}
      onConfirm={handleDeleteBox}
      resourceName="Box"
    />
  );
}
