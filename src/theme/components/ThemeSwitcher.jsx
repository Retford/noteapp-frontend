import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { SunnyIcon } from '../icons/SunnyIcon';
import { MoonIcon } from '../icons/MoonIcon';

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      {theme !== 'dark' ? (
        <button onClick={() => setTheme('dark')}>
          <SunnyIcon className='w-9 h-9' />
        </button>
      ) : (
        <button onClick={() => setTheme('light')}>
          <MoonIcon className='w-9 h-9' />
        </button>
      )}
    </div>
  );
};
