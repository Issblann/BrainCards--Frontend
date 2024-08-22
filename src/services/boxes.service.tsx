import axios from 'axios';
import { AxiosCall } from '../models';
import Box from '../models/Box';
import { loadAbort } from '../utilities';

interface GetBoxes {
  (userId: string): AxiosCall<Box>;
}
interface CreateBox {
  (userId: string, boxName: string): AxiosCall<string>;
}
const BASE_URL = 'http://localhost:3000/api/boxes';

export const getBoxesByUserId: GetBoxes = (userId: string): AxiosCall<Box> => {
  const controller = loadAbort();
  return {
    call: axios.get(`${BASE_URL}/getBoxesByUserId/${userId}`, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const createBox: CreateBox = (
  userId: string,
  boxName: string
): AxiosCall<string> => {
  const controller = loadAbort();
  return {
    call: axios.post(
      `${BASE_URL}/createBox/${userId}`,
      { boxName },
      {
        signal: controller.signal,
      }
    ),
    controller,
  };
};
