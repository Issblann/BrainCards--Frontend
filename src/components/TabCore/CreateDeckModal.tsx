import { useEffect, useState } from 'react';
import { DialogWithForm } from '../Dialog';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Checkbox,
  Input,
  Option,
  Select,
  Typography,
} from '@material-tailwind/react';


import { HiArrowLongRight } from 'react-icons/hi2';

import { useForm } from 'react-hook-form';

import Box from '../../models/Box';
import { FormValuesDeck } from '../../services/decks.service';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store/store';
import { setDialogFlashcardOpen, toggleDialogDeck } from '../../redux/slices';
import { DeckPayload, thunks } from '../../redux/slices/decks/thunks';
import { thunks as boxesThunks } from '../../redux/slices/boxes/thunks';
import { CreateFlashcardsModal } from './CreateFlashcardsModal';

export const CreateDeckModal = ({
}) => {
  const [isWithinBox, setIsWithinBox] = useState<boolean>(false);
  const [deck, setDeck] = useState<any>(null);
  const {data} = useSelector((store: RootState) => store.boxes);
  const user = useSelector((store: RootState) => store.user);
  const openDialogDeck = useSelector((state: RootState) => state.decks.openDialogDeck);
  const allBox = data.find((box: Box) => box.boxName === 'All');
  const boxesWithoutAllBox = data.filter((box: Box) => box.boxName !== 'All');
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors, isValid},
  } = useForm<FormValuesDeck>({
    defaultValues: {
      boxId: allBox?.id || ''
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (allBox?.id) {
      setValue('boxId', allBox.id);
    }
  }, [allBox?.id]);

  const handleBoxChange = (value: string) => setValue('boxId', value);
  const closeModal = () => {
    dispatch(toggleDialogDeck());
  }

  const handleCreateDeck = async (data: FormValuesDeck) => {
     try {
       if (!user.id) return;
      const response = await dispatch(thunks.createADeck({ userId: user.id, data: { ...data } as Partial<DeckPayload> })).unwrap();
      dispatch(boxesThunks.getBoxesByUser(user.id));
      return response;
     } catch (error) {
       console.error(error);
       throw new Error(error as string);
     }
   };

  const handleOpenFlashcardModal = async () => {
    setDeck(getValues());
    closeModal();
    dispatch(setDialogFlashcardOpen(true)); 
  };

  console.log('deck', deck);
  return (
    <>
      <DialogWithForm open={openDialogDeck} handler={closeModal}>
        <Card className="mx-auto w-full max-w-[30rem]">
          <form onSubmit={handleSubmit(handleCreateDeck)}>
            <CardBody className="flex px-6 pt-6 pb-2 flex-col gap-4">
              <Typography variant="h4" color="blue-gray">
                New Deck
              </Typography>
              <Typography
                className="mb-3 font-normal"
                variant="paragraph"
                color="gray"
              >
                Create a new deck
              </Typography>

              <Typography className="-mb-2" variant="h6">
                Title <span className="text-red-400">*</span>
              </Typography>

              <Typography className="-mb-2" variant="small">
                Enter the main subject or theme for your flashcards.
              </Typography>
              <Input
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
                placeholder="Insert a title for your deck"
                size="lg"
                className=" !border-t-blue-gray-200 focus:!border-lavender-600"
                crossOrigin={'true'}
                {...register('title', { required: 'Title is required' })}
              />

              {errors.title && (
                <Typography variant="small" color="red">
                  {errors.title.message}
                </Typography>
              )}
              <Typography className="-mb-2" variant="h6">
                Description
              </Typography>

              <Typography className="-mb-2" variant="small">
                Provide a detailed description of the subject. The more specific
                you are, the more accurately the flashcards will be generated.
              </Typography>
              <Input
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
                placeholder="Insert a description"
                size="lg"
                className=" !border-t-blue-gray-200 focus:!border-lavender-600"
                crossOrigin={'true'}
                {...register('description')}
              />
              <div className="-ml-2.5 -mt-3">
                <Checkbox
                   onChange={() => {
                    setIsWithinBox((prev) => {
                      const newValue = !prev;
                      if (!newValue && allBox?.id) {
                        setValue('boxId', allBox.id);
                      }
                      return newValue;
                    });
                  }}
                  defaultChecked={isWithinBox}
                  ripple={true}
                  label={
                    <Typography className="text-xs md:text-sm" color="gray">
                      Create withing an existing box
                    </Typography>
                  }
                  crossOrigin={'true'}
                />
              </div>
              {isWithinBox && (
                <Select
                  label="Select a box"
                  color="purple"
                  placeholder="Select an existing box"
                  size="lg"
                  value={getValues('boxId')}
                  onChange={(e) => {
                    handleBoxChange(e as string);
                  }}
                >
                  {boxesWithoutAllBox.map((box: Box) => (
                    <Option key={box.id} value={box.id}>
                      <Typography variant="small">{box.boxName}</Typography>
                    </Option>
                  ))}
                </Select>
              )}
            </CardBody>
            <CardFooter className="pt-0 flex flex-col text-center gap-4">
              <Button
                onClick={handleOpenFlashcardModal}
                disabled={!isValid} 
                size="sm"
                className="flex w-full justify-center text-sm p-2 normal-case items-center gap-3 bg-white border border-black hover:bg-lavender-background text-black"
              >
                Create flashcards automatically
                <HiArrowLongRight className="size-6" />
              </Button>
              <span>or</span>
              <Button
                type="submit"
                size="sm"
                className="flex w-full justify-center text-sm p-2 normal-case items-center gap-3 bg-lavender-600 border hover:bg-lavender-400 text-white"
              >
                Create Deck
              </Button>
            </CardFooter>
          </form>
        </Card>
      </DialogWithForm>

      <CreateFlashcardsModal deck={deck} setDeck={setDeck} resetFormDeck={reset}/> 
    </>
  );
};
