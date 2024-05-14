import React, { ReactNode } from 'react';
import { BuildingIcon } from '@/icons/BuildingIcon';
import { Apartment } from '@mui/icons-material';
import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material';
import { Stack } from '@mui/system';

import { palette } from '@/styles/theme/colors';

export interface CardsProps {
  diff?: number;
  Icon: ReactNode;
  value: number;
  fColor?: string;
  title: string;
  sx?: any;
}

export default function CardTotalCO2({ sx, value, Icon, title, fColor }: CardsProps): React.JSX.Element {
  return (
    <Card sx={sx}>
      <CardContent>
        <Box
          sx={{
            background: palette.primary[50],
            height: 36,
            width: 36,
            display: 'flex',
            justifyContent: 'center', // Horizontal centering
            alignItems: 'center',
            borderRadius: 1,
          }}
        >
          {Icon}
          {/* <BuildingIcon /> */}
          {/* <Apartment color="primary" /> */}
        </Box>
        <Box display="flex" gap={1} alignItems="flex-end" sx={{ marginTop: 2 }}>
          <Typography variant="h3" color={fColor}>
            {value}
          </Typography>
          <Typography variant="caption" color={fColor}>
            tCO2
          </Typography>
        </Box>

        <Typography variant="h6" sx={{ marginTop: 2 }} color={fColor}>
          {title}
        </Typography>
      </CardContent>

      {/* <CardHeader>
            
        </CardHeader> */}
    </Card>
  );
}
