import { FC } from 'react';
import { DialogWithForm } from './Dialog';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Checkbox,
  Input,
  Typography,
} from '@material-tailwind/react';

interface CreateDeckModalProps {
  open: boolean;
  handleClose: () => void;
}
import { HiArrowLongRight } from 'react-icons/hi2';
export const CreateDeckModal: FC<CreateDeckModalProps> = ({
  open,
  handleClose,
}) => {
  return (
    <DialogWithForm open={open} handler={handleClose}>
      <Card className="mx-auto w-full max-w-[30rem]">
        <form>
          <CardBody className="flex flex-col gap-4">
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
            />
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
            />
            <div className="-ml-2.5 -mt-3">
              <Checkbox
                ripple={true}
                label={
                  <Typography className="text-xs md:text-sm" color="gray">
                    Create withing an existing box
                  </Typography>
                }
              />
            </div>

            <Typography className="-mb-2 font-semibold" variant="paragraph">
              FlashCards
            </Typography>

            <Button
              type="submit"
              className="flex w-full justify-center text-base items-center gap-3 bg-white border border-black text-black"
            >
              Create
              <HiArrowLongRight className="size-6" />
            </Button>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="text" onClick={handleClose} fullWidth>
              Continue without flashcards
            </Button>
          </CardFooter>
        </form>
      </Card>
    </DialogWithForm>
  );
};
