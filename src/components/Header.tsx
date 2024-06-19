import { Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { PublicRoutes } from '../models';
import { isAuth } from '../guards';
import { Profile } from './Profile';

export const Header = () => {
  return (
    <div className="w-full flex justify-between items-center fixed top-0 h-[80px] bg-primary max-w-7xl p-4">
      <h1 className="text-black font-medium">BRAIN CARDS</h1>

      {isAuth() ? (
        <Profile />
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
