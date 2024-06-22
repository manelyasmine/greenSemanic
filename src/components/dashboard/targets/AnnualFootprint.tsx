import * as React from 'react';
import { ChartIcon } from '@/icons';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { Box, Chip } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';

import { palette } from '@/styles/theme/colors';
import ChipTrend from '@/components/commun/Chip/ChipTrend';

export interface TotalCustomersProps {
  diff?: number;
  trend: 'up' | 'down';
  sx?: SxProps;
  value: string;
}

export function AnnualFootprint({ diff, trend, sx, value }: TotalCustomersProps): React.JSX.Element {

  return (
    <Card
      sx={{
        backgroundColor: palette.primary[50],
        border: 'none',
        boxShadow: 'none',
        borderColor: 'transparent',
        '&.MuiPaper-root.MuiCard-root.MuiPaper-elevation1': {
          boxShadow: 'none',
        },

        ...sx,
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
            <Stack spacing={1}>
              <Typography color={palette.gray[600]} variant="body2" fontWeight={700}>
                Annual footprint
              </Typography>
              <Box display="flex" gap={2} alignItems="flex-end">
                <Typography
                  variant="h4"
                  fontWeight={700}
                  sx={{
                    color: palette.common.black,
                  }}
                >
                  {value}{' '}
                </Typography>
                <Typography variant="body2">tCO2e</Typography>
              </Box>
            </Stack>
            <ChartIcon />
          </Stack>

          {diff ? (
            <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
              <Typography fontSize="12px" color={palette.gray[400]}>
                Since last year
              </Typography>
              <Stack sx={{ alignItems: 'center' }} direction="row" spacing={0.5}>
                <ChipTrend diff={diff} trend={trend} />
              </Stack>
            </Stack>
          ) : null}
        </Stack>
      </CardContent>
    </Card>
  );
}
