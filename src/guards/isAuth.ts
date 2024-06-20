import Cookies from 'js-cookie';
import { AppStore } from '../redux/store';
import { useSelector } from 'react-redux';

export const useIsAuth = () => {
  const tokenAuth = Cookies.get('token');
  const user = useSelector((store: AppStore) => store.user);
  if (tokenAuth) {
    return true;
  } else if (user.id !== '') {
    return true;
  } else {
    return false;
  }
};
