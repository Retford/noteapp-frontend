import { Tab, Tabs, Tooltip } from '@nextui-org/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { SystemIcon } from '../../assets/icons/SystemIcon';
import { MoonIcon } from '../icons/MoonIcon';
import { SunnyIcon } from '../icons/SunnyIcon';

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Tabs
      aria-label='Options'
      color='secondary'
      variant='bordered'
      selectedKey={theme}
      onSelectionChange={setTheme}
    >
      <Tab
        key='light'
        title={
          <Tooltip showArrow content='Light' placement='bottom'>
            <SunnyIcon />
          </Tooltip>
        }
      />
      <Tab
        key='dark'
        title={
          <Tooltip showArrow content='Dark' placement='bottom'>
            <MoonIcon />
          </Tooltip>
        }
      />
      <Tab
        key='system'
        title={
          <Tooltip showArrow content={'System'} placement='bottom'>
            <SystemIcon />
          </Tooltip>
        }
      />
    </Tabs>
  );
};
