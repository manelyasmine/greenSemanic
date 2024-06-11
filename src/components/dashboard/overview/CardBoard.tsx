import * as React from 'react';
import { ChartIcon } from '@/icons';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { Box, Chip } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { ListBullets as ListBulletsIcon } from '@phosphor-icons/react/dist/ssr/ListBullets';

import { palette } from '@/styles/theme/colors';

export interface TasksProgressProps {
  sx?: SxProps;
  value: number;
  diff?: number;
  trend: 'up' | 'down';
  color: 'primary' | 'primaryLight' | 'gray';
  title: string;
}

export function CardBoard({ diff, trend, value, sx, color , title }: TasksProgressProps): React.JSX.Element {
  const TrendIcon = trend === 'up' ? ArrowDropUpIcon : ArrowDropDownIcon;
  const trendColor = trend === 'up' ? palette.primary[500] : palette.danger[500];
  let bgColor;
  switch (color) {
    case 'primary':
      bgColor = palette.primary[500];
    case 'primaryLight':
      bgColor = palette.primary[50];
      break;
    case 'gray':
      bgColor = '#DAEAEA';
      break;
  }
  return (
    <Card
      sx={{
        backgroundColor: bgColor,
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
                {title}
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
                Since last month
              </Typography>
              <Stack sx={{ alignItems: 'center' }} direction="row" spacing={0.5}>
                <Chip
                  label={
                    <Box display="flex" alignItems="center">
                      <TrendIcon sx={{ color: trendColor }} fontSize="small" />
                      <Typography color={trendColor} variant="body2">
                        {diff}%
                      </Typography>
                    </Box>
                  }
                  sx={{
                    backgroundColor: trend === 'up' ? palette.primary[100] : palette.danger[100],
                    color: trend === 'up' ? palette.primary[500] : palette.danger[500],
                  }}
                />
              </Stack>
            </Stack>
          ) : null}
        </Stack>
      </CardContent>
    </Card>
  );
}
