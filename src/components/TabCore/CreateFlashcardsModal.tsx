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
  open: boolean;
  handleClose: () => void;
  submitForm: (data: FormValuesFlashcards) => void;
  deck: Deck | undefined;
}
import { useForm } from 'react-hook-form';

import { FormValuesFlashcards } from '../../services/flashcards.service';
import Deck from '../../models/Deck';
import { DialogWithForm } from '../Dialog';
import { DifficultyLevelEnum } from '../../models/Flashcards';
import { generateFlashcardQuantities } from '../../utilities/generateFlashcardQuantities';

export const CreateFlashcardsModal: FC<CreateFlashcardsModalProps> = ({
  open,
  handleClose,
  submitForm,
  deck,
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
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(
    null
  );

  const quantityFlashcards = generateFlashcardQuantities(1, 10);

  const handleQuantity = (value: string) =>
    setValue('quantityFlashcards', parseInt(value));

  const handleDifficultySelect = (value: DifficultyLevelEnum) => {
    setSelectedDifficulty(value);
    setValue('difficultyLevel', value);
  };

  console.log(selectedDifficulty);
  console.log(errors);
  const difficultyLevels = [
    {
      label: 'Easy',
      value: DifficultyLevelEnum.EASY,
      color: 'green',
    },
    { label: 'Medium', value: DifficultyLevelEnum.MEDIUM, color: 'orange' },
    { label: 'Hard', value: DifficultyLevelEnum.HARD, color: 'red' },
  ];
  return (
    <DialogWithForm open={open} handler={handleClose}>
      <Card className="mx-auto w-full max-w-[30rem]">
        <form onSubmit={handleSubmit(submitForm)}>
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
                  className={`rounded-md bg-${level.color}-700 focus:opacity-[0.65] focus:bg-${level.color} focus:shadow-none`}
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
