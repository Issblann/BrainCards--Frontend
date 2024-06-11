import { Route, Routes } from 'react-router-dom';
import { Home, Login, Register } from '../pages';
import { PublicRoutes } from '../models';

export const Router = () => {
  return (
    <Routes>
      <Route path={PublicRoutes.REGISTER} element={<Register />} />
      <Route path={PublicRoutes.LOGIN} element={<Login />} />
      <Route path={PublicRoutes.HOME} element={<Home />} />
      <Route path="*" element={<h1>Not found</h1>} />
    </Routes>
  );
};
