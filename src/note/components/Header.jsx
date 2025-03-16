import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../hooks/auth/useAuthStore';
import { ThemeSwitcher } from '../../theme/components/ThemeSwitcher';
import { NoteLogoIcon } from '../icons/NoteLogoIcon';

export const Header = () => {
  const { startLogout, user } = useAuthStore();
  const navigate = useNavigate();

  const handleClickLogout = () => {
    startLogout();
  };

  return (
    <Navbar isBordered>
      <NavbarContent justify='start'>
        <NavLink to='/'>
          <NavbarBrand className='mr-4'>
            <NoteLogoIcon className='w-10 h-10' />
            <p className='hidden sm:block font-bold text-inherit pl-2'>
              {user.name}
            </p>
          </NavbarBrand>
        </NavLink>
        <NavbarContent className='hidden sm:flex gap-3'>
          <NavbarItem>
            <NavLink
              to='/notes'
              end
              className={({ isActive }) =>
                isActive ? 'button--active' : 'text-gray-700'
              }
            >
              Active Notes
            </NavLink>
          </NavbarItem>
          <NavbarItem>
            <NavLink
              aria-current='page'
              to='/notes/archives'
              className={({ isActive }) =>
                isActive ? 'button--active' : 'text-gray-700'
              }
            >
              Archived Notes
            </NavLink>
          </NavbarItem>
        </NavbarContent>
      </NavbarContent>

      <NavbarContent as='div' className='items-center' justify='end'>
        <Dropdown placement='bottom-end'>
          <DropdownTrigger>
            <Avatar
              isBordered
              as='button'
              className='transition-transform'
              color='secondary'
              name='Retford'
              size='sm'
              src='/images/profile.webp'
            />
          </DropdownTrigger>
          <DropdownMenu aria-label='Profile Actions' variant='flat'>
            <DropdownItem
              key='logout'
              color='secondary'
              onPress={() => navigate('/notes')}
            >
              Notes Active
            </DropdownItem>
            <DropdownItem
              key='logout'
              color='secondary'
              onPress={() => navigate('/notes/archives')}
            >
              Notes Archived
            </DropdownItem>
            <DropdownItem
              key='logout'
              color='danger'
              onPress={handleClickLogout}
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      <ThemeSwitcher />
    </Navbar>
  );
};
