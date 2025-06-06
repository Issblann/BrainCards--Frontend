import axios from 'axios';
import { AxiosCall } from '../models';
import Box from '../models/Box';
import { loadAbort } from '../utilities';

export type FormValuesBox = {
  boxName: string;
};

interface GetBoxes {
  (userId: string): AxiosCall<Box>;
}
interface CreateBox {
  (userId: string, box: FormValuesBox): AxiosCall<string>;
}
const BASE_URL =  `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/boxes`

export const getBoxesByUserId: GetBoxes = (userId: string): AxiosCall<Box> => {
  const controller = loadAbort();
  return {
    call: axios.get(`${BASE_URL}/getBoxesByUserId/${userId}`, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const createBox: CreateBox = (userId, box): AxiosCall<string> => {
  const controller = loadAbort();
  return {
    call: axios.post(`${BASE_URL}/createBox/${userId}`, box, {
      signal: controller.signal,
    }),
    controller,
  };
};
