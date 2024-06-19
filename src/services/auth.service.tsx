import axios from 'axios';
import { AxiosCall, UserLogged } from '../models';
import User from '../models/User';
import { loadAbort } from '../utilities';

interface LoginUser {
  (email: string, password: string): AxiosCall<UserLogged>;
}

interface RegisterUser {
  (email: string, username: string, password: string): AxiosCall<User>;
}

axios.defaults.withCredentials = true;
const BASE_URL = 'http://localhost:3000/auth';

export const loginUser: LoginUser = (
  email,
  password
): AxiosCall<UserLogged> => {
  const controller = loadAbort();
  return {
    call: axios.post(
      `${BASE_URL}/login`,
      { email, password },
      { signal: controller.signal }
    ),
    controller,
  };
};

export const registerUser: RegisterUser = (
  email,
  username,
  password
): AxiosCall<User> => {
  const controller = loadAbort();
  return {
    call: axios.post(
      `${BASE_URL}/register`,
      {
        email,
        username,
        password,
      },
      { signal: controller.signal }
    ),
    controller,
  };
};

export const LogoutUser = () => {
  const controller = loadAbort();
  return {
    call: axios.post(`${BASE_URL}/logout`, { signal: controller.signal }),
    controller,
  };
};
