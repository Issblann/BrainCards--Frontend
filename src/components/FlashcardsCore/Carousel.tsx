import React, { FC, useEffect, useRef } from 'react';
import { Button } from '@material-tailwind/react';
import Flashcard from '../../models/Flashcards';
import { HiArrowNarrowLeft, HiArrowNarrowRight } from 'react-icons/hi';

import 'swiper/swiper-bundle.css';
import './flashcards.styles.css';
interface CarouselProps {
  flashcards: Flashcard[] | undefined;
  flippedCard: Record<string, boolean>;
  currentCard: number;
  handleFlipCard: (flashcardId: string) => void;
  handleNextCard: () => void;
  handlePrevCard: () => void;
}

export const Carousel: FC<CarouselProps> = ({
  flashcards,
  flippedCard,
  currentCard,

  handleFlipCard,
  handleNextCard,
  handlePrevCard,
}) => {
  const swiperRef = useRef<HTMLElement>(null);
  const flashcardsLength = flashcards?.length;

  return (
    <div className="max-w-6xl h-[500px] w-full flex flex-col min-h-full  bg-transparent items-center">
      <swiper-container
        ref={swiperRef}
        slides-per-view={1}
        navigation={true}
        pagination={false}
        draggable={false}
        effect="cards"
        grabCursor={true}
        centeredSlides={true}
        // loop={true}
        navigation-prev-el=".swiper-button-prev"
        navigation-next-el=".swiper-button-next"
      >
        {flashcards?.map((flashCard) => (
          <swiper-slide
            onClick={() => handleFlipCard(flashCard.id)}
            key={flashCard.id}
          >
            <div className="flip-card">
              <div
                className={`flip-card-inner ${
                  flippedCard[flashCard.id] ? 'flipped' : ''
                }`}
              >
                <div className="flip-card-front">
                  <div className="flex justify-between p-2 items-center w-full">
                    <p> Question</p>
                    <small>
                      {currentCard}/{flashcardsLength}
                    </small>
                  </div>
                  <p className="text-md md:text-3xl text-center w-11/12 mx-auto">
                    {flashCard.question}
                  </p>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFlipCard(flashCard.id);
                    }}
                    className="normal-case"
                    variant="text"
                  >
                    Click to flip
                  </Button>
                </div>

                <div className="flip-card-back">
                  <div className=" flex justify-between p-2 items-center w-full">
                    <p> Answer</p>
                    <small>
                      {currentCard}/{flashcardsLength}
                    </small>
                  </div>
                  <p className="text-md md:text-3xl text-center w-11/12 mx-auto">
                    {flashCard.answer}
                  </p>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFlipCard(flashCard.id);
                    }}
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
      <div className="flex gap-16 mt-10">
        <button className="swiper-button-prev" onClick={handlePrevCard}>
          <HiArrowNarrowLeft />
        </button>
        <button className="swiper-button-next" onClick={handleNextCard}>
          <HiArrowNarrowRight />
        </button>
      </div>
    </div>
  );
};
