import { useDispatch, useSelector } from 'react-redux';
import { CardsDeck, SpeedDialButton, TabBoxes, TabDecks } from '../components';
import { useEffect, useState } from 'react';
import Deck from '../models/Deck';
import { AppDispatch, RootState } from '../redux/store/store';
import { useFetchAndLoad } from '../hooks';
import {
  createBox,
  FormValuesBox,
  getBoxesByUserId,
} from '../services/boxes.service';
import { Tabs, TabsHeader, Tab, TabsBody } from '@material-tailwind/react';
import { createDeck, FormValuesDeck } from '../services/decks.service';
import {
  createFlashcards,
  FormValuesFlashcards,
} from '../services/flashcards.service';
import { useNavigate } from 'react-router-dom';
import { PrivateRoutes } from '../models';
import { thunks } from '../redux/slices/boxes/thunks';


export const Home = () => {
  const user = useSelector((store: RootState) => store.user);
  const {data} = useSelector((store: RootState) => store.boxes);
  const decks = useSelector((store: RootState) => store.decks);

  const dispatch = useDispatch<AppDispatch>();
  const { loading, callEndpoint } = useFetchAndLoad();
  const [createdDeck, setCreatedDeck] = useState<Deck>();
  const [trigger, setTrigger] = useState<boolean>(false);

  const [openDialogDeck, setOpenDialogDeck] = useState<boolean>(false);
  const [openDialogFlashcards, setOpenDialogFlashcards] =
    useState<boolean>(false);
  const [openDialogBox, setOpenDialogBox] = useState<boolean>(false);

  const handleDialogBox = () => setOpenDialogBox((cur) => !cur);
  const handleDialogDeck = () => setOpenDialogDeck((cur) => !cur);
  const handleDialogFlashcards = () => setOpenDialogFlashcards((cur) => !cur);

  const navigate = useNavigate();
  const defaultDeck = [
    {
      value: 'All',
      label: 'All',
      desc: [
        {
          id: 1,
          title: 'Sample Deck',
          description: 'This is a sample deck',
        },
      ],
    },
  ];

  const handleCreateDeck = async (data: FormValuesDeck) => {
    try {
      if (!user.id) return;
      const axiosCall = createDeck(user.id, data);
      const response = await callEndpoint(axiosCall);
      handleDialogDeck();
      setTrigger(!trigger);
      setCreatedDeck(response.data);
      setOpenDialogFlashcards(true);
    } catch (error) {
      console.error(error);
      throw new Error(error as string);
    }
  };

  const handleCreateFlashcards = async (data: FormValuesFlashcards) => {
    try {
      if (!user.id) return;
      const axiosCall = createFlashcards(createdDeck?.id, data);
      await callEndpoint(axiosCall);
      handleDialogFlashcards();
      setTrigger(!trigger);
      navigate(`private/${PrivateRoutes.FLASHCARDS}/${createdDeck?.id}`);
    } catch (error) {
      console.error(error);
      throw new Error(error as string);
    }
  };

    useEffect(() => {
      if (user.id) {
       dispatch(thunks.getBoxesByUser(user.id));
      }
    }, [user.id]);
  // const getBoxesWithDecks = async () => {
  //   try {
  //     if (!user.id) return;
  //     const axiosCall = getBoxesByUserId(user.id);
  //     const response = await callEndpoint(axiosCall);
  //     dispatch(getBoxesAction(response.data));
  //   } catch (error) {
  //     console.error(error);
  //     throw new Error(error as string);
  //   }
  // };

  // useEffect(() => {
  //   getBoxesWithDecks();
  // }, [user.id, trigger]);
  console.log('USER', user);
  return (
    <div className="w-full h-full flex justify-center flex-col gap-4">
      {user ? (
        <>
          <SpeedDialButton
          />
          <TabBoxes
          />
          {/* {!loading && (
            <TabDecks
              openDialogDeck={openDialogDeck}
              openDialogFlashcards={openDialogFlashcards}
              handleDialogDeck={handleDialogDeck}
              handleCreateDeck={handleCreateDeck}
              handleDialogFlashcards={handleDialogFlashcards}
              handleCreateFlashcards={handleCreateFlashcards}
              createdDeck={createdDeck}
              loading={loading}
            />
          )} */}
{/* 
          {loading && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="text-center flex flex-col justify-center items-center">
                <span className="w-16 h-16 border-4 border-t-transparent border-white border-solid rounded-full animate-spin"></span>
                <p className="mt-4 text-white text-lg">Cargando..</p>
              </div>
            </div>
          )} */}
        </>
      ) : (
        <Tabs value="All">
          <TabsHeader className="w-full overflow-x-scroll scrollbar-thin">
            <Tab
              className="max-w-[50%] md:max-w-72 md:w-72 flex-shrink-0 "
              key="All"
              value="All"
            >
              All
            </Tab>
          </TabsHeader>

          <TabsBody
            animate={{
              initial: { y: -250 },
              mount: { y: 0 },
              unmount: { y: 350 },
            }}
          >
            <CardsDeck defaultDeck={defaultDeck} />
          </TabsBody>
        </Tabs>
      )}
    </div>
  );
};
