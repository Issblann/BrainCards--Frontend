import { Button, Typography } from '@material-tailwind/react';
import { Link, useLocation } from 'react-router-dom';
import { PublicRoutes } from '../../models';

import { ProfileHeader } from './ProfileHeader';
import { useDispatch, useSelector } from 'react-redux';
import { AppStore } from '../../redux/store/store';
import { useIsAuth } from '../../guards';
import { useFetchAndLoad } from '../../hooks';
import { getProfile } from '../../services/profile.service';
import { getProfileAction } from '../../redux/slices';
import { useEffect } from 'react';

export const Header = () => {
  const user = useSelector((store: AppStore) => store.user);
  const profile = useSelector((store: AppStore) => store.profile);
  const isAuth = useIsAuth();
  const location = useLocation();
  const { callEndpoint } = useFetchAndLoad();
  const dispatch = useDispatch();
  const profileData = async () => {
    if (!user.id) {
      console.log('User ID is undefined');
      return;
    }

    try {
      if (!isAuth) return;
      const axiosCall = getProfile(user.id);
      const response = await callEndpoint(axiosCall);
      await dispatch(getProfileAction(response.data));
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  useEffect(() => {
    if (user.id) {
      profileData();
    }
  }, [user.id]);

  const isAuthPage =
    location.pathname === `/${PublicRoutes.LOGIN}` ||
    location.pathname === `/${PublicRoutes.REGISTER}`;
  return (
    <div className="w-full flex justify-between items-center fixed top-0 h-[80px] z-50 bg-primary max-w-[1480px] p-4">
      <Link to={PublicRoutes.HOME}>
        <h1 className="text-black font-medium">BRAIN CARDS</h1>
      </Link>

      {isAuth ? (
        <div className="flex items-center gap-4">
          <Typography className="text-black" variant="h6">
            Hi {profile.name ? profile.name : user.username}
          </Typography>
          <ProfileHeader userId={user.id} />
        </div>
      ) : (
        !isAuthPage && (
          <div className="flex gap-3 items-center">
            <Link to={PublicRoutes.REGISTER}>
              <Button className="font-semibold bg-lavender-700">Sign IN</Button>
            </Link>
            <Link to={PublicRoutes.LOGIN}>
              <Button
                variant="text"
                className="text-sm font-medium normal-case"
              >
                Log In
              </Button>
            </Link>
          </div>
        )
      )}
    </div>
  );
};
