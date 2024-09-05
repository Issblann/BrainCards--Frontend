import { FC } from 'react';
import { DialogWithForm } from './Dialog';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Typography,
} from '@material-tailwind/react';
import { useForm } from 'react-hook-form';
import { FormValuesBox } from './TabBoxes';

interface CreateBoxModalProps {
  open: boolean;
  handleClose: () => void;
  submitForm: (data: FormValuesBox) => void;
}

export const CreateBoxModal: FC<CreateBoxModalProps> = ({
  open,
  handleClose,
  submitForm,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuesBox>();

  return (
    <DialogWithForm open={open} handler={handleClose}>
      <Card className="mx-auto w-full max-w-[30rem]">
        <form onSubmit={handleSubmit(submitForm)}>
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              New Box
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              Create a new box
            </Typography>

            <Typography className="-mb-2" variant="h6">
              Title <span className="text-red-400">*</span>
            </Typography>
            <Input
              labelProps={{
                className: 'before:content-none after:content-none hidden',
              }}
              placeholder="Insert a title for your box"
              size="lg"
              className=" !border-t-blue-gray-200 focus:!border-lavender-600"
              {...register('boxName', { required: 'Title is required' })}
            />
            {errors.boxName && (
              <Typography variant="small" color="red">
                {errors.boxName.message}
              </Typography>
            )}
          </CardBody>
          <CardFooter className="pt-0">
            <Button type="submit" fullWidth>
              Create
            </Button>
          </CardFooter>
        </form>
      </Card>
    </DialogWithForm>
  );
};
