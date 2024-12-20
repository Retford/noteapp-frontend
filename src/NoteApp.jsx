import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router/AppRouter';
import { store } from './store/store';
import { ThemeProvider } from './theme/ThemeProvider';

export const NoteApp = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider>
          <AppRouter />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};
