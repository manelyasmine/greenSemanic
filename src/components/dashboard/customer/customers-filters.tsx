import * as React from 'react';
import { FilterIcon } from '@/icons';
import Card from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';

import { Button } from '@/components/commun/Button';
import BasicDatePicker from '@/components/commun/Date/Date';
import { palette } from '@/styles/theme/colors';
import { MuiButton } from '@/styles/theme/components/button';

export function CustomersFilters(): React.JSX.Element {
  return (
    <Card
      sx={{
        p: 2,
        display: 'flex',
        padding: 'var(--12, 12px) 16px',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch',
        gap: '8px',
        borderRadius: '12px',
        background: palette.common.white,
      }}
    >
      <OutlinedInput
        defaultValue=""
        placeholder="Search for anything..."
        startAdornment={
          <InputAdornment position="start">
            <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
          </InputAdornment>
        }
        sx={{
          borderRadius: '6px',

          backgroundColor: 'var(--Grey-25, #F4F5F6)',
        }}
      />

      <BasicDatePicker />
    </Card>
  );
}
