import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export const ThemeProvider = ({ children }) => {
  return (
    <NextUIProvider>
      <NextThemesProvider
        attribute='class'
        defaultTheme='system'
        value={{
          light: 'light',
          dark: 'dark',
        }}
      >
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  );
};
