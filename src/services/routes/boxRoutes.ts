import { BASE_URL } from "../axios";

const BASE_URL_BOXES = `${BASE_URL}/boxes`;

export const boxRoutes = {
  getBoxesByUserId: (userId: string) => `${BASE_URL_BOXES}/getBoxesByUserId/${userId}`,
  createBox: (userId: string) => `${BASE_URL_BOXES}/createBox/${userId}`,
  updateBox: (boxId: string) => `${BASE_URL_BOXES}/updateBox/${boxId}`,
  deleteBox: (boxId: string) => `${BASE_URL_BOXES}/deleteBox/${boxId}`,
  getBoxById: (boxId: string) => `${BASE_URL_BOXES}/getBoxById/${boxId}`,
};
