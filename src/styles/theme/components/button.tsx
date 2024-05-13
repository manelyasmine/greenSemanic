import type { Components } from '@mui/material/styles';

import type { Theme } from '../types';

export const MuiButton = {
  styleOverrides: {
    root: { borderRadius: '12px', textTransform: 'none' },
    sizeSmall: { padding: '8px 15px', height: '36px', gap: '10px' },

    sizeMedium: { padding: '10px 16px' },
    sizeLarge: { padding: '11px 24px' },
    textSizeSmall: { padding: '7px 12px' },
    textSizeMedium: { padding: '9px 16px' },
    textSizeLarge: { padding: '12px 16px' },
  },
} satisfies Components<Theme>['MuiButton'];
