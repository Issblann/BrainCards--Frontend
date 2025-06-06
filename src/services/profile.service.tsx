import axios, { AxiosRequestConfig } from 'axios';
import { AxiosCall } from '../models';
import Profile from '../models/Profile';
import { loadAbort } from '../utilities';

const BASE_URL = `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/profile`;

export interface EditProfile {
  name: string;
  lastName: string;
  bio: string;
  image?: File | Blob | string | null;
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
  const headers: AxiosRequestConfig['headers'] = {
    'Content-Type': 'multipart/form-data',
  };
  const controller = loadAbort();
  const config: AxiosRequestConfig = {
    headers,
    signal: controller.signal,
  };
  return {
    call: axios.put(`${BASE_URL}/${id}`, data, config),
    controller,
  };
};
