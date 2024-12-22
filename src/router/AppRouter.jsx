import { Spinner } from '@nextui-org/react';
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../auth/pages/LoginPage';
import { useAuthStore } from '../hooks/auth/useAuthStore';
import { ArchivedNotesPage } from '../note/pages/ArchivedNotesPage';
import { NotePage } from '../note/pages/NotePage';

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === 'checking') {
    return (
      <div className='w-full h-screen grid place-content-center'>
        <Spinner label='Loading...' color='danger' labelColor='danger' />
      </div>
    );
  }

  return (
    <Routes>
      {status === 'not-authenticated' ? (
        <>
          <Route path='/auth/*' element={<LoginPage />} />
          <Route path='/*' element={<Navigate to='/auth/login' />} />
        </>
      ) : (
        <>
          <Route path='/notes' element={<NotePage />} />
          <Route path='/notes/archives' element={<ArchivedNotesPage />} />
          <Route path='/*' element={<Navigate to='/notes' />} />
        </>
      )}
    </Routes>
  );
};
