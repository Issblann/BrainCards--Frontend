import {
  Avatar,
  Button,
  Input,
  Spinner,
  Textarea,
  Typography,
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { HiMail } from 'react-icons/hi';
import { useFetchAndLoad } from '../hooks';
import { getProfile } from '../services/profile.service';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppStore } from '../redux/store';
import { getProfileAction } from '../redux/states';

export const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const { callEndpoint, loading } = useFetchAndLoad();
  const { id } = useParams();
  const profile = useSelector((store: AppStore) => store.profile);

  const dispatch = useDispatch();

  const profileData = async () => {
    try {
      const axiosCall = getProfile(id);
      const response = await callEndpoint(axiosCall);
      dispatch(getProfileAction(response.data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    profileData();
  }, [id]);
  console.log(profile);
  return (
    <section className="w-full text-black flex max-w-7xl flex-col gap-6 outline outline-1 rounded-xl outline-[#8B8B8B]">
      <span className="h-[100px] w-full bg-gradient-to-r from-[#E2EAF7] to-[#4182F9] rounded-t-lg border-b border-[#8B8B8B] border-1 "></span>
      <div className="p-5">
        <div className="flex items-center gap-6 mb-9">
          <Avatar
            src="https://docs.material-tailwind.com/img/face-2.jpg"
            size="xxl"
          />
          <div className="flex justify-between w-full">
            <div className="flex flex-col">
              <h1 className="font-bold text-2xl ">
                {profile.name} <span></span> {profile.lastName}
              </h1>
              <p className="font-normal text-gray-500 mb-3">
                alexarawles@gmail.com
              </p>
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
                className="h-11 normal-case font-normal text-base w-[120px] bg-[#4182F9]"
              >
                Edit
              </Button>
            )}
          </div>
        </div>

        {isEdit && (
          <form className="flex flex-col mt-8 gap-8 w-full mb-10 max-w-screen-lg">
            <div className="flex gap-4">
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Name
                </Typography>
                <Input className="w-[380px]" label="Your name" />
              </div>
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Last Name
                </Typography>
                <Input className="w-[380px]" label="Your last name" />
              </div>
            </div>
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Biography
              </Typography>
              <Textarea label="Write about you!" rows={8} />
            </div>
            <Button className="h-11 normal-case font-normal text-base w-[180px] bg-[#4182F9]">
              Save
            </Button>
          </form>
        )}
        <div className="flex flex-col">
          <p className="font-semibold text-xl mb-5">My email Address</p>
          <div className="flex gap-6 w-full">
            <span className="bg-[#e2eaf7] w-[48px] h-[48px] flex justify-center items-center rounded-full">
              <HiMail size={23} color="#4182F9" />
            </span>
            <div className="flex flex-col">
              <p>alexarawles@gmail.com</p>
              <p>1 month ago</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
