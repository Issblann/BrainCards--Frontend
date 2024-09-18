import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchAndLoad } from '../../hooks';
import { HiArrowNarrowLeft, HiArrowNarrowRight } from 'react-icons/hi';

import 'swiper/swiper-bundle.css';
import './flashcards.styles.css';
import { getDeckById } from '../../services/decks.service';

import Deck from '../../models/Deck';
import Flashcard from '../../models/Flashcards';
import { Button } from '@material-tailwind/react';

export const Flashcards = () => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [currentCard, setCurrentCard] = useState<number>(1);
  const { deckId } = useParams();

  const { data, loading, callEndpoint } = useFetchAndLoad<Deck>();
  const flashcardsLength = data?.flashCards?.length || 0;

  const swiperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const swiperEl = swiperRef.current;

    if (swiperEl) {
      swiperEl.addEventListener('progress', (e: any) => {
        const [swiper, progress] = e.detail;
        console.log(progress);
      });

      swiperEl.addEventListener('slidechange', () => {
        console.log('slide changed');
      });
    }
  }, []);
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

  const handleFlipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const handleCards = () => {
    if (isFlipped) {
      setIsFlipped(false);
    }
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
        <div className=" max-w-6xl h-[500px] w-full flex min-h-full mx-auto bg-transparent items-center">
          <swiper-container
            ref={swiperRef}
            slides-per-view={1}
            navigation={true}
            pagination={false}
            draggable={true}
            navigation-prev-el=".swiper-button-prev"
            navigation-next-el=".swiper-button-next"
          >
            {data?.flashCards?.map((flashCard: Flashcard) => (
              <swiper-slide onClick={handleFlipCard} key={flashCard.id}>
                <div className="flip-card">
                  <div
                    className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}
                  >
                    <div className="flip-card-front">
                      <div className="flex justify-between p-2 items-center w-full">
                        <p> Question</p>
                        <small>
                          {currentCard}/{flashcardsLength}
                        </small>
                      </div>
                      <p className="text-3xl text-center w-11/12 mx-auto">
                        {flashCard.question}
                      </p>
                      <Button
                        onClick={handleFlipCard}
                        className="normal-case"
                        variant="text"
                      >
                        Click to flip
                      </Button>
                    </div>

                    <div className="flip-card-back">
                      <div className="flex justify-between p-2 items-center w-full">
                        <p> Answer</p>
                        <small>
                          {currentCard}/{flashcardsLength}
                        </small>
                      </div>
                      <p className="text-2xl text-center w-11/12 mx-auto">
                        {flashCard.answer}
                      </p>
                      <Button
                        onClick={handleFlipCard}
                        className="normal-case"
                        variant="text"
                      >
                        Click to flip
                      </Button>
                    </div>
                  </div>
                </div>
              </swiper-slide>
            ))}
          </swiper-container>
        </div>

        <div className="flex gap-16 mt-10">
          <div className="swiper-button-prev" onClick={handlePrevCard}>
            <HiArrowNarrowLeft />
          </div>
          <div className="swiper-button-next" onClick={handleNextCard}>
            <HiArrowNarrowRight />
          </div>
        </div>
      </div>
    </section>
  );
};
