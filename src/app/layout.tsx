'use client';

import * as React from 'react';
import type { Viewport } from 'next';
import { SessionProvider } from 'next-auth/react';

import '@/styles/global.css';

import { Provider, useDispatch, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import store, { persistor } from '@/lib/store/store';
import { UserProvider } from '@/contexts/user-context';
import { LocalizationProvider } from '@/components/core/localization-provider';
import { ThemeProvider } from '@/components/core/theme-provider/theme-provider';
import Toast from '@/components/commun/Toast/Toast';
import { setCloseToast } from '@/lib/store/reducer/useGlobalActions';

export const viewport = { width: 'device-width', initialScale: 1 } satisfies Viewport;

interface LayoutProps {
  children: React.ReactNode;
  // Include session prop, which will be provided by Next.js
  session: any;
}

export default function Layout({ children, session, ...rest }: LayoutProps): React.JSX.Element {

  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <SessionProvider session={session}>
              {' '}
              {/* Wrap children with SessionProvider */}
              <LocalizationProvider>
                <UserProvider>
                  <ThemeProvider>
                    {children}{' '}
                   
                  </ThemeProvider>
                </UserProvider>
              </LocalizationProvider>
            </SessionProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
