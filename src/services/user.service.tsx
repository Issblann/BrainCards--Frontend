import axios from 'axios';
import { UserLogged } from '../models';
import User from '../models/User';

interface LoginUser {
  (email: string, password: string): Promise<UserLogged>;
}

interface RegisterUser {
  (email: string, username: string, password: string): Promise<User>;
}
export const loginUser: LoginUser = async (
  email,
  password
): Promise<UserLogged> => {
  try {
    const response = await axios.post('http://localhost:3000/auth/login', {
      email,
      password,
    });

    console.log('User logged in', response.data);

    return response.data;
  } catch (error: any) {
    if (error.response.status === 400) {
      throw new Error('Invalid credentials. Try again.');
    } else if (error.response.status === 401) {
      throw new Error('User not found. Try again.');
    }
    throw new Error('Error logging in user. Try again.' + error);
  }
};

export const registerUser: RegisterUser = async (
  email,
  username,
  password
): Promise<User> => {
  try {
    const response = await axios.post('http://localhost:3000/auth/register', {
      email,
      username,
      password,
    });
    console.log('User registered', response.data);
    return response.data;
  } catch (error: any) {
    if (error.response.status === 400) {
      throw new Error('User already exist. Try again.');
    }
    throw new Error('Error registering user. Try again.' + error);
  }
};
