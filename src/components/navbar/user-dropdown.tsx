import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarItem,
} from "@nextui-org/react";
import React, { useCallback, useState, useEffect } from "react";
import { DarkModeSwitch } from "./darkmodeswitch";
import { useRouter } from "next/navigation";
import { signOut } from '@/redux/slices/auth-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store'
import { generatePlaceholderImage } from "@/utils/imageUtils";

export const UserDropdown = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [userDetails, setUserDetails] = useState({ name: '', email: '' });

  useEffect(() => {
    setUserDetails({
      name: localStorage.getItem('name') || '',
      email: localStorage.getItem('email') || ''
    });
  }, []);

  const handleLogout = useCallback(async () => {
    await dispatch(signOut());
    router.replace("/login");
  }, [router]);

  console.log(generatePlaceholderImage(userDetails.name))

  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          {/* <Avatar
            as='button'
            color='secondary'
            size='md'
            src={generatePlaceholderImage(userDetails.name)}
          /> */}
          <button className="user-avatar-btn">
          <div className="user-avatar">
             <img src={generatePlaceholderImage(userDetails.name)} alt="" />
             </div>
          </button>
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        aria-label='User menu actions'
        onAction={(actionKey) => console.log({ actionKey })}>
        <DropdownItem
          key='profile'
          className='flex flex-col justify-start w-full items-start'>
          <p>{userDetails.name}</p>
          <p>{userDetails.email}</p>
        </DropdownItem>
        <DropdownItem
          key='logout'
          color='danger'
          className='text-danger'
          onPress={handleLogout}>
          Log Out
        </DropdownItem>
        <DropdownItem key='switch'>
          <DarkModeSwitch />
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
