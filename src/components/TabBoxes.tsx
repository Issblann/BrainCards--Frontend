import { Tabs, TabsHeader, TabsBody, Tab } from '@material-tailwind/react';
import { CardDeck } from './CardDeck';
import { useFetchAndLoad } from '../hooks';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppStore } from '../redux/store';
import { getBoxesByUserId } from '../services/boxes.service';
import Box from '../models/Box';

export const TabBoxes = () => {
  const { loading, callEndpoint } = useFetchAndLoad();
  const [boxes, setBoxes] = useState<Box[]>([]);
  const user = useSelector((store: AppStore) => store.user);
  const getBoxesWithDecks = async () => {
    try {
      if (!user.id) return;
      const axiosCall = getBoxesByUserId(user.id);
      const response = await callEndpoint(axiosCall);
      console.log(response.data, 'response.data');
      setBoxes(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      throw new Error(error as string);
    }
  };

  useEffect(() => {
    getBoxesWithDecks();
  }, [user.id]);
  const data = boxes.map((box) => ({
    label: box.boxName,
    value: box.id,
    desc: box.decks.map((deck: any) => ({
      id: deck.id,
      title: deck.title,
      description: deck.description,
    })),
  }));

  console.log(data);
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
    <div className="w-full">
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
