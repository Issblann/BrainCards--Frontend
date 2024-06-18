import Cookies from 'js-cookie';

const isAuth = () => {
  const token = Cookies.get('token');

  console.log('token', token);
};

export default isAuth;
