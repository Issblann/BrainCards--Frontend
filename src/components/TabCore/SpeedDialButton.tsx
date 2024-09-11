import {
  IconButton,
  SpeedDial,
  SpeedDialAction,
  SpeedDialContent,
  SpeedDialHandler,
  Typography,
} from '@material-tailwind/react';
import { FC } from 'react';

import {
  HiOutlineArchive,
  HiOutlineFolder,
  HiOutlinePlusSm,
} from 'react-icons/hi';

interface SpeedDialButtonProps {
  handleDialogDeck: () => void;
  handleDialogBox: () => void;
}

export const SpeedDialButton: FC<SpeedDialButtonProps> = ({
  handleDialogDeck,
  handleDialogBox,
}) => {
  const labelProps = {
    variant: 'small',
    color: 'blue-gray',
    className:
      'absolute top-2/4 -left-2/4 -translate-y-2/4 -translate-x-3/4 font-normal',
  };

  return (
    <div className="relative mt-20">
      <div className="absolute bottom-0 right-0">
        <SpeedDial placement="left-end">
          <SpeedDialHandler>
            <IconButton size="lg" className="rounded-full">
              <HiOutlinePlusSm className="h-5 w-5 transition-transform group-hover:rotate-45" />
            </IconButton>
          </SpeedDialHandler>
          <SpeedDialContent className="z-50">
            <SpeedDialAction className="relative" onClick={handleDialogBox}>
              <HiOutlineArchive className="h-5 w-5" color="#607D8B" />
              <Typography {...(labelProps as {})}>New Box</Typography>
            </SpeedDialAction>
            <SpeedDialAction className="relative" onClick={handleDialogDeck}>
              <HiOutlineFolder className="h-5 w-5" color="#607D8B" />
              <Typography {...(labelProps as {})}>New Deck</Typography>
            </SpeedDialAction>
          </SpeedDialContent>
        </SpeedDial>
      </div>
    </div>
  );
};
