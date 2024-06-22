'use client';

import * as React from 'react';
import { useState } from 'react';
import type { Metadata } from 'next';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import dayjs from 'dayjs';

import { config } from '@/config';
import CustomTabs from '@/components/commun/Tabs/tabs';
import { CarbonEmissionsCategory } from '@/components/dashboard/overview/CarbonEmissionsCategory';
import { CarbonEmissionsScope } from '@/components/dashboard/overview/CarbonEmissionsScope';
import { CarbonPerMonth } from '@/components/dashboard/overview/CarbonPerMonth';
import { EmissionByType } from '@/components/dashboard/overview/EmissionByType';
import { EmissionLocation } from '@/components/dashboard/overview/EmissionLocation';
import { Footprints } from '@/components/dashboard/overview/Footprint';
//import { LatestOrders } from '@/components/dashboard/overview/latest-orders';
import { MonthlyCarbonEmissions } from '@/components/dashboard/overview/MonthlyCarbonEmissions';
import { Reduction } from '@/components/dashboard/overview/Reduction';
import { Tasks } from '@/components/dashboard/overview/Tasks';
import { TotalProfit } from '@/components/dashboard/overview/total-profit';
import { TotalCO2 } from '@/components/dashboard/overview/TotalCO2';
import { TotalEmissions } from '@/components/dashboard/overview/TotalEmissions';
import Scopes from "@/components/dashboard/overview/Scopes"
// export const metadata = { title: `Overview | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  const [selectedTab, setSelectedTab] = React.useState<string>('7 Days');

  // Function to handle tab changes
  const handleTabChange = (event: React.ChangeEvent<any>, newValue: string) => {
    setSelectedTab(newValue);
  };
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
        Dashboard
      </Typography>
      <CustomTabs value={selectedTab} handleChange={handleTabChange} />
      <div>
        {/* Content for each tab based on the selectedTab value */}
        {/* {selectedTab === '7 Days' && <div>Content for 7 Days</div>}
        {selectedTab === '30 Days' && <div>Content for 30 Days</div>}
        {selectedTab === 'Quarter' && <div>Content for Quarter</div>}
        {selectedTab === '12 Months' && <div>Content for 12 Months</div>} */}
      </div>
      <Grid container spacing={3} mt={3}>
        <Grid lg={4} sm={6} xs={12}>
          <CarbonPerMonth diff={12} trend="up" sx={{ height: '100%' }} value="548752" />
        </Grid>
        <Grid lg={4} sm={6} xs={12}>
          <TotalEmissions diff={0.9} trend="down" sx={{ height: '100%' }} value="548752" />
        </Grid>
        <Grid lg={4} sm={6} xs={12}>
          <Reduction diff={1.4} trend="up" sx={{ height: '100%' }} value={200} />
        </Grid>
        <Grid lg={8} xs={12}>
          <CarbonEmissionsScope
            chartSeries={[
              { name: 'Scope 1', data: [20, 25, 30, 35, 40, 45, 50, 55, 60, 55, 50, 45] },
              { name: 'Scope 2', data: [30, 35, 40, 45, 50, 55, 60, 55, 50, 45, 40, 35] },
              { name: 'Scope 3', data: [40, 45, 50, 55, 60, 55, 50, 45, 40, 35, 30, 25] },
            ]}
            sx={{ height: '100%' }}
          />
        </Grid>
        <Grid lg={4} md={6} xs={12}>
          <Tasks sx={{ height: '100%' }} />
        </Grid>
        <Grid lg={8} md={6} xs={12}>
          <MonthlyCarbonEmissions sx={{ height: '100%' }} />
        </Grid>
        <Grid lg={4} md={12} xs={12}>
         <Scopes />
        </Grid>
        <Grid lg={8} md={12} xs={12}>
          <EmissionLocation sx={{ height: '100%' }} />
        </Grid>
        <Grid lg={4} md={12} xs={12}>
          <EmissionByType sx={{ height: '100%' }} />
        </Grid>
        <Grid lg={7.5} md={6} xs={12}>
          <Footprints sx={{ height: '100%' }} />
        </Grid>
        <Grid lg={4.5} md={6} xs={12}>
          <TotalCO2 sx={{ height: '100%' }} />
        </Grid>
        <Grid lg={12} md={12} xs={12}>
          <CarbonEmissionsCategory sx={{ height: '100%' }} />
        </Grid>
      </Grid>
    </Box>
  );
}
