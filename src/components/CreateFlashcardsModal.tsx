import { FC, useState } from 'react';
import { DialogWithForm } from './Dialog';
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Input,
  Option,
  Select,
  Typography,
} from '@material-tailwind/react';

interface CreateFlashcardsModalProps {
  open: boolean;
  handleClose: () => void;
  //   deckId: string;
  //   submitForm: (data: FormValuesDeck) => void;
}
import { useForm } from 'react-hook-form';
import { FormValuesDeck } from './TabBoxes';
export const CreateFlashcardsModal: FC<CreateFlashcardsModalProps> = ({
  open,
  handleClose,
  //   deckId,
  //   submitForm,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValuesDeck>({
    defaultValues: {
      //   boxId: allBox?.id,
    },
  });

  //   const handleBoxChange = (value: string) => setValue('boxId', value);
  return (
    <DialogWithForm open={open} handler={handleClose}>
      <Card className="mx-auto w-full max-w-[30rem]">
        <form>
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
              Subject <span className="text-red-400">*</span>
            </Typography>
            <Typography className="-mb-2" variant="small">
              Enter the main subject or theme for your flashcards. Make sure it
              is related to your deck.
            </Typography>
            <Input
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
              placeholder="e.g., Industrial revolution"
              size="lg"
              className=" !border-t-blue-gray-200 focus:!border-lavender-600"
              //   {...register('title', { required: 'Subject is required' })}
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
              Provide a detailed description of the topic. The more specific you
              are, the more accurately the flashcards will be generated.
            </Typography>

            <Input
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
              placeholder="e.g., A historical period of major industrialization between the 18th and 19th centuries."
              size="lg"
              className=" !border-t-blue-gray-200 focus:!border-lavender-600"
              //   {...register('description')}
            />

            <Typography className="-mb-2" variant="h6">
              Number of Flashcards <span className="text-red-400">*</span>
            </Typography>

            <Typography className="-mb-2" variant="small">
              Specify how many flashcards you'd like to generate for this topic.
            </Typography>

            <Select
              label="Select a number"
              color="purple"
              placeholder="Select the number of flashcards"
              size="lg"
            >
              <Option>
                <Typography variant="small">1</Typography>
              </Option>
            </Select>

            <Typography className="-mb-2" variant="h6">
              Difficult level <span className="text-red-400">*</span>
            </Typography>

            <Typography className="-mb-2" variant="small">
              Choose the difficulty level for the flashcards based on the target
              audience.
            </Typography>

            <ButtonGroup ripple={true} size="sm" className="gap-1 divide-none">
              <Button className="rounded-md bg-green-800">Easy</Button>
              <Button className="rounded-md bg-orange-800">Medium</Button>
              <Button className="rounded-md bg-red-800">Hard</Button>
            </ButtonGroup>
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
