import { Tabs, TabsHeader, TabsBody, Tab } from '@material-tailwind/react';
import { CardDeck } from './CardDeck';
import { useFetchAndLoad } from '../hooks';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppStore } from '../redux/store';
import { createBox, getBoxesByUserId } from '../services/boxes.service';
import Box from '../models/Box';
import { SpeedDialButton } from './SpeedDialButton';
import { CreateDeckModal } from './CreateDeckModal';
import { CreateBoxModal } from './CreateBoxModal';
import { createDeck } from '../services/decks.service';

export type FormValuesBox = {
  boxName: string;
};
export type FormValuesDeck = {
  title: string;
  description?: string;
  boxId?: string;
};

export const TabBoxes = () => {
  const { loading, callEndpoint } = useFetchAndLoad();
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [openDialogDeck, setOpenDialogDeck] = useState<boolean>(false);
  const [openDialogBox, setOpenDialogBox] = useState<boolean>(false);
  const handleOpenDialogDeck = () => setOpenDialogDeck((cur) => !cur);
  const handleOpenDialogBox = () => setOpenDialogBox((cur) => !cur);
  const user = useSelector((store: AppStore) => store.user);
  const [trigger, setTrigger] = useState(false);
  const getBoxesWithDecks = async () => {
    try {
      if (!user.id) return;
      const axiosCall = getBoxesByUserId(user.id);
      const response = await callEndpoint(axiosCall);
      setBoxes(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      throw new Error(error as string);
    }
  };

  const handleCreateBox = async (data: FormValuesBox) => {
    console.log(data);
    try {
      if (!user.id) return;
      const axiosCall = createBox(user.id, data.boxName);
      const response = await callEndpoint(axiosCall);
      handleOpenDialogBox();
      setBoxes((prevBoxes) => [...prevBoxes, response.data]);
      console.log(response.data);
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
      handleOpenDialogDeck();
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
  console.log(boxes);
  return (
    <div className="w-full flex flex-col gap-4">
      <SpeedDialButton
        onOpenDialogDeck={handleOpenDialogDeck}
        onOpenDialogBox={handleOpenDialogBox}
      />
      <CreateDeckModal
        open={openDialogDeck}
        handleClose={handleOpenDialogDeck}
        boxes={boxes}
        submitForm={handleCreateDeck}
      />
      <CreateBoxModal
        open={openDialogBox}
        handleClose={handleOpenDialogBox}
        submitForm={handleCreateBox}
      />
      {data && data.length > 0 ? (
        <Tabs value={data?.[0]?.value}>
          <TabsHeader className="w-full">
            {data.map(({ label, value }) => (
              <Tab
                className="max-w-72"
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
          <TabsHeader className="w-full">
            <Tab className="max-w-72" key="All" value="All">
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
