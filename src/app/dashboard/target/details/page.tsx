'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import { CarbonPerMonth } from '@/components/dashboard/overview/CarbonPerMonth';
import { Reduction } from '@/components/dashboard/overview/Reduction';
import { TotalEmissions } from '@/components/dashboard/overview/TotalEmissions';
import { AnnualFootprint } from '@/components/dashboard/targets/AnnualFootprint';
import { SavingsEstimator } from '@/components/dashboard/targets/SavingsEstimator';
import { TargetAnnualReduction } from '@/components/dashboard/targets/TargetAnnualReduction';
import DetailsCard from '@/components/dashboard/targets/details-card';
import { MonthlyCarbonEmissions } from '@/components/dashboard/overview/MonthlyCarbonEmissions';

export interface PageProps {
    target : any[] // Define any custom styling props here
  }
export default function Page() {

  
  return (
    <Box>
      <Typography
        sx={{
          fontSize: '32px',
          fontStyle: 'normal',
          fontWeight: 600,
          lineHeight: '125%',
        }}
        gutterBottom
      >
        Targets
      </Typography>

      <Grid container spacing={2} mt={3}>
        <Grid lg={4} sm={6} xs={12}>
          <AnnualFootprint diff={12} trend="up" sx={{ height: '100%' }} value="548752" />
        </Grid>
        <Grid lg={4} sm={6} xs={12}>
          <TargetAnnualReduction diff={1.4} trend="up" sx={{ height: '100%' }} value={"200"} />
        </Grid>
        <Grid lg={4} sm={6} xs={12}>
          <SavingsEstimator diff={0.9} trend="down" sx={{ height: '100%' }} value="548752" />
        </Grid>
        <Grid lg={5} sm={6} xs={12}>
            <DetailsCard  /> 
        </Grid>
        <Grid lg={7} sm={6} xs={12}>
            <MonthlyCarbonEmissions sx={{ height: '100%' }} /> 
        </Grid>
      </Grid>
    </Box>
  );
}
