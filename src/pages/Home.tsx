import { useSelector } from 'react-redux';
import { CardsDeck, Tab, TabBoxes } from '../components';
import { useState } from 'react';
import Box from '../models/Box';
import Deck from '../models/Deck';
import { AppStore } from '../redux/store';
import { useFetchAndLoad } from '../hooks';

export const Home = () => {
  const user = useSelector((store: AppStore) => store.user);
  const [boxes, setBoxes] = useState<Box[]>([]);
  const { loading, callEndpoint } = useFetchAndLoad();
  const [createdDeck, setCreatedDeck] = useState<Deck>();

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="w-full h-full flex  justify-center">
      <Tab
        boxes={boxes}
        setBoxes={setBoxes}
        createdDeck={createdDeck}
        setCreatedDeck={setCreatedDeck}
      />
      <CardsDeck />
    </div>
  );
};
