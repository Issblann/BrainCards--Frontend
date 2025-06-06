import axios, { AxiosRequestConfig } from 'axios';
import { AxiosCall, UserLogged } from '../models';
import User from '../models/User';
import { loadAbort } from '../utilities';

interface LoginUser {
  (email: string, password?: string): AxiosCall<UserLogged>;
}

interface RegisterUser {
  (email: string, username: string, password: string): AxiosCall<User>;
}

axios.defaults.withCredentials = true;
const BASE_URL = `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/auth`;

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

export const GetUserGoogle = (token: any) => {
  const controller = loadAbort();
  const headers: AxiosRequestConfig['headers'] = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const config: AxiosRequestConfig = {
    withCredentials: false,
    headers,
    signal: controller.signal,
  };
  return {
    call: axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`,
      config
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

export const loginWithGoogle = (
  email: string,
  username: string
): AxiosCall<UserLogged> => {
  const controller = loadAbort();
  return {
    call: axios.post(
      `${BASE_URL}/loginWithGoogle`,
      { email, username },
      { signal: controller.signal }
    ),
    controller,
  };
};
