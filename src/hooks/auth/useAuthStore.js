import { useDispatch, useSelector } from 'react-redux';

import noteApi from '../../api/noteApi';
import {
  clearErrorMessage,
  handleChecking,
  handleLogin,
  handleLogout,
} from '../../store/slices/auth/authSlice';
import { handleLogoutNoteApp } from '../../store/slices/note/noteSlice';

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    dispatch(handleChecking());

    try {
      const { data } = await noteApi.post('/auth', { email, password });

      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(handleLogin({ name: data.name, uid: data.uid }));
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      dispatch(handleLogout('Credenciales incorrectas'));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const startRegister = async ({ name, email, password }) => {
    try {
      const { data } = await noteApi.post('/auth/new', {
        name,
        email,
        password,
      });

      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(handleLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      dispatch(handleLogout(error.response?.data.msg || ''));

      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) return dispatch(handleLogout());

    try {
      const { data } = await noteApi.get('/auth/renew');
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(handleLogin({ name: data.name, uid: data.uid }));
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      localStorage.clear();
      dispatch(handleLogout());
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(handleLogoutNoteApp());
    dispatch(handleLogout());
  };

  return {
    errorMessage,
    status,
    user,
    checkAuthToken,
    startLogin,
    startLogout,
    startRegister,
  };
};
