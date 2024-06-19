import { Route } from 'react-router-dom';
import { PrivateRoutes } from '../models';
import RoutesWithNoFound from '../utilities/RoutesWithNoFound.utility';
import { Profile } from '../pages';

export const Private = () => {
  return (
    <RoutesWithNoFound>
      <Route path={PrivateRoutes.PROFILE} element={<Profile />} />
    </RoutesWithNoFound>
  );
};

export default Private;
