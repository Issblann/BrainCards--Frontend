import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchAndLoad } from '../../hooks';
import { getFlashcardsByDeckId } from '../../services/flashcards.service';

export const Flashcards = () => {
  const { deckId } = useParams();
  console.log(deckId);
  const { loading, callEndpoint } = useFetchAndLoad();

  const getFlashcards = async () => {
    try {
      if (!deckId) return;
      const axiosCall = getFlashcardsByDeckId(deckId);
      const response = await callEndpoint(axiosCall);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFlashcards();
  }, [deckId]);
  return (
    <div>
      <h1 className="text-black">FLASHCARDS ID : {deckId}</h1>
    </div>
  );
};
