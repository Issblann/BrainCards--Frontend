import { Button } from '@material-tailwind/react';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch, useSelector } from 'react-redux';
import { AppStore } from '../redux/store';
import { loginUserAction } from '../redux/states';
import { useFetchAndLoad } from '../hooks';
import { GetUserGoogle } from '../services';
import { useNavigate } from 'react-router-dom';
import { PublicRoutes } from '../models';
import Cookies from 'js-cookie';
export const GoogleButton = () => {
  const { callEndpoint } = useFetchAndLoad();
  useSelector((store: AppStore) => store.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const responseMessage = async (response: any) => {
    const axiosCall = await GetUserGoogle(response.access_token);
    const responseUserGoogle = await callEndpoint(axiosCall);

    dispatch(
      loginUserAction({
        id: responseUserGoogle.data.sub,
        username: responseUserGoogle.data.name,
        email: responseUserGoogle.data.email,
        picture: responseUserGoogle.data.picture,
      })
    );
    Cookies.set('tokenGoogle', responseUserGoogle.data.sub);
    console.log(responseUserGoogle.data.sub);
    navigate(PublicRoutes.HOME);
  };
  const errorMessage = () => {
    console.log('error');
  };

  const login = useGoogleLogin({
    onSuccess: responseMessage,
    onError: errorMessage,
  });
  return (
    <div className="w-full bg-primary flex justify-center mt-5">
      <Button
        onClick={() => login()}
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
  );
};
