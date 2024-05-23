import type { Components } from '@mui/material/styles';

import type { Theme } from '../types';

export const MuiTableCell = {
  styleOverrides: {
    root: { borderBottom: 'var(--TableCell-borderWidth, 1px) solid var(--mui-palette-TableCell-border)',
    
    height: '4.5rem',
    padding: '1rem 1.5rem',
    alignItems: 'center',
    gap: '0.75rem',
    alignSelf: 'stretch',
    color: 'var(--Grey-grey-600, #606977)',
   


     },
    paddingCheckbox: { padding: '0 0 0 24px' },
  },
} satisfies Components<Theme>['MuiTableCell'];
