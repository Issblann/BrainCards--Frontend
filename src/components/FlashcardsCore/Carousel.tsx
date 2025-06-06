import React, { FC, useRef } from 'react';
import { Button } from '@material-tailwind/react';
import Flashcard from '../../models/Flashcards';
import { HiArrowNarrowLeft, HiArrowNarrowRight, HiOutlineTrash } from 'react-icons/hi';

import 'swiper/swiper-bundle.css';
import './flashcards.styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store/store';
import { setFlashcardId, toggleDeleteFlashcard } from '../../redux/slices';

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
  const {isEditMode} = useSelector((store: RootState) => store.flashcards);
  const dispatch = useDispatch<AppDispatch>()

  const handleToggleDialog = (id:string) => {
  dispatch(toggleDeleteFlashcard()) 
  dispatch(setFlashcardId(id))
};
  return (
    <div className="max-w-6xl h-[500px] w-full flex flex-col min-h-full  bg-transparent items-center">
      <swiper-container
        ref={swiperRef}
        slides-per-view={1}
        navigation={true}
        pagination={false}
        draggable={true}
        effect="cards"
        grabCursor={true}
        centeredSlides={true}
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

                {isEditMode && (
                <button
                  className="absolute bottom-3 right-3"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleDialog(flashCard.id);
                    
                    // setSelectedCardId(flashCard.id);
                    // setShowModal(true);
                  }}
                  title="Eliminar flashcard"
                  >
                  <HiOutlineTrash size={30} />
                </button>
                )}

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
