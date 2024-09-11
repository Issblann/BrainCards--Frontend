import React, { FC, useEffect, useState } from 'react';
import { TabBoxes } from './TabBoxes';
import { TabDecks } from './TabDecks';
import { useFetchAndLoad } from '../../hooks';
import { SpeedDialButton } from './SpeedDialButton';
import { useSelector } from 'react-redux';
import { AppStore } from '../../redux/store';
import {
  createFlashcards,
  FormValuesFlashcards,
} from '../../services/flashcards.service';
import {
  createBox,
  FormValuesBox,
  getBoxesByUserId,
} from '../../services/boxes.service';
import { createDeck, FormValuesDeck } from '../../services/decks.service';
import Box from '../../models/Box';
import Deck from '../../models/Deck';
import {
  Tabs,
  TabsBody,
  TabsHeader,
  Tab as TabMT,
} from '@material-tailwind/react';
import { CardsDeck } from '../CardsCore/CardsDeck';

interface TabProps {
  boxes: Box[];
  data?: any;
  setBoxes: (boxes: any) => void;
  setCreatedDeck: (deck: Deck) => void;
  createdDeck?: Deck;
}
export const Tab: FC<TabProps> = ({
  boxes,
  setBoxes,
  createdDeck,
  setCreatedDeck,
  data,
}) => {
  const user = useSelector((store: AppStore) => store.user);
  const { loading, callEndpoint } = useFetchAndLoad();
  const [trigger, setTrigger] = useState(false);

  const [openDialogDeck, setOpenDialogDeck] = useState<boolean>(false);
  const [openDialogFlashcards, setOpenDialogFlashcards] =
    useState<boolean>(false);
  const [openDialogBox, setOpenDialogBox] = useState<boolean>(false);

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

  const handleDialogBox = () => setOpenDialogBox((cur) => !cur);
  const handleDialogDeck = () => setOpenDialogDeck((cur) => !cur);
  const handleDialogFlashcards = () => setOpenDialogFlashcards((cur) => !cur);

  // const data = boxes.map((box) => ({
  //     label: box.boxName,
  //     value: box.id,
  //     desc: box.decks.map((deck: any) => ({
  //       id: deck.id,
  //       title: deck.title,
  //       description: deck.description,
  //     })),
  //   }));

  const handleCreateBox = async (data: FormValuesBox) => {
    console.log(data);
    try {
      if (!user.id) return;
      const axiosCall = createBox(user.id, data);
      const response = await callEndpoint(axiosCall);
      handleDialogBox();
      setBoxes((prevBoxes: any) => [...prevBoxes, response.data]);
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
  return (
    <>
      <SpeedDialButton
        handleDialogDeck={handleDialogDeck}
        handleDialogBox={handleDialogBox}
      />
      <TabBoxes
        data={data}
        handleDialogBox={handleDialogBox}
        openDialogBox={openDialogBox}
        handleCreateBox={handleCreateBox}
      />
      <TabDecks
        openDialogDeck={openDialogDeck}
        openDialogFlashcards={openDialogFlashcards}
        handleDialogDeck={handleDialogDeck}
        handleCreateDeck={handleCreateDeck}
        handleDialogFlashcards={handleDialogFlashcards}
        handleCreateFlashcards={handleCreateFlashcards}
        createdDeck={createdDeck}
        boxes={boxes}
      />

      {data && data.length > 0 ? (
        <Tabs value={data?.[0]?.value}>
          <TabsHeader className="w-full overflow-x-scroll scrollbar-thin">
            {data.map(({ label, value }) => (
              <TabMT
                className="max-w-[50%] md:max-w-72 md:w-72 flex-shrink-0"
                key={value}
                value={value}
                defaultValue="All"
              >
                {label}
              </TabMT>
            ))}
          </TabsHeader>
          <TabsBody
            animate={{
              initial: { y: -250 },
              mount: { y: 0 },
              unmount: { y: 350 },
            }}
          >
            {' '}
            <CardsDeck data={data} />
          </TabsBody>
        </Tabs>
      ) : (
        <Tabs value="All">
          <TabsHeader className="w-full overflow-x-scroll scrollbar-thin">
            <TabMT
              className="max-w-[50%] md:max-w-72 md:w-72 flex-shrink-0 "
              key="All"
              value="All"
            >
              All
            </TabMT>
          </TabsHeader>
          <TabsBody
            animate={{
              initial: { y: -250 },
              mount: { y: 0 },
              unmount: { y: 350 },
            }}
          >
            <CardsDeck />
          </TabsBody>
        </Tabs>
      )}
    </>
  );
};
