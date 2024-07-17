import axios from 'axios';
import { AxiosCall } from '../models';
import Profile from '../models/Profile';
import { loadAbort } from '../utilities';

const BASE_URL = 'http://localhost:3000/api/profile';

export interface EditProfile {
  name: string;
  lastName: string;
  bio: string;
  // image: string;
}
interface GetProfile {
  (id: string | undefined): AxiosCall<Profile>;
}

export const getProfile: GetProfile = (id): AxiosCall<Profile> => {
  const controller = loadAbort();
  return {
    call: axios.get(`${BASE_URL}/${id}`, { signal: controller.signal }),
    controller,
  };
};

export const editProfile = (id: string | undefined, data: EditProfile) => {
  const controller = loadAbort();
  return {
    call: axios.put(`${BASE_URL}/${id}`, data, { signal: controller.signal }),
    controller,
  };
};
