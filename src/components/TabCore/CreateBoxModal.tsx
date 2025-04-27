import { useEffect } from 'react';
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
import { BoxEditPayload, BoxPayload, thunks } from '../../redux/slices/boxes/thunks';
import { toggleDialogBox } from '../../redux/slices/boxes/slice';


export const CreateBoxModal = () => {
  const {openDialogBox, editMode, boxSelected } = useSelector((state: RootState) => state.boxes);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValuesBox>();

  const user = useSelector((store: RootState) => store.user);
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    if (user.id) {
      dispatch(thunks.getBoxesByUser(user.id));
    }
  }, [user.id]);

  useEffect(() => {
    if (editMode && boxSelected) {
      setValue('boxName', boxSelected.boxName);
    } else {
      setValue('boxName', '');
    }
  }, [editMode, boxSelected, setValue]);

    const handleCreateBox = async (data: FormValuesBox) => {
      try {
        if (!user.id) return;
        const response = dispatch(thunks.createABox({ userId: user.id, data: { ...data } as Partial<BoxPayload> })).unwrap();
        reset();
        return response;
      } catch (error) {
        console.error(error);
        throw new Error(error as string);
      }
    };
    
    const handleEditBox = async (data: FormValuesBox) => {
      try {
        if (!user.id) return;
        if (!boxSelected?.id) throw new Error('Box ID is required');
        const response = dispatch(thunks.updateBox({ boxId: boxSelected.id, data: { ...data } as Partial<BoxEditPayload> })).unwrap();
        reset();
        return response;
      } catch (error) {
        console.error(error);
        throw new Error(error as string);
      }
    };

    const onSubmit = (data: FormValuesBox) => {
      if (editMode) {
        handleEditBox(data);
      } else {
        handleCreateBox(data);
      }
    };
    const closeModal = () => {
      dispatch(toggleDialogBox());
      reset();
    }
  return (
    <DialogWithForm open={openDialogBox} handler={closeModal}>
      <Card className="mx-auto w-full max-w-[30rem]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
               {editMode ? 'Edit Box' : 'Create Box'}
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              {editMode ? 'Edit your box' : 'Create a new box'}
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
              defaultValue={editMode ? boxSelected?.boxName : ''}
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
              {editMode ? 'Edit Box' : 'Create Box'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </DialogWithForm>
  );
};
