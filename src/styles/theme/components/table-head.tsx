import type { Components } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';

import type { Theme } from '../types';

export const MuiTableHead = {
  styleOverrides: {
    root: {
      [`& .${tableCellClasses.root}`]: {
        backgroundColor: 'var(--White, #FFF)',
        color: 'var(--mui-palette-text-secondary)',
        lineHeight: 1,
        borderBottom: '1px solid var(--Grey-25, #F4F5F6)',
      },
    },
  },
} satisfies Components<Theme>['MuiTableHead'];
