import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchAndLoad } from '../../hooks';
import { getFlashcardsByDeckId } from '../../services/flashcards.service';
import { Carousel, IconButton } from '@material-tailwind/react';
import { HiArrowNarrowLeft, HiArrowNarrowRight } from 'react-icons/hi';
import { CarouselStylesType } from '@material-tailwind/react';
export const Flashcards = () => {
  const { deckId } = useParams();
  console.log(deckId);
  const { loading, callEndpoint } = useFetchAndLoad();

  interface CarouselArrowProps {
    loop: boolean;
    handlePrev?: () => void;
    handleNext?: () => void;
    firstIndex: boolean;
    lastIndex?: boolean;
  }
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

  //   const theme = {
  //     carousel: {
  //         defaultProps: {
  //             prevArrow: ({loop, handlePrev, firstIndex}:CarouselArrowProps) => {
  //                 return (
  //                     <IconButton onClick={handlePrev} disabled={!loop && firstIndex} className="rounded-full">
  //                     <HiArrowNarrowLeft size={24} />
  //                   </IconButton>
  //                 )
  //             }},

  //             nextArrow: ({loop, handleNext, lastIndex}: CarouselArrowProps) => {
  //                 return (
  //                     <IconButton onClick={handleNext} disabled={!loop && lastIndex} className="rounded-full">
  //                     <HiArrowNarrowRight size={24} />
  //                   </IconButton>
  //                 )
  //             }
  //         }
  //     }
  //   }
  return (
    <section className="flex flex-col gap-4 w-full">
      <h1 className="text-4xl text-center">Aprende con BrainCards</h1>
      <div className="mt-10 flex flex-col justify-center items-center gap-5">
        <h3 className="text-2xl text-center">Titulo deck</h3>

        <Carousel
          loop
          navigation={false as any}
          className="shadow-lg min-h-full mx-auto max-w-6xl h-[500px] flex bg-lavender-600  items-center rounded-xl "
        >
          <div className=" w-full text-center min-h-full flex p-4 py-10 flex-col justify-between h-full rounded-xl">
            <div className="flex flex-col h-full justify-center">
              <p>Pregunta 1</p>
              <p>Respuesta</p>
            </div>
            <span className="text-xs text-gray-800">click to flip</span>
          </div>
          <div className=" w-full text-center min-h-full flex p-4 py-10 flex-col justify-between h-full rounded-xl">
            <div className="flex flex-col h-full justify-center">
              <p>Pregunta 2</p>
              <p>Respuesta</p>
            </div>
            <span className="text-xs text-gray-800">click to flip</span>
          </div>
          <div className=" w-full text-center min-h-full flex p-4 py-10 flex-col justify-between h-full rounded-xl">
            <div className="flex flex-col h-full justify-center">
              <p>Pregunta 3</p>
              <p>Respuesta</p>
            </div>
            <span className="text-xs text-gray-800">click to flip</span>
          </div>
        </Carousel>
        {/* <div className="flex gap-4">
          <IconButton className="rounded-full">
            <HiArrowNarrowLeft size={24} />
          </IconButton>
          <IconButton className="rounded-full">
            <HiArrowNarrowRight size={24} />
          </IconButton>
        </div> */}
      </div>
    </section>
  );
};
