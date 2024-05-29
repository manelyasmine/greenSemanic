import React from 'react';
import { Chip, Typography } from '@mui/material';
import { Box } from '@mui/system';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { palette } from '@/styles/theme/colors';

export interface ChipTrendProps {
  diff: number;
  trend: 'up' | 'down';
}
export default function ChipTrend({diff, trend}: ChipTrendProps) {
    const TrendIcon = trend === 'up' ? ArrowDropUpIcon : ArrowDropDownIcon;
    const trendColor = trend === 'up' ? palette.primary[500] : palette.danger[500];
  return (
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
        backgroundColor: trend === 'up' ? "#bbebd2": palette.danger[100],
        color: trend === 'up' ? palette.primary[500] : palette.danger[500],
        borderRadius:1
      }}
    />
  );
}
