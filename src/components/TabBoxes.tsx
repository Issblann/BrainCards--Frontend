import { Tabs, TabsHeader, TabsBody, Tab } from '@material-tailwind/react';
import { CardDeck } from './CardDeck';
import { useFetchAndLoad } from '../hooks';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppStore } from '../redux/store';
import {
  createBox,
  FormValuesBox,
  getBoxesByUserId,
} from '../services/boxes.service';
import Box from '../models/Box';
import { SpeedDialButton } from './SpeedDialButton';
import { CreateDeckModal } from './CreateDeckModal';
import { CreateBoxModal } from './CreateBoxModal';
import { createDeck, FormValuesDeck } from '../services/decks.service';
import '../styles/global.css';
import { CreateFlashcardsModal } from './CreateFlashcardsModal';
import {
  createFlashcards,
  FormValuesFlashcards,
} from '../services/flashcards.service';
import Deck from '../models/Deck';

export const TabBoxes = () => {
  const { loading, callEndpoint } = useFetchAndLoad();
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [createdDeck, setCreatedDeck] = useState<Deck>();
  const [openDialogBox, setOpenDialogBox] = useState<boolean>(false);
  const [openDialogDeck, setOpenDialogDeck] = useState<boolean>(false);
  const [openDialogFlashcards, setOpenDialogFlashcards] =
    useState<boolean>(false);

  const [trigger, setTrigger] = useState(false);

  const handleDialogBox = () => setOpenDialogBox((cur) => !cur);
  const handleDialogDeck = () => setOpenDialogDeck((cur) => !cur);
  const handleDialogFlashcards = () => setOpenDialogFlashcards((cur) => !cur);

  const user = useSelector((store: AppStore) => store.user);

  const getBoxesWithDecks = async () => {
    try {
      if (!user.id) return;
      const axiosCall = getBoxesByUserId(user.id);
      const response = await callEndpoint(axiosCall);
      setBoxes(response.data);
    } catch (error) {
      console.error(error);
      throw new Error(error as string);
    }
  };

  const handleCreateBox = async (data: FormValuesBox) => {
    console.log(data);
    try {
      if (!user.id) return;
      const axiosCall = createBox(user.id, data);
      const response = await callEndpoint(axiosCall);
      handleDialogBox();
      setBoxes((prevBoxes) => [...prevBoxes, response.data]);
    } catch (error) {
      console.error(error);
      throw new Error(error as string);
    }
  };

  const handleCreateDeck = async (data: FormValuesDeck) => {
    console.log(data);
    try {
      if (!user.id) return;
      const axiosCall = createDeck(user.id, data);
      const response = await callEndpoint(axiosCall);
      handleDialogDeck();
      setTrigger((prev) => !prev);
      setCreatedDeck(response.data);
      setOpenDialogFlashcards(true);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      throw new Error(error as string);
    }
  };
  console.log(boxes);

  const handleCreateFlashcards = async (data: FormValuesFlashcards) => {
    console.log(data);
    try {
      if (!user.id) return;
      const axiosCall = createFlashcards(createdDeck?.id, data);
      const response = await callEndpoint(axiosCall);
      handleDialogFlashcards();
      setTrigger((prev) => !prev);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      throw new Error(error as string);
    }
  };
  useEffect(() => {
    getBoxesWithDecks();
  }, [user.id, trigger]);

  const data = boxes.map((box) => ({
    label: box.boxName,
    value: box.id,
    desc: box.decks.map((deck: any) => ({
      id: deck.id,
      title: deck.title,
      description: deck.description,
    })),
  }));

  const defaultDeck = [
    {
      id: 1,
      boxName: 'All',
      title: 'Sample Deck',
      description: 'This is a sample deck',
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="w-full flex flex-col gap-4">
      <SpeedDialButton
        handleDialogDeck={handleDialogDeck}
        handleDialogBox={handleDialogBox}
      />

      <CreateBoxModal
        open={openDialogBox}
        handleClose={handleDialogBox}
        submitForm={handleCreateBox}
      />
      <CreateDeckModal
        open={openDialogDeck}
        handleClose={handleDialogDeck}
        boxes={boxes}
        submitForm={handleCreateDeck}
      />

      <CreateFlashcardsModal
        open={openDialogFlashcards}
        handleClose={handleDialogFlashcards}
        submitForm={handleCreateFlashcards}
        deck={createdDeck}
      />
      {data && data.length > 0 ? (
        <Tabs value={data?.[0]?.value}>
          <TabsHeader className="w-full overflow-x-scroll scrollbar-thin">
            {data.map(({ label, value }) => (
              <Tab
                className="max-w-[50%] md:max-w-72 md:w-72 flex-shrink-0"
                key={value}
                value={value}
                defaultValue="All"
              >
                {label}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody
            animate={{
              initial: { y: -250 },
              mount: { y: 0 },
              unmount: { y: 350 },
            }}
          >
            {data.map(({ label, value, desc }) => (
              <CardDeck label={label} key={value} value={value} desc={desc} />
            ))}
          </TabsBody>
        </Tabs>
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
            <CardDeck key="All" value="All" desc={defaultDeck} />
          </TabsBody>
        </Tabs>
      )}
    </div>
  );
};
