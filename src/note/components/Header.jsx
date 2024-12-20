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
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../hooks/auth/useAuthStore';
import { NoteLogoIcon } from '../icons/NoteLogoIcon';
import { ThemeSwitcher } from '../../theme/components/ThemeSwitcher';

export const Header = () => {
  const { startLogout, user } = useAuthStore();

  const handleClickLogout = () => {
    startLogout();
  };

  return (
    <Navbar isBordered>
      <NavbarContent justify='start'>
        <Link to='/'>
          <NavbarBrand className='mr-4'>
            <NoteLogoIcon className='w-10 h-10' />
            <p className='hidden sm:block font-bold text-inherit pl-2'>
              {user.name}
            </p>
          </NavbarBrand>
        </Link>
        <NavbarContent className='hidden sm:flex gap-3'>
          <NavbarItem>
            <Link to='/notes'>Notes Active</Link>
          </NavbarItem>
          <NavbarItem>
            <Link aria-current='page' to='/notes/archives'>
              Notes Archived
            </Link>
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
              name="Retford"
              size='sm'
              src='/images/profile.webp'
            />
          </DropdownTrigger>
          <DropdownMenu aria-label='Profile Actions' variant='flat'>
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
