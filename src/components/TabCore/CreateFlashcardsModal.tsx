import { FC, useState } from 'react';

import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Option,
  Select,
  Typography,
} from '@material-tailwind/react';

interface CreateFlashcardsModalProps {
  // submitFormDeck: (data: DeckPayload) => void;
  deck: any;
  setDeck: (deck: any) => void;
  resetFormDeck: () => void;
}
import { useForm } from 'react-hook-form';

import { FormValuesFlashcards } from '../../services/flashcards.service';
import { DialogWithForm } from '../Dialog';
import { DifficultyLevelEnum } from '../../models/Flashcards';
import { generateFlashcardQuantities } from '../../utilities/generateFlashcardQuantities';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store/store';
import { toggleDialogFlashcard } from '../../redux/slices';
import { DeckPayload } from '../../redux/slices/decks/thunks';
import { thunks } from '../../redux/slices/flashcards/thunks';
import { thunks as deckThunks } from '../../redux/slices/decks/thunks';
import { useNavigate } from 'react-router-dom';
import { PrivateRoutes } from '../../models';

export const CreateFlashcardsModal: FC<CreateFlashcardsModalProps> = ({
  deck,
  setDeck,
  resetFormDeck
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<FormValuesFlashcards>({
    defaultValues: {
      topic: deck?.title,
      description: deck?.description,
    },
  });
  const [_, setSelectedDifficulty] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((store: RootState) => store.user);
  const quantityFlashcards = generateFlashcardQuantities(1, 10);
  const openDialogFlashcard = useSelector((state: RootState) => state.flashcards.openDialogFlashcard);
  const handleQuantity = (value: string) =>
    setValue('quantityFlashcards', parseInt(value));
  const handleDifficultySelect = (value: DifficultyLevelEnum) => {
    setSelectedDifficulty(value);
    setValue('difficultyLevel', value);
  };
  
   const closeModal = () => {
      dispatch(toggleDialogFlashcard()); 
      setDeck(null);
      resetFormDeck();
    }
  const handleCreateFlashcards = async (data: FormValuesFlashcards) => {
    try {
      if (!user.id) return;
      const responseDeck = await dispatch(deckThunks.createADeck({ userId: user.id, data: { ...deck } as Partial<DeckPayload> })).unwrap();
      const finalData = {
        ...data,
        topic: deck?.title,
        description: deck?.description,
      }
      const response = await dispatch(thunks.createFlashcards({deckId: responseDeck?.id, data: finalData as Partial<DeckPayload> })).unwrap();
      navigate(`private/${PrivateRoutes.FLASHCARDS}/${responseDeck?.id}`);
      return response;
    } catch (error) {
      console.error(error);
      throw new Error(error as string);
    }
  };
  const difficultyLevels = [
    {
      label: 'Easy',
      value: DifficultyLevelEnum.EASY,
      color: 'bg-green-700',
    },
    {
      label: 'Medium',
      value: DifficultyLevelEnum.MEDIUM,
      color: 'bg-orange-700',
    },
    { label: 'Hard', value: DifficultyLevelEnum.HARD, color: 'bg-red-700' },
  ];
  return (
    <DialogWithForm open={openDialogFlashcard} handler={closeModal}>
      <Card className="mx-auto w-full max-w-[30rem]">
        <form onSubmit={handleSubmit(handleCreateFlashcards)}>
          <CardBody className="flex px-6 pt-6 pb-2 flex-col gap-5">
            <div>
              <Typography variant="h4" color="blue-gray">
                Automated flashcards
              </Typography>
              <Typography
                className="font-normal"
                variant="paragraph"
                color="gray"
              >
                Create yours flashcards automatically
              </Typography>
            </div>

            <Typography className="-mb-2" variant="h6">
              Number of Flashcards <span className="text-red-400">*</span>
            </Typography>

            <Typography className="-mb-2" variant="small">
              Specify how many flashcards you'd like to generate for this
              subject.
            </Typography>

            <Select
              label="Select a number"
              color="purple"
              placeholder="Select the number of flashcards"
              size="lg"
              {...register('quantityFlashcards', {
                required: 'The number of flashcards is required',
              })}
              onChange={(e) => {
                handleQuantity(e as string);
                trigger('quantityFlashcards');
              }}
            >
              {quantityFlashcards.map((quantity) => (
                <Option
                  className="bg-none"
                  key={quantity}
                  value={quantity.toString()}
                >
                  <Typography variant="small">{quantity}</Typography>
                </Option>
              ))}
            </Select>
            {errors.quantityFlashcards && (
              <Typography variant="small" color="red">
                {errors.quantityFlashcards.message}
              </Typography>
            )}
            <Typography className="-mb-2" variant="h6">
              Difficult level <span className="text-red-400">*</span>
            </Typography>

            <Typography className="-mb-2" variant="small">
              Choose the difficulty level for the flashcards based on the target
              audience.
            </Typography>

            <ButtonGroup
              ripple={true}
              size="sm"
              className="gap-1 divide-none"
              {...register('difficultyLevel', {
                required: 'The difficulty level is required',
              })}
            >
              {difficultyLevels.map((level) => (
                <Button
                  onClick={() => {
                    handleDifficultySelect(level.value);
                    trigger('difficultyLevel');
                  }}
                  key={level.value}
                  type="button"
                  className={`rounded-md ${level.color} focus:opacity-[0.50]  focus:shadow-none`}
                >
                  {level.label}
                </Button>
              ))}
            </ButtonGroup>

            {errors.difficultyLevel && (
              <Typography variant="small" color="red">
                {errors.difficultyLevel.message}
              </Typography>
            )}
          </CardBody>
          <CardFooter className="flex flex-col text-center">
            <Button
              className="normal-case"
              type="submit"
              size="lg"
              variant="filled"
              fullWidth
            >
              Generate
            </Button>
          </CardFooter>
        </form>
      </Card>
    </DialogWithForm>
  );
};
