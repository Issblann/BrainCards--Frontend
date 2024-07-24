import { Tabs, TabsHeader, TabsBody, Tab } from '@material-tailwind/react';
import { CardDeck } from './CardDeck';
import { useFetchAndLoad } from '../hooks';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppStore } from '../redux/store';
import { getDecks } from '../services/decks.service';
import Deck from '../models/Deck';

export const TabBoxes = () => {
  const { loading, callEndpoint } = useFetchAndLoad();
  const [decks, setDecks] = useState<Deck[]>([]);
  const user = useSelector((store: AppStore) => store.user);
  const getDecksHandler = async () => {
    try {
      if (!user.id) return;
      const axiosCall = getDecks(user.id);
      const response = await callEndpoint(axiosCall);
      console.log(response.data);
      setDecks(response.data);
    } catch (error) {
      console.error(error);
      throw new Error(error as string);
    }
  };

  useEffect(() => {
    getDecksHandler();
  }, [user.id]);
  const data = [
    {
      label: 'All',
      value: 'All',
      desc: decks.map((deck) => ({
        id: deck.id,
        title: deck.title,
      })),
    },
    {
      label: 'Countries ',
      value: 'countries',
      desc: [
        {
          id: 1,
          boxName: 'countries',
          title: '10 facts about countries',
        },
      ],
    },
  ];
  const defaultDeck = [
    {
      id: 1,
      boxName: 'All',
      title: 'Sample Deck',
    },
  ];
  return (
    <div className="w-full">
      <Tabs value="html">
        <TabsHeader className="w-full">
          {data.map(({ label, value }) => (
            <Tab className="max-w-72" key={value} value={value}>
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {!user.id ? (
            <CardDeck key="All" value="All" desc={defaultDeck} />
          ) : (
            data.map(({ value, desc }) => (
              <CardDeck key={value} value={value} desc={desc} />
            ))
          )}
        </TabsBody>
      </Tabs>
    </div>
  );
};
