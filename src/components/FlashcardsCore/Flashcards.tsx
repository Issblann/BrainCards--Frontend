import React from 'react';
import { useParams } from 'react-router-dom';

export const Flashcards = () => {
  const { deckId } = useParams();
  console.log(deckId);

  return (
    <div>
      <h1 className="text-black">FLASHCARDS ID : {deckId}</h1>
    </div>
  );
};
