import { Dialog } from '@material-tailwind/react';

export const DialogWithForm = ({ children, open, handler }: any) => {
  return (
    <Dialog
      size="xs"
      open={open}
      handler={handler}
      className="bg-transparent shadow-none"
    >
      {children}
    </Dialog>
  );
};
