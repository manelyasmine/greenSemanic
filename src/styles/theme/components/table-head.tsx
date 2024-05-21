import type { Components } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';

import type { Theme } from '../types';

export const MuiTableHead = {
  styleOverrides: {
    root: {
      [`& .${tableCellClasses.root}`]: {
        backgroundColor: 'var(--White, #FFF)', 
        
        borderBottom: '1px solid var(--Grey-25, #F4F5F6)',
        
        height: '2.75rem',
        padding: '0.75rem 1.5rem',
        alignItems: 'center',
        gap: '0.75rem',
        alignSelf: 'stretch',


        color: 'var(--Grey-grey-300, #9DA4B0)',
        fontFamily: 'Mulish',
        fontSize: '0.75rem',
        fontStyle: 'normal',
        fontWeight: 700,
        lineHeight: "1.125rem",
 


      },
    },
  },
} satisfies Components<Theme>['MuiTableHead'];
