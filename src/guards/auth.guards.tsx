import { Navigate, Outlet } from 'react-router-dom';
import { PublicRoutes } from '../models';
import { isAuth } from './index';

export const AuthGuard = () => {
  return isAuth() ? <Outlet /> : <Navigate replace to={PublicRoutes.HOME} />;
};
