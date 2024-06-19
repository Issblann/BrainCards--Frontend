import {
  Card,
  Input,
  Button,
  Typography,
  Spinner,
} from '@material-tailwind/react';
import { FC, useState } from 'react';
import authFormVector from '../assets/authform-vector.png';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppStore } from '../redux/store';
import { SubmitHandler, useForm } from 'react-hook-form';
import { PublicRoutes } from '../models';
import { loginUser, registerUser } from '../services';
import { loginUserAction } from '../redux/states';
import { ErrorMessage } from '@hookform/error-message';
import useFetchAndLoad from '../hooks/useFetchAndLoad';
import PasswordToggleIcon from './PasswordToggleIcon';
import isAuth from '../guards/isAuth';

type FormValues = {
  email: string;
  password: string;
  username: string;
  confirmPassword: string;
};
interface FormAuthProps {
  isRegister?: boolean;
}
const formAuth: FC<FormAuthProps> = ({ isRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  useSelector((store: AppStore) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, callEndpoint } = useFetchAndLoad();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const title = isRegister ? 'Sign Up for' : 'Sign In for';
  const buttonTitle = isRegister ? 'Register' : 'Login';

  const togglePasswordVisibility = () =>
    setShowPassword((prevState) => !prevState);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prevState) => !prevState);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      if (isRegister) {
        const axiosCall = registerUser(
          data.email,
          data.username,
          data.password
        );
        await callEndpoint(axiosCall);
        navigate(`/${PublicRoutes.LOGIN}`);
      } else {
        const axiosCall = loginUser(data.email, data.password);
        const response = await callEndpoint(axiosCall);
        dispatch(loginUserAction(response?.data));
        navigate(`${PublicRoutes.HOME}`);
        isAuth();
      }
      reset();
    } catch (error: any) {
      // console.error('Error on onSubmit form', error);
      if (error?.response?.status === 400) {
        setError(
          'root',
          {
            type: 'serverError',
            message: isRegister
              ? 'User already exist. Try again'
              : 'Invalid credentials. Try again.',
          } || 'Error on form submit'
        );
      } else {
        setError('root', {
          type: 'serverError',
          message:
            error instanceof Error ? error.message : 'Error on form submit',
        });
      }
    }
  };

  return (
    <div className="flex w-full ">
      <div className="bg-primary lg:w-5/12 w-full flex justify-center p-5">
        <div className="border border-[#878787] w-full md:w-auto p-4 rounded-[10px]">
          <Card color="transparent" shadow={false}>
            <Typography className="text-black font-light">Welcome !</Typography>
            <Typography className="text-black" variant="h4">
              {title}
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Create your favorites decks
            </Typography>

            <div className="w-full flex justify-center mt-5">
              <Button
                variant="outlined"
                className="flex items-center justify-center normal-case w-10/12 gap-2 p-3 rounded-md shadow-sm"
              >
                <img
                  src="https://docs.material-tailwind.com/icons/google.svg"
                  alt="metamask"
                  className="h-5 w-5"
                />
                Continue with google
              </Button>
            </div>
            <div className="flex justify-center gap-4 mt-5">
              <span className="w-1/5 bg-[#D9D9D9] block h-[1px] mt-3"></span>
              <span className="text-black text-sm">or</span>
              <span className="w-1/5 bg-[#D9D9D9] block h-[1px] mt-3"></span>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-8 mx-auto mb-2 px-4 max-w-screen-lg w-full sm:w-96"
            >
              <div className="mb-1 flex flex-col gap-4">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Email
                </Typography>
                <Input
                  size="lg"
                  placeholder="name@mail.com"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: 'before:content-none after:content-none',
                  }}
                  {...register('email', {
                    required: {
                      value: true,
                      message: 'This field is required',
                    },
                    pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name="email"
                  render={({ message }) => (
                    <p className="text-red-300 text-xs">{message}</p>
                  )}
                />
                {isRegister && (
                  <>
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-3"
                    >
                      Username
                    </Typography>
                    <Input
                      size="lg"
                      placeholder="John Doe"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: 'before:content-none after:content-none',
                      }}
                      {...register('username', {
                        required: {
                          value: true,
                          message: 'This field is required',
                        },
                      })}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="username"
                      render={({ message }) => (
                        <p className="text-red-300 text-xs">{message}</p>
                      )}
                    />
                  </>
                )}
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Password
                </Typography>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  size="lg"
                  placeholder="********"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: 'before:content-none after:content-none',
                  }}
                  {...register('password', {
                    required: 'This field is required',
                  })}
                  icon={
                    <PasswordToggleIcon
                      showPassword={showPassword}
                      togglePasswordVisibility={togglePasswordVisibility}
                    />
                  }
                />
                <ErrorMessage
                  errors={errors}
                  name="password"
                  render={({ message }) => (
                    <p className="text-red-300 text-xs">{message}</p>
                  )}
                />

                {isRegister && (
                  <>
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-3"
                    >
                      Confirm Password
                    </Typography>
                    <Input
                      type={showConfirmPassword ? 'text' : 'password'}
                      size="lg"
                      placeholder="********"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: 'before:content-none after:content-none',
                      }}
                      {...register('confirmPassword', {
                        required: {
                          value: true,
                          message: 'This field is required',
                        },
                        validate: (value) =>
                          value === watch('password') ||
                          'Passwords do not match',
                      })}
                      icon={
                        <PasswordToggleIcon
                          showPassword={showConfirmPassword}
                          togglePasswordVisibility={
                            toggleConfirmPasswordVisibility
                          }
                        />
                      }
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      errors={errors}
                      render={({ message }) => (
                        <p className="text-red-300 text-xs">{message}</p>
                      )}
                    />
                  </>
                )}

                {errors.root && (
                  <p className="text-xs">{errors.root.message}</p>
                )}
              </div>
              <Button
                type="submit"
                className="mt-6 flex justify-center items-center"
                fullWidth
              >
                {loading ? <Spinner className="h-4 w-4" /> : buttonTitle}
              </Button>
              <Typography
                variant="small"
                color="gray"
                className="mt-4 text-center font-normal text-xs"
              >
                {isRegister
                  ? 'Already have an account?'
                  : "Don't have account?"}
                <span> </span>
                {isRegister ? (
                  <Link to={`/${PublicRoutes.LOGIN}`} className="text-blue-500">
                    Login
                  </Link>
                ) : (
                  <Link
                    to={`/${PublicRoutes.REGISTER}`}
                    className="text-blue-500"
                  >
                    Sign Up
                  </Link>
                )}
              </Typography>
            </form>
          </Card>
        </div>
      </div>

      <div className="lg:block hidden lg:w-[70%]">
        <img
          src={authFormVector}
          className="object-cover"
          alt="authform-vector"
        />
      </div>
    </div>
  );
};

export default formAuth;
