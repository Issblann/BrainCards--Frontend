import { FC, useEffect } from 'react';
import { DialogWithForm } from './../Dialog';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Typography,
} from '@material-tailwind/react';
import { useForm } from 'react-hook-form';
import { FormValuesBox } from '../../services/boxes.service';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store/store';
import { BoxPayload, thunks } from '../../redux/slices/boxes/thunks';
import { toggleDialogBox } from '../../redux/slices/boxes/slice';

interface CreateBoxModalProps {
}

export const CreateBoxModal: FC<CreateBoxModalProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuesBox>();

  const { data } = useSelector(
    (state: RootState) => state.boxes
  );

  const user = useSelector((store: RootState) => store.user);
  const openDialogBox = useSelector((state: RootState) => state.boxes.openDialogBox);
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    if (user.id) {
      dispatch(thunks.getBoxesByUser(user.id));
    }
  }, [user.id]);

    const handleCreateBox = async (data: FormValuesBox) => {
      try {
        if (!user.id) return;
        const response = dispatch(thunks.createABox({ userId: user.id, data: { ...data } as Partial<BoxPayload> })).unwrap();
        console.log(response);
        dispatch(toggleDialogBox());
      } catch (error) {
        console.error(error);
        throw new Error(error as string);
      }
    };
  
    const closeModal = () => {
      dispatch(toggleDialogBox());
    }
    console.log('openDialogBox', openDialogBox);
  return (
    <DialogWithForm open={openDialogBox} handler={closeModal}>
      <Card className="mx-auto w-full max-w-[30rem]">
        <form>
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
              crossOrigin="anonymous"
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
