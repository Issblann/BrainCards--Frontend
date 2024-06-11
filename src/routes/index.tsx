import { Route, Routes } from 'react-router-dom';
import { Register } from '../pages/Register';
import { Login } from '../pages/Login';
import { Home } from '../pages/Home';
export const Router = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};
