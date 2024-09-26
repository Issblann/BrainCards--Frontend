import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchAndLoad } from '../../hooks';
import { getDeckById } from '../../services/decks.service';
import Deck from '../../models/Deck';
import { Carousel } from './Carousel';

export const Flashcards = () => {
  const [flippedCard, setFlippedCard] = useState<Record<string, boolean>>({});
  const [currentCard, setCurrentCard] = useState<number>(1);
  const { deckId } = useParams();
  const { data, loading, callEndpoint } = useFetchAndLoad<Deck>();

  useEffect(() => {
    getDeckWithFlashcards();
  }, [deckId]);

  const getDeckWithFlashcards = async () => {
    try {
      if (!deckId) return;
      const axiosCall = getDeckById(deckId);
      await callEndpoint(axiosCall);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFlipCard = (flashcardId: string) => {
    setFlippedCard((prev) => ({ ...prev, [flashcardId]: !prev[flashcardId] }));
  };

  const handleCards = () => {
    setFlippedCard({});
  };

  const handleNextCard = () => {
    handleCards();
    setCurrentCard((prev) => prev + 1);
  };

  const handlePrevCard = () => {
    handleCards();
    setCurrentCard((prev) => prev - 1);
  };

  return (
    <section className="flex flex-col gap-4 w-full">
      <h1 className="text-4xl text-center mb-10 font-semibold">
        Aprende con BrainCards
      </h1>
      <div className=" flex flex-col justify-center items-center gap-5">
        <h3 className="text-2xl text-center mb-10 first-letter:uppercase">
          {data?.title}
        </h3>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <Carousel
            flashcards={data?.flashCards}
            flippedCard={flippedCard}
            currentCard={currentCard}
            handleFlipCard={handleFlipCard}
            handleNextCard={handleNextCard}
            handlePrevCard={handlePrevCard}
          />
        )}
      </div>
    </section>
  );
};
