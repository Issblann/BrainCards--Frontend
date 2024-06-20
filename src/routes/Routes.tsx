import { Route } from 'react-router-dom';

import { PrivateRoutes, PublicRoutes } from '../models';
import { AuthGuard } from '../guards';
import { Suspense, lazy } from 'react';
import { RoutesWithNoFound } from '../utilities';
import { Home, Login, Register } from '../pages/';

const Private = lazy(() => import('./Private'));
export const Router = () => {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <RoutesWithNoFound>
        <Route path={PublicRoutes.REGISTER} element={<Register />} />
        <Route path={PublicRoutes.LOGIN} element={<Login />} />
        <Route path={PublicRoutes.HOME} element={<Home />} />
        <Route element={<AuthGuard />}>
          <Route
            path={`${PrivateRoutes.PRIVATE}/*`}
            element={<Private />}
          ></Route>
        </Route>
      </RoutesWithNoFound>
    </Suspense>
  );
};
