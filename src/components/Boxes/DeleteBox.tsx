import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store/store';
import { toggleDeleteBoxDialog } from '../../redux/slices';
import { thunks } from '../../redux/slices/boxes/thunks';
import { thunks as deckThunks} from '../../redux/slices/decks/thunks';

import { useState } from 'react';
import { Toast } from '../Toast';

export const DeleteBoxModal = () => {
    const { openDeleteBoxDialog, boxSelected} = useSelector((state: RootState) => state.boxes);
    const user = useSelector((store: RootState) => store.user);
    const [showToast, setShowToast] = useState(false);
    const dispatch = useDispatch<AppDispatch>()

    const handleDialogDelete = () => {
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
      <>
          <Dialog open={openDeleteBoxDialog} handler={handleDialogDelete}>
              <DialogHeader>Confirm Box Deletion</DialogHeader>
              <DialogBody>
                  Are you sure you want to delete this box? This action cannot be undone, and the box will be
                  permanently removed.
              </DialogBody>
              <DialogFooter>
                  <Button variant="text" color="black" onClick={handleDialogDelete} className="mr-1">
                      <span>Cancel</span>
                  </Button>
                  <Button variant="gradient" color="red" onClick={handleDeleteBox}>
                      <span>Delete</span>
                  </Button>
              </DialogFooter>
          </Dialog>
          {/* Toast Notification */}
          {showToast && <Toast open={showToast} setOpen={setShowToast}>Box deleted successfully!</Toast>}
      </>
  );
}
