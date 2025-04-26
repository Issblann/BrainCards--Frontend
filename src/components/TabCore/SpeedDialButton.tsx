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
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store/store';
import { toggleDialogBox, toggleDialogDeck } from '../../redux/slices';
import { CreateBoxModal } from './CreateBoxModal';
import { CreateDeckModal } from './CreateDeckModal';

interface SpeedDialButtonProps {
}

export const SpeedDialButton: FC<SpeedDialButtonProps> = () => {
  const labelProps = {
    variant: 'small',
    color: 'blue-gray',
    className:
      'absolute top-2/4 -left-2/4 -translate-y-2/4 -translate-x-3/4 font-normal',
  };

  const dispatch = useDispatch<AppDispatch>();

  const handleDialogBox = () => {
    dispatch(toggleDialogBox());
  };

  const handleDialogDeck = () => {
    dispatch(toggleDialogDeck());
  }
  return (
  <>
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
    
    <CreateBoxModal/>
    <CreateDeckModal/>
    </>
  );
};
