import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react';
import { useState } from 'react';
import { Toast } from './Toast';


interface DeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  resourceName: string; // Nombre del recurso a eliminar (Box, Deck, etc.)
  toastMessage?: string;
}

export const DeleteModal = ({
  open,
  onClose,
  onConfirm,
  resourceName,
  toastMessage = `${resourceName} deleted successfully!`,
}: DeleteModalProps) => {
  const [showToast, setShowToast] = useState(false);

  const handleDelete = async () => {
    try {
      await onConfirm();
      setShowToast(true);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Dialog open={open} handler={onClose}>
        <DialogHeader>Confirm {resourceName} Deletion</DialogHeader>
        <DialogBody>
          Are you sure you want to delete this {resourceName.toLowerCase()}? This action cannot be undone, and it will be permanently removed.
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="black" onClick={onClose} className="mr-1">
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="red" onClick={handleDelete}>
            <span>Delete</span>
          </Button>
        </DialogFooter>
      </Dialog>
      {showToast && <Toast open={showToast} setOpen={setShowToast}>{toastMessage}</Toast>}
    </>
  );
};
