import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchAndLoad } from '../../hooks';
import { getDeckById } from '../../services/decks.service';
import Deck from '../../models/Deck';
import { Carousel } from './Carousel';

import { HiArrowNarrowLeft } from 'react-icons/hi';
import { BackButton } from '../BackButton';
import { MdEdit } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store/store';
import { setEditModeFlashcards } from '../../redux/slices';
import { DeleteFlashcardModal } from './DeleteFlashcard';

export const Flashcards = () => {
  const [flippedCard, setFlippedCard] = useState<Record<string, boolean>>({});
  const [currentCard, setCurrentCard] = useState<number>(1);
  const { deckId } = useParams();
  const { data, loading, callEndpoint } = useFetchAndLoad<Deck>();
   const {isEditMode} = useSelector((store: RootState) => store.flashcards);
  const dispatch = useDispatch<AppDispatch>();
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
      <BackButton
        title={'Back'}
        className="w-[130px]"
        icon={<HiArrowNarrowLeft />}
      />
      <h1 className="text-4xl text-center mb-10 font-semibold">
        Aprende con BrainCards
      </h1>
      <div className=" flex flex-col justify-center items-center gap-5">
           <h3 className="text-2xl text-center mb-10 first-letter:uppercase">
          {data?.title}
        </h3>

          <button
        className="text-lavender-80 hover:text-lavender-900 text-end w-[65%]"
        onClick={() => dispatch(setEditModeFlashcards())}
        title="Editar flashcards"
      >
        <span className="ml-2"> {isEditMode ? 'Salir modo edición' : 'Editar flashcards'} </span>
      </button>
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

         <DeleteFlashcardModal/>
    </section>
  );
};
