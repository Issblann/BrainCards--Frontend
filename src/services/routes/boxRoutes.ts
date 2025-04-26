import { BASE_URL } from "../axios";

const BASE_URL_BOXES = `${BASE_URL}/boxes`;

export const boxRoutes = {
  getBoxesByUserId: (userId: string) => `${BASE_URL_BOXES}/getBoxesByUserId/${userId}`,
  createBox: (userId: string) => `${BASE_URL_BOXES}/createBox/${userId}`,
};
