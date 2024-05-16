import React, { useEffect, useRef } from 'react';
import DZIcon from '@/icons';
import { Card, CardContent, CardHeader, Grid } from '@mui/material';

import Map from '@/components/commun/Map/Map';
import ListItemProgress from '@/components/special/ListItem/ListItemProgress';
import ARMIcon from '@/icons/ARMIcon';
import BLGIcon from '@/icons/BLGIcon';
import ARGIcon from '@/icons/ARGIcon';

export interface EmissionLocationProps {
  sx?: any;
}

export function EmissionLocation({ sx }: EmissionLocationProps): React.JSX.Element {
  return (
    <Card sx={sx}>
      <CardHeader title="Emissions by location" />
      <CardContent>
        <Grid container columnSpacing={5}>
          <Grid item lg={6} md={12} xs={12}>
            <Map value={0} title={''} />
          </Grid>
          <Grid item lg={6} md={12} xs={12}>
            <ListItemProgress title={'Location 1'} icon={<DZIcon />} progress={80} />
            <ListItemProgress title={'Location 2'} icon={<ARMIcon/>} progress={40} />
            <ListItemProgress title={'Location 3'} icon={<BLGIcon />} progress={60} />
            <ListItemProgress title={'Location 4'} icon={<ARGIcon/>} progress={50} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
