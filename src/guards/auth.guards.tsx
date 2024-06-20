import { Navigate, Outlet } from 'react-router-dom';
import { PublicRoutes } from '../models';
import { useIsAuth } from './index';

export const AuthGuard = () => {
  const isAuthenticated = useIsAuth();
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate replace to={PublicRoutes.HOME} />
  );
};
