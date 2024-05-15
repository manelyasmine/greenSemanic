import React from 'react';
import { Chip, Divider, Stack } from '@mui/material';
import Card, { CardProps } from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, SxProps } from '@mui/system';

import { Button } from '@/components/commun/Button';
import ChipTrend from '@/components/commun/chip/ChipTrend';
import { palette } from '@/styles/theme/colors';

interface EmissionByTypeItemProps {
  target: string;
  units: number;
  sx?: SxProps;
  value: number;
  diff: number;
  trend: 'up' | 'down';
}

const EmissionByTypeItem: React.FC<EmissionByTypeItemProps> = ({
  units,
  target,
  value,
  sx,
  diff,
  trend,
}: EmissionByTypeItemProps) => {
  return (
    // <Card
    //   sx={{
    //     borderRadius: '6px',
    //     padding: '8PX 12px',
    //     //background: palette.primary[50],
    //     '& .MuiCardContent-root': {
    //       padding: 0,
    //     },
    //     ...sx,
    //   }}
    // >
    //   <CardContent>
    <Box >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="column">
          <Typography color={palette.primary[500]} sx={{ fontWeight: 'bold' }}>
            {target}
          </Typography>
          <Typography>{units} units</Typography>
        </Stack>
        <Stack direction="row" columnGap={1} sx={{ alignItems: 'center' }}>
          <Typography sx={{ fontWeight: 'bold' }}>{value} kg</Typography>
          <ChipTrend trend={trend} diff={diff} />
        </Stack>
      </Stack>
      <Divider sx={{clipPath: 'inset(0px -100vmax)'}}/>
    </Box>
    //   </CardContent>
    // </Card>
  );
};

export default EmissionByTypeItem;
