import { Route, Routes } from 'react-router-dom';

interface Props {
  children: JSX.Element | JSX.Element[];
}
export const RoutesWithNoFound = ({ children }: Props) => {
  return (
    <Routes>
      {children}
      <Route path="*" element={<h1 className="text-black">Not found</h1>} />
    </Routes>
  );
};
