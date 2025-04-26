import Cookies from 'js-cookie';
import { RootState } from '../redux/store/store';
import { useSelector } from 'react-redux';

export const useIsAuth = () => {
  const tokenAuth = Cookies.get('token');
  const tokenGoogle = Cookies.get('tokenGoogle');
  const user = useSelector((store: RootState) => store.user);
  if ((tokenAuth && user.id !== '') || (tokenGoogle && user.id !== '')) {
    return true;
  }

  return false;
};
