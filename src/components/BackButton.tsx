import { Button } from '@material-tailwind/react';
import { FC, ReactElement } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface BackButtonProps {
  title: string;
  icon?: ReactElement;
  className?: string;
}
export const BackButton: FC<BackButtonProps> = ({ title, icon, className }) => {
  const navigate = useNavigate();
  return (
    <>
      <Link
        to={'..'}
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
        className={`w-full ${className}`}
      >
        <Button
          size="sm"
          variant="text"
          className={`text-lavender-600 flex flex-row-reverse hover:bg-lavender-300 transition-all ease-in-out text-center gap-2 items-center text-lg  ${className}`}
        >
          {title}
          {icon && <span>{icon}</span>}
        </Button>
      </Link>
    </>
  );
};
