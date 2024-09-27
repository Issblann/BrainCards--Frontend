import {
  Avatar,
  Button,
  Input,
  Spinner,
  Textarea,
  Typography,
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { HiMail, HiPencil } from 'react-icons/hi';
import { useFetchAndLoad } from '../hooks';
import {
  EditProfile,
  editProfile,
  getProfile,
} from '../services/profile.service';

import ProfileIcon from '../assets/profile_icon.svg';

import { useDispatch, useSelector } from 'react-redux';
import { AppStore } from '../redux/store';
import { editProfileAction, getProfileAction } from '../redux/states';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { PublicRoutes } from '../models';

type FormValues = {
  name: string;
  lastName: string;
  bio: string;
  image: File | string | null;
};

export const Profile = () => {
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(
    null
  );
  const [isEdit, setIsEdit] = useState(false);
  const { callEndpoint, loading } = useFetchAndLoad();
  const profile = useSelector((store: AppStore) => store.profile);
  const user = useSelector((store: AppStore) => store.user);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    // setError,
    // formState: { errors },
  } = useForm<FormValues>();
  const navigate = useNavigate();
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setValue('image', file);

      const objectURL = URL.createObjectURL(file);
      setPreviewImage(objectURL);
      return () => URL.revokeObjectURL(objectURL);
    }
  };

  const profileData = async () => {
    if (!user.id) {
      console.log('User ID is undefined');
      return;
    }

    try {
      const axiosCall = getProfile(user.id);
      const response = await callEndpoint(axiosCall);
      await dispatch(getProfileAction(response.data));
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  useEffect(() => {
    if (user.id) {
      profileData();
    }
  }, [user.id, isEdit]);

  useEffect(() => {
    return () => {
      if (previewImage && typeof previewImage === 'string') {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);
  const handleEditForm = async (data: EditProfile) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('lastName', data.lastName);
      formData.append('bio', data.bio);

      if (data.image instanceof File) {
        formData.append('image', data.image);
      }

      const axiosCall = editProfile(profile.id, {
        name: formData.get('name') as string,
        lastName: formData.get('lastName') as string,
        bio: formData.get('bio') as string,
        image: formData.get('image'),
      });
      const response = await callEndpoint(axiosCall);
      dispatch(editProfileAction(response.data));
      setIsEdit(false);
      navigate(PublicRoutes.HOME);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="w-full text-black flex max-w-7xl flex-col gap-6 outline outline-1 rounded-xl outline-[#8B8B8B]">
      <span className="h-[100px] w-full bg-gradient-to-r from-lavender-background to-lavender-400 rounded-t-lg border-b border-[#8B8B8B] border-1 "></span>
      <div className="p-5">
        <form onSubmit={handleSubmit(handleEditForm)}>
          <div className="flex md:items-center md:flex-row flex-col gap-6 mb-9">
            <div className="relative w-[110px] md:min-w-[110px]">
              <Avatar
                className="static"
                src={
                  previewImage
                    ? (previewImage as string)
                    : profile.image
                    ? `http://localhost:3000/${profile.image}`
                    : user.picture
                    ? user.picture
                    : ProfileIcon
                }
                size="xxl"
              />
              {isEdit && (
                <span className="absolute right-0 bottom-0 p-2 bg-white rounded-full border border-gray-300 cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    id="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <label
                    htmlFor="file"
                    className="cursor-pointer text-lavender-600 font-semibold"
                  >
                    <HiPencil size={20} />
                  </label>
                </span>
              )}
            </div>
            <div className="flex justify-between flex-col md:flex-row gap-5 md:gap-0 w-full">
              <div className="flex flex-col ">
                <h1 className="font-bold text-2xl ">
                  {profile.name} <span></span> {profile.lastName}
                </h1>
                <p className="font-normal text-gray-500">@{user.username}</p>
                <p className="font-normal text-gray-500 mb-3">{user.email}</p>
                <p className="font-light">
                  {loading ? (
                    <Spinner className="h-4 w-4" />
                  ) : profile.bio === '' ? (
                    'No bio'
                  ) : (
                    profile.bio
                  )}
                </p>
              </div>

              {!isEdit && (
                <Button
                  onClick={() => setIsEdit(true)}
                  className="h-11 normal-case font-normal text-base w-[120px] bg-lavender-600 hover:bg-lavender-700"
                >
                  Edit
                </Button>
              )}
            </div>
          </div>

          {isEdit && (
            <div className="flex flex-col mt-8 gap-8 w-full mb-10 max-w-screen-lg">
              <div className="flex gap-4 md:flex-row flex-col">
                <div>
                  <Typography variant="h6" color="blue-gray" className="mb-3">
                    Name
                  </Typography>
                  <Input
                    defaultValue={profile.name}
                    className="w-[380px]"
                    label="Your name"
                    {...register('name')}
                    crossOrigin={'true'}
                  />
                </div>
                <div>
                  <Typography variant="h6" color="blue-gray" className="mb-3">
                    Last Name
                  </Typography>
                  <Input
                    defaultValue={profile.lastName}
                    className="w-[380px]"
                    label="Your last name"
                    {...register('lastName')}
                    crossOrigin={'true'}
                  />
                </div>
              </div>
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Biography
                </Typography>
                <Textarea
                  defaultValue={profile.bio}
                  {...register('bio')}
                  label="Write about you!"
                  rows={8}
                />
              </div>

              <div className="flex flex-col md:flex-row gap-3">
                <Button
                  type="submit"
                  className="h-11 normal-case font-normal text-base w-[180px] bg-lavender-600 hover:bg-lavender-700"
                >
                  Save
                </Button>
                <Button
                  onClick={() => {
                    setIsEdit(false), setPreviewImage(null);
                  }}
                  className="h-11 normal-case font-normal bg-red-600 hover:bg-red-700 text-base w-[180px]"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
          <div className="flex flex-col">
            <p className="font-semibold text-xl mb-5">My email Address</p>
            <div className="flex gap-6 w-full items-center">
              <span className="bg-[#efe0f4] w-[48px] h-[48px] flex justify-center items-center rounded-full">
                <HiMail size={23} color="#924ea2" />
              </span>

              <p className="text-center">{user.email}</p>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};
