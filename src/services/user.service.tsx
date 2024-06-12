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
  } catch (error) {
    console.error('Error logging in user', error);
    throw new Error(
      'Error logging in user. Verify your credentials and try again.' + error
    );
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
  } catch (error) {
    throw new Error('Error registering user. Try again.' + error);
  }
};
