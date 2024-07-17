import { Button, Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { PublicRoutes } from '../models';

import { ProfileHeader } from './ProfileHeader';
import { useSelector } from 'react-redux';
import { AppStore } from '../redux/store';
import { useIsAuth } from '../guards';

export const Header = () => {
  const user = useSelector((store: AppStore) => store.user);
  const profile = useSelector((store: AppStore) => store.profile);
  const usernameSplitted = profile?.name ? profile.name.split(' ')[0] : '';
  const isAuth = useIsAuth();
  return (
    <div className="w-full flex justify-between items-center fixed top-0 h-[80px] bg-primary max-w-[1480px] p-4">
      <h1 className="text-black font-medium">BRAIN CARDS</h1>

      {isAuth ? (
        <div className="flex items-center gap-4">
          <Typography className="text-black" variant="h6">
            Hi {usernameSplitted || undefined}
          </Typography>
          <ProfileHeader userId={user.id} />
        </div>
      ) : (
        <div className="flex gap-3 items-center">
          <Link to={PublicRoutes.REGISTER}>
            <Button className="font-semibold">Sign IN</Button>
          </Link>
          <Link to={PublicRoutes.LOGIN}>
            <Button variant="text" className="text-sm font-medium normal-case">
              Log In
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};
