import { useNavigate } from 'react-router-dom';
import Deck from '../../models/Deck';
import { Button, TabPanel } from '@material-tailwind/react';
import { PrivateRoutes } from '../../models';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store/store';
import { thunks } from '../../redux/slices/decks/thunks';
import { setDialogEditDeckOpen, toggleDeleteDeckDialog } from '../../redux/slices';

interface CardDeckProps {
  value: string;
  decks: Deck[] | null;
  label?: string;
}
export const CardDeck = ({ label, value, decks }: CardDeckProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>()
  const { editMode } = useSelector((store: RootState) => store.boxes);
  const handleEditDeck = async (id: string) => {
       await dispatch(thunks.getDeckById(id));
        dispatch(setDialogEditDeckOpen(true));
  }

  const handleDeleteDeck = async (id: string) => {
    await dispatch(thunks.getDeckById(id));
    dispatch(toggleDeleteDeckDialog());
  }
  return (
    <TabPanel
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4 px-0"
      key={value}
      value={value}
    >
      {!decks?.length && (
        <div className="col-span-full flex justify-center items-center h-[300px]">
          <h1 className="text-black"> No decks in {label}</h1>
        </div>
      )}
      {decks?.map(({ id, title, description }: Deck) => {
        return (
          <div
            className="bg-lavender-background rounded-xl w-full flex flex-col justify-between border-2  h-[160px] md:h-[240px] p-4"
            key={id}
          >
            <div className="flex flex-col">
              <p className="font-normal text-lavender-950 text-xs">{label}</p>
              <h1 className="text-black font-semibold ">{title}</h1>
              <p className="text-xs font-normal">{description}</p>
            </div>

       
              {editMode ? (
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleEditDeck(id)}
                    size="sm"
                    className="bg-lavender-600 hover:bg-lavender-700"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDeleteDeck(id) }
                    size="sm"
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Delete
                  </Button>
                </div>
              ) : (
                 <Button
              onClick={() =>
                navigate(`private/${PrivateRoutes.FLASHCARDS}/${id}`)
              }
              size="sm"
              disabled={editMode}
              className="w-[120px] bg-lavender-600 hover:bg-lavender-700"
            >
              Study
            </Button>
              )}
            </div>
        );
      })}
    </TabPanel>
  );
};
