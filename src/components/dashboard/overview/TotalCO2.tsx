import React from 'react';
import { BuildingIcon } from '@/icons/BuildingIcon';
import { CardContent, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/system/Unstable_Grid/Grid';
import Chart from 'react-apexcharts';

import CardTotalCO2 from '@/components/commun/Card/CardTotalCO2';
import { palette } from '@/styles/theme/colors';
import { EngergyIcon } from '@/icons/EngergyIcon';
import { TravelIcon } from '@/icons/TravelIcon';
import { ContactIcon } from '@/icons/ContactIcon';

export interface TotalCO2Props {
  sx?: any; // Define any custom styling props here
}

export function TotalCO2({ sx }: TotalCO2Props): React.JSX.Element {
  return (
    // <Card sx={sx}>
    //   {/* <CardHeader title="Footprints" /> */}

    //   <CardContent>
        <Grid container spacing={4} columns={16} sx={{}} >
          <Grid xs={8}>
            <CardTotalCO2
              sx={{  borderRadius: 1, background: palette.primary[400] }}
              value={15485}
              Icon={<BuildingIcon />}
              fColor={palette.common.white}
              title={'Building'}
            />
          </Grid>
          <Grid xs={8}>
            <CardTotalCO2
              sx={{  borderRadius: 1 }}
              value={15485}
              Icon={<EngergyIcon />}
              title="Energy"
            />
          </Grid>
          <Grid xs={8}>
            <CardTotalCO2
              sx={{  borderRadius: 1 }}
              value={15485}
              Icon={<TravelIcon />}
              title="Travel"
            />
          </Grid>
          <Grid xs={8}>
            <CardTotalCO2
              sx={{  borderRadius: 1 }}
              value={15485}
              Icon={<ContactIcon />}
              title="Total employees"
            />
          </Grid>
        </Grid>
    //   </CardContent>
    // </Card>
  );
}
