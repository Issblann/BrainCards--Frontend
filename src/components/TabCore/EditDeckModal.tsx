import { useEffect } from 'react';
import { DialogWithForm } from '../Dialog';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Typography,
} from '@material-tailwind/react';

import { useForm } from 'react-hook-form';
import { FormValuesDeck } from '../../services/decks.service';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store/store';
import { toggleDialogEditDeck } from '../../redux/slices';
import { DeckEditPayload, thunks } from '../../redux/slices/decks/thunks';

export const EditDeckModal = ({
}) => {
   const { openEditDeckDialog, deckSelected} = useSelector((state: RootState) => state.decks);
  const user = useSelector((store: RootState) => store.user);
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors},
  } = useForm<FormValuesDeck>();

   useEffect(() => {
      if (user.id) {
        dispatch(thunks.getDecksByUser(user.id));
      }
    }, [user.id, deckSelected]);

    useEffect(() => {
  if (deckSelected) {
    reset({
      title: deckSelected.title || '',
      description: deckSelected.description || '',
      boxId: deckSelected.boxId || '',
    });
  }
}, [deckSelected, reset]);

  const handleEditDeck = async (data: FormValuesDeck) => {
        try {
          if (!user.id) return;
          if (!deckSelected?.id) throw new Error('Deck ID is required');
          const response = dispatch(thunks.updateDeck({ deckId: deckSelected.id, data: { ...data } as Partial<DeckEditPayload> })).unwrap();
          reset();

          return response;
        } catch (error) {
          console.error(error);
          throw new Error(error as string);
        }
      };
  const closeModal = () => {
    dispatch(toggleDialogEditDeck());
  }

  return (
    <>
      <DialogWithForm open={openEditDeckDialog} handler={closeModal}>
        <Card className="mx-auto w-full max-w-[30rem]">
          <form onSubmit={handleSubmit(handleEditDeck)}>
            <CardBody className="flex px-6 pt-6 pb-2 flex-col gap-4">
              <Typography variant="h4" color="blue-gray">
                Edit deck
              </Typography>
              <Typography
                className="mb-3 font-normal"
                variant="paragraph"
                color="gray"
              >
                Edit you deck
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
                defaultValue={deckSelected?.title || ''}
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
                Provide a detailed description of the subject.
              </Typography>
              <Input
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
                defaultValue={deckSelected?.description || ''}
                placeholder="Insert a description"
                size="lg"
                className=" !border-t-blue-gray-200 focus:!border-lavender-600"
                crossOrigin={'true'}
                {...register('description')}
              />
            </CardBody>
            <CardFooter className="pt-0 flex flex-col text-center gap-4">
              <Button
                type="submit"
                size="sm"
                className="flex w-full justify-center text-sm p-2 normal-case items-center gap-3 bg-lavender-600 border hover:bg-lavender-400 text-white"
              >
                Update deck
              </Button>
            </CardFooter>
          </form>
        </Card>
      </DialogWithForm>
    </>
  );
};
