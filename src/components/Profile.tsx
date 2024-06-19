import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from '@material-tailwind/react';
import React, { useState } from 'react';
import { HiUserCircle, HiSupport, HiLogout, HiCog } from 'react-icons/hi';
import { useFetchAndLoad } from '../hooks';
import { LogoutUser } from '../services';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/states';
import { AppStore } from '../redux/store';
import ProfileIcon from '../assets/profile_icon.svg';
export const Profile = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { callEndpoint } = useFetchAndLoad();
  const user = useSelector((store: AppStore) => store.user);
  const dispatch = useDispatch();
  const closeMenu = () => setIsMenuOpen(false);

  interface ProfileMenuItemProps {
    label: string;
    icon: any;
    action?: () => void;
  }

  const handleLogout = () => {
    const axiosCall = LogoutUser();
    callEndpoint(axiosCall);
    dispatch(logoutUser());
    closeMenu();
  };
  const profileMenuItems: ProfileMenuItemProps[] = [
    {
      label: 'My Profile',
      icon: HiUserCircle,
    },
    {
      label: 'Edit Profile',
      icon: HiCog,
    },
    {
      label: 'Help',
      icon: HiSupport,
    },
    {
      label: 'Sign Out',
      icon: HiLogout,
      action: handleLogout,
    },
  ];

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center rounded-full p-0"
        >
          <Avatar
            variant="circular"
            size="md"
            alt={user.username}
            withBorder={true}
            color="blue-gray"
            className=" p-0.5"
            src={ProfileIcon}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, action }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={action}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? 'hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10'
                  : ''
              }`}
            >
              {React.createElement(icon, {
                className: `h-6 w-6 ${isLastItem ? 'text-red-500' : ''}`,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? 'red' : 'inherit'}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};
