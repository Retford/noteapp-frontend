import {
  Button,
  Card,
  CardBody,
  Input,
  Link,
  Tab,
  Tabs,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useForm } from '../../hooks/useForm';

import { useAuthStore } from '../../hooks/auth/useAuthStore';
import Swal from 'sweetalert2';

const loginFormFields = {
  loginEmail: '',
  loginPassword: '',
};
const registerFormFields = {
  registerName: '',
  registerEmail: '',
  registerPassword: '',
};

export const LoginPage = () => {
  const [selected, setSelected] = useState('login');
  const { startLogin, errorMessage, startRegister } = useAuthStore();

  const {
    loginEmail,
    loginPassword,
    handleInputChange: handleLoginInputChange,
  } = useForm(loginFormFields);
  const {
    registerName,
    registerEmail,
    registerPassword,
    handleInputChange: handleRegisterInputChange,
  } = useForm(registerFormFields);

  const handleLoginSubmit = (event) => {
    event.preventDefault();

    startLogin({ email: loginEmail, password: loginPassword });
  };

  const handleRegisterSubmit = (event) => {
    event.preventDefault();

    startRegister({
      name: registerName,
      email: registerEmail,
      password: registerPassword,
    });
  };

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire('Authentication error', errorMessage, 'error');
    }
  }, [errorMessage]);

  return (
    <div className='flex flex-col w-full h-screen justify-center items-center p-5'>
      <Card className='max-w-full w-[340px]'>
        <CardBody className='overflow-hidden'>
          <Tabs
            fullWidth
            aria-label='Tabs form'
            selectedKey={selected}
            size='md'
            onSelectionChange={setSelected}
          >
            <Tab key='login' title='Login'>
              <form
                className='flex flex-col gap-4'
                onSubmit={handleLoginSubmit}
              >
                <Input
                  isRequired
                  label='Email'
                  placeholder='Enter your email'
                  type='email'
                  autoComplete='email'
                  name='loginEmail'
                  value={loginEmail}
                  onChange={handleLoginInputChange}
                />
                <Input
                  isRequired
                  label='Password'
                  placeholder='Enter your password'
                  type='password'
                  autoComplete='current-password'
                  name='loginPassword'
                  value={loginPassword}
                  onChange={handleLoginInputChange}
                />
                <p className='text-center text-small'>
                  Need to create an account?&nbsp;
                  <Link
                    size='sm'
                    className='cursor-pointer'
                    onPress={() => setSelected('sign-up')}
                  >
                    Sign up
                  </Link>
                </p>
                <div className='flex gap-2 justify-end'>
                  <Button
                    fullWidth
                    type='submit'
                    className='bg-black text-white'
                  >
                    Login
                  </Button>
                </div>
              </form>
            </Tab>

            <Tab key='sign-up' title='Sign up'>
              <form
                className='flex flex-col gap-4'
                onSubmit={handleRegisterSubmit}
              >
                <Input
                  isRequired
                  label='Name'
                  placeholder='Enter your name'
                  type='text'
                  autoComplete='name'
                  name='registerName'
                  value={registerName}
                  onChange={handleRegisterInputChange}
                />
                <Input
                  isRequired
                  label='Email'
                  placeholder='Enter your email'
                  type='email'
                  autoComplete='email'
                  name='registerEmail'
                  value={registerEmail}
                  onChange={handleRegisterInputChange}
                />
                <Input
                  isRequired
                  label='Password'
                  placeholder='Enter your password'
                  type='password'
                  autoComplete='new-password'
                  name='registerPassword'
                  value={registerPassword}
                  onChange={handleRegisterInputChange}
                />
                <p className='text-center text-small'>
                  Already have an account?&nbsp;
                  <Link
                    size='sm'
                    className='cursor-pointer'
                    onPress={() => setSelected('login')}
                  >
                    Login
                  </Link>
                </p>
                <div className='flex gap-2 justify-end'>
                  <Button
                    fullWidth
                    type='submit'
                    className='bg-slate-600 text-white'
                  >
                    Sign up
                  </Button>
                </div>
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
};
