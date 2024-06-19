import Cookies from 'js-cookie';
import { AppStore } from '../redux/store';
import { useSelector } from 'react-redux';

export const isAuth = () => {
  const token = Cookies.get('token');
  const user = useSelector((store: AppStore) => store.user);
  if (!token || user.id === '') {
    return false;
  }
  return;
};
