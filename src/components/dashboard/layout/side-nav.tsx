'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { usePathname } from 'next/navigation';
import { LeftChevronIcon } from '@/icons';
import { Close as CloseIcon, Menu as MenuIcon } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowSquareUpRight as ArrowSquareUpRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowSquareUpRight';
import { CaretUpDown as CaretUpDownIcon } from '@phosphor-icons/react/dist/ssr/CaretUpDown';

import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';
import { isNavItemActive } from '@/lib/is-nav-item-active';
import { Logo } from '@/components/core/logo';
import { palette } from '@/styles/theme/colors';

import { navItems } from './config';
import { navIcons } from './nav-icons';

export function SideNav({ isOpen, toggleSidebar }: { isOpen: boolean; toggleSidebar: () => void }): React.JSX.Element {
  const pathname = usePathname();

  return (
    <Box>
      {/* Sidebar */}
      <Box
        sx={{
          bgcolor: 'var(--SideNav-background)',
          color: 'var(--SideNav-color)',
          display: { xs: isOpen ? 'flex' : 'none', lg: 'flex' },
          flexDirection: 'column',
          height: '100%',
          left: 0,
          maxWidth: '100%',
          position: 'fixed',
          scrollbarWidth: 'none',
          top: 0,
          width: 'var(--SideNav-width)',
          zIndex: 'var(--SideNav-zIndex)',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        <Box sx={{ p: '10px', display: 'flex', alignItems: 'center' }}>
          <Box component={RouterLink} href={paths.home} sx={{ display: 'inline-flex' }}>
            <Logo height={32} width={122} />
          </Box>

          {/* Sidebar toggle button */}
          <Button onClick={toggleSidebar} sx={{ ml: 'auto' }}>
            {isOpen ? <CloseIcon /> : <LeftChevronIcon />}
          </Button>
        </Box>
        <Divider sx={{ borderColor: '#DBDBDB' }} />
        <Box component="nav" sx={{ flex: '1 1 auto', p: '12px' }}>
          {renderNavItems({ pathname, items: navItems })}
        </Box>
        <Divider sx={{ borderColor: 'var(--mui-palette-neutral-700)' }} />
        {/* Add bottom options here */}
      </Box>
    </Box>
  );
}

function renderNavItems({ items = [], pathname }: { items?: NavItemConfig[]; pathname: string }): React.JSX.Element {
  const children = items.reduce((acc: React.ReactNode[], curr: NavItemConfig): React.ReactNode[] => {
    const { key, ...item } = curr;

    acc.push(<NavItem key={key} pathname={pathname} {...item} />);

    return acc;
  }, []);

  return (
    <Stack component="ul" spacing={1} sx={{ listStyle: 'none', m: 0, p: 0 }}>
      {children}
    </Stack>
  );
}

interface NavItemProps extends Omit<NavItemConfig, 'items'> {
  pathname: string;
}

function NavItem({ disabled, external, href, icon, matcher, pathname, title }: NavItemProps): React.JSX.Element {
  const active = isNavItemActive({ disabled, external, href, matcher, pathname });

  console.log('icon:', icon);
  console.log('navIcons:', navIcons);

  const Icon = icon ? icon : null;

  console.log('Icon:', Icon);

  return (
    <li>
      <Box
        {...(href
          ? {
              component: external ? 'a' : RouterLink,
              href,
              target: external ? '_blank' : undefined,
              rel: external ? 'noreferrer' : undefined,
            }
          : { role: 'button' })}
        sx={{
          alignItems: 'center',
          borderRadius: 1,
          color: 'var(--NavItem-color)',
          cursor: 'pointer',
          display: 'flex',
          flex: '0 0 auto',
          gap: 1,
          p: '6px 16px',
          position: 'relative',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          ...(disabled && {
            bgcolor: 'var(--NavItem-disabled-background)',
            color: 'var(--NavItem-disabled-color)',
            cursor: 'not-allowed',
          }),
          ...(active && { bgcolor: 'var(--NavItem-active-background)', color: 'var(--NavItem-active-color)' }),
        }}
      >
        <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', flex: '0 0 auto' }}>
          {Icon ? (
            <Icon
              fill={active ? 'var(--NavItem-icon-active-color)' : 'var(--NavItem-icon-color)'}
              fontSize="var(--icon-fontSize-md)"
              weight={active ? 'fill' : undefined}
            />
          ) : null}
        </Box>
        <Box sx={{ flex: '1 1 auto' }}>
          <Typography
            component="span"
            sx={{ color: 'inherit', fontSize: '0.875rem', fontWeight: 500, lineHeight: '28px' }}
          >
            {title}
          </Typography>
        </Box>
      </Box>
    </li>
  );
}
