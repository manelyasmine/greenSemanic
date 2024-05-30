import React from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { Chip as ChipMUI, Typography } from '@mui/material';
import { Box } from '@mui/system';

import { palette } from '@/styles/theme/colors';

export interface ChipTrendProps {
  chipType?: 'primary' | 'secondary' | 'tertiary' | 'primaryLight' | 'secondaryGray' | 'dashBorder' | 'link' | 'info';
  children: React.ReactNode;
}
export default function Chip({ chipType, children }: ChipTrendProps) {
  let backgroundColor, color;
  switch (chipType) {
    case 'primary':
      backgroundColor = palette.primary[500];
      color = palette.common.white;
      break;
    case 'primaryLight':
      backgroundColor = palette.primary[50];
      color = palette.primary[500];
      break;

    case 'info':
      backgroundColor = palette.info[100];
      color = "#155b7e";
      break;
  }
  return (
    <ChipMUI
      label={
        <Box display="flex" alignItems="center">
          {children}
        </Box>
      }
      sx={{
        backgroundColor: backgroundColor,
        color: color,
        borderRadius:1
      }}
    />
  );
}
