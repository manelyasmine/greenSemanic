'use client';

import * as React from 'react';
import type { Viewport } from 'next';
import { SessionProvider } from 'next-auth/react';

import '@/styles/global.css';

import { UserProvider } from '@/contexts/user-context';
import { LocalizationProvider } from '@/components/core/localization-provider';
import { ThemeProvider } from '@/components/core/theme-provider/theme-provider';

export const viewport = { width: 'device-width', initialScale: 1 } satisfies Viewport;

interface LayoutProps {
  children: React.ReactNode;
  // Include session prop, which will be provided by Next.js
  session: any;
}

export default function Layout({ children, session }: LayoutProps): React.JSX.Element {
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          {' '}
          {/* Wrap children with SessionProvider */}
          <LocalizationProvider>
            <UserProvider>
              <ThemeProvider>{children}</ThemeProvider>
            </UserProvider>
          </LocalizationProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
