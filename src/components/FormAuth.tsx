import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from '@material-tailwind/react';
import { FC } from 'react';
import authFormVector from '../assets/authform-vector.png';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppStore } from '../redux/store';
import { SubmitHandler, useForm } from 'react-hook-form';
import { PublicRoutes } from '../models';
import { loginUser, registerUser } from '../services';
import { loginUserAction } from '../redux/states';

type Inputs = {
  email: string;
  password: string;
  username: string;
  confirmPassword: string;
};
interface FormAuthProps {
  isRegister?: boolean;
}
const formAuth: FC<FormAuthProps> = ({ isRegister }) => {
  const title = isRegister ? 'Sign Up for' : 'Sign In for';
  const buttonTitle = isRegister ? 'Register' : 'Login';

  const userState = useSelector((store: AppStore) => store.user);
  const dispatch = useDispatch();

  console.log('userState', userState);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      if (isRegister) {
        const response = await registerUser(
          data.email,
          data.username,
          data.password
        );
        console.log('User registered', response);
      } else {
        const response = await loginUser(data.email, data.password);
        dispatch(loginUserAction(response));
        console.log('User logged in', response);
      }
    } catch (error) {
      console.error('Error on onSubmit form', error);
    }
  };

  console.log('errors', errors);
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
                size="md"
                variant="outlined"
                className="flex items-center justify-center w-10/12 gap-2 p-3 rounded-md shadow-sm"
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
                  {...register('email', { required: true })}
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
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
                      {...register('username', { required: true })}
                    />
                    {errors.username && <p>{errors.username.message}</p>}
                  </>
                )}
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Password
                </Typography>
                <Input
                  size="lg"
                  placeholder="********"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: 'before:content-none after:content-none',
                  }}
                  {...register('password', { required: true })}
                />
                {errors.password && <p>{errors.password.message}</p>}
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
                      size="lg"
                      placeholder="********"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: 'before:content-none after:content-none',
                      }}
                      {...register('confirmPassword', { required: true })}
                    />
                    {errors.confirmPassword && (
                      <p>{errors.confirmPassword.message}</p>
                    )}
                  </>
                )}
              </div>
              {/* <Checkbox
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center font-normal"
                >
                  Remember me
                </Typography>
              }
              containerProps={{ className: '-ml-2.5' }}
            /> */}
              <Button type="submit" className="mt-6" fullWidth>
                {buttonTitle}
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
