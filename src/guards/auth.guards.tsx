import { Navigate, Outlet } from 'react-router-dom';
import { PublicRoutes } from '../models';
import { useIsAuth } from './index';

export const AuthGuard = () => {
  const isAuthenticated = useIsAuth();
  console.log(isAuthenticated);
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate replace to={PublicRoutes.HOME} />
  );
};
