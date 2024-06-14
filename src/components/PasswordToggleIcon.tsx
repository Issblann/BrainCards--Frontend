import { FC } from 'react';
import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri';

interface Props {
  showPassword: boolean;
  togglePasswordVisibility: () => void;
}
const PasswordToggleIcon: FC<Props> = ({
  showPassword,
  togglePasswordVisibility,
}) => {
  return (
    <button type="button" onClick={togglePasswordVisibility}>
      {showPassword ? <RiEyeLine /> : <RiEyeCloseLine />}
    </button>
  );
};

export default PasswordToggleIcon;
