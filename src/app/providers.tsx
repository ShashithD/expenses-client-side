import { ReduxProvider } from '@/redux/provider';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ThemeProviderProps } from 'next-themes/dist/types';

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  return (
    <ReduxProvider>
      <NextUIProvider>
        {' '}
        <NextThemesProvider
          defaultTheme="system"
          attribute="class"
          {...themeProps}
        >
          {children}
        </NextThemesProvider>
      </NextUIProvider>
    </ReduxProvider>
  );
}
