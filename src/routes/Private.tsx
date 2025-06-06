import { Route } from 'react-router-dom';
import { PrivateRoutes } from '../models';
import { RoutesWithNoFound } from '../utilities';
import { Profile } from '../pages';
import { Flashcards } from '../components';

export const Private = () => {
  return (
    <RoutesWithNoFound>
      <Route path={`${PrivateRoutes.PROFILE}/:id`} element={<Profile />} />
      <Route
        path={`${PrivateRoutes.FLASHCARDS}/:deckId`}
        element={<Flashcards />}
      />
    </RoutesWithNoFound>
  );
};

export default Private;
