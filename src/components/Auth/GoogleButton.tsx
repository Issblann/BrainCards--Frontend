import { Button } from '@material-tailwind/react';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch, useSelector } from 'react-redux';
import { AppStore } from '../../redux/store/store';
import { loginUserAction } from '../../redux/slices';
import { useFetchAndLoad } from '../../hooks';
import { GetUserGoogle, loginWithGoogle } from '../../services';
import { useNavigate } from 'react-router-dom';
import { PublicRoutes } from '../../models';
import Cookies from 'js-cookie';
export const GoogleButton = () => {
  const { callEndpoint } = useFetchAndLoad();
  useSelector((store: AppStore) => store.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const responseMessage = async (response: any) => {
    const axiosCall = await GetUserGoogle(response.access_token);
    const responseUserGoogle = await callEndpoint(axiosCall);

    const axiosCallPostUser = await loginWithGoogle(
      responseUserGoogle.data.email,
      responseUserGoogle.data.name
    );
    const responsePostUser = await callEndpoint(axiosCallPostUser);

    dispatch(
      loginUserAction({
        id: responsePostUser.data.user.id,
        username: responsePostUser.data.user.username,
        email: responseUserGoogle.data.email,
        picture: responseUserGoogle.data.picture,
      })
    );
    Cookies.set('tokenGoogle', responseUserGoogle.data.sub);
    Cookies.set('token', responsePostUser.data.token);
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
        className="flex items-center justify-center normal-case border-lavender-400 w-10/12 gap-2 p-3 rounded-md shadow-md"
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
