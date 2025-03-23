import Cookies from 'js-cookie';
import { AppStore } from '../redux/store/store';
import { useSelector } from 'react-redux';

export const useIsAuth = () => {
  const tokenAuth = Cookies.get('token');
  const tokenGoogle = Cookies.get('tokenGoogle');
  const user = useSelector((store: AppStore) => store.user);
  if ((tokenAuth && user.id !== '') || (tokenGoogle && user.id !== '')) {
    return true;
  }

  return false;
};
