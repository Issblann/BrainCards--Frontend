import { FC, useEffect, useState } from 'react';
import { DialogWithForm } from './Dialog';
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

interface CreateDeckModalProps {
  open: boolean;
  handleClose: () => void;
  boxes: Box[];
  submitForm: (data: FormValuesDeck) => void;
}
import { HiArrowLongRight } from 'react-icons/hi2';
import Box from '../models/Box';
import { set, useForm } from 'react-hook-form';
import { FormValuesDeck } from './TabBoxes';
import { CreateFlashcardsModal } from './CreateFlashcardsModal';
export const CreateDeckModal: FC<CreateDeckModalProps> = ({
  open,
  handleClose,
  boxes,
  submitForm,
}) => {
  const [isWithinBox, setIsWithinBox] = useState<boolean>(false);
  const [openDialogFlashcards, setOpenDialogFlashcards] =
    useState<boolean>(false);

  const allBox = boxes.find((box) => box.boxName === 'All');
  const boxesWithoutAllBox = boxes.filter((box) => box.boxName !== 'All');
  const handleDialogFlashcards = () => setOpenDialogFlashcards((cur) => !cur);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValuesDeck>({
    defaultValues: {
      boxId: allBox?.id,
    },
  });

  const handleBoxChange = (value: string) => setValue('boxId', value);

  return (
    <>
      <DialogWithForm open={open} handler={handleClose}>
        <Card className="mx-auto w-full max-w-[30rem]">
          <form onSubmit={handleSubmit(submitForm)}>
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
              <Input
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
                placeholder="Insert a title for your deck"
                size="lg"
                className=" !border-t-blue-gray-200 focus:!border-lavender-600"
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
              <Input
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
                placeholder="Insert a description"
                size="lg"
                className=" !border-t-blue-gray-200 focus:!border-lavender-600"
                {...register('description')}
              />
              <div className="-ml-2.5 -mt-3">
                <Checkbox
                  onChange={() => setIsWithinBox(!isWithinBox)}
                  defaultChecked={isWithinBox}
                  ripple={true}
                  label={
                    <Typography className="text-xs md:text-sm" color="gray">
                      Create withing an existing box
                    </Typography>
                  }
                />
              </div>
              {isWithinBox && (
                <Select
                  label="Select a box"
                  color="purple"
                  placeholder="Select an existing box"
                  size="lg"
                  onChange={(e) => {
                    handleBoxChange(e as string);
                  }}
                >
                  {boxesWithoutAllBox.map((box) => (
                    <Option key={box.id} value={box.id}>
                      <Typography variant="small">{box.boxName}</Typography>
                    </Option>
                  ))}
                </Select>
              )}
              <Typography className="-mb-2 font-semibold" variant="paragraph">
                FlashCards
              </Typography>

              <Button
                onClick={() => {
                  handleClose();
                  setOpenDialogFlashcards(true);
                }}
                size="sm"
                className="flex w-full justify-center text-sm p-2 normal-case items-center gap-3 bg-white border border-black hover:bg-lavender-background text-black"
              >
                Create flashcards automatically
                <HiArrowLongRight className="size-6" />
              </Button>
            </CardBody>
            <CardFooter className="pt-0 flex flex-col text-center">
              <span className="pb-2">--- or ---</span>
              <Button
                className="normal-case"
                type="submit"
                size="lg"
                variant="text"
                fullWidth
              >
                Continue without flashcards
              </Button>
            </CardFooter>
          </form>
        </Card>
      </DialogWithForm>
      <CreateFlashcardsModal
        open={openDialogFlashcards}
        handleClose={handleDialogFlashcards}
      />
    </>
  );
};
