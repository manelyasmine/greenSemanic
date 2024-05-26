'use client';

import * as React from 'react';
import { Box, Typography,Button } from '@mui/material';
import { MuiButton } from '@/styles/theme/components/button';
import Grid from '@mui/material/Unstable_Grid2';
import {ImportIcon,ExportIcon,CalanderIcon, FilterIcon } from '@/icons';
import CustomTabs from '@/components/commun/Tabs/tabs';
import { CarbonEmissionsCategory } from '@/components/dashboard/overview/CarbonEmissionsCategory';
import { MonthlyCarbonEmissions } from '@/components/dashboard/overview/MonthlyCarbonEmissions';
import Scopes from "@/components/dashboard/overview/Scopes"

export default function Page(): React.JSX.Element {
  const [selectedTab, setSelectedTab] = React.useState<string>('7 Days');

  // Function to handle tab changes
  const handleTabChange = (event: React.ChangeEvent<any>, newValue: string) => {
    setSelectedTab(newValue);
  };
  return (
    <Box>
    <Grid container justifyContent="space-between" spacing={2}>
      <Grid item xs={8}>
        <Typography variant="h3" color="var(--Grey-grey-900, #1A1D21)" gutterBottom>
          Emission Tracking
        </Typography>
        <Typography variant="bodyP2" color="var(--Grey-grey-400, #88909F)" >
          Welcome to Emission Tracking, Your effortless tool for monitoring and managing your carbon footprint.
        </Typography>
      </Grid>
      <Grid item xs={4} container justifyContent="flex-end">
        <Grid item>
          <Button 
            btnType="secondaryGray"
            sx={{ 
              ...MuiButton.styleOverrides.sizeSmall,
              borderRadius: "6px",
              border: '1px solid var(--Grey-grey-200, #B3B8C2)',
              background: 'var(--Colors-Base-00, #FFF)',
            }}
            startIcon={<ImportIcon   />}  
          >
            <Typography variant="h7" sx={{ color: "var(--Grey-grey-600, #606977)" }}>
              Import
            </Typography>
          </Button>
        </Grid>
        <Grid item>
          <Button
            btnType="Primary"
            sx={{
              ...MuiButton.styleOverrides.sizeSmall,
              borderRadius: "6px",
              background: "var(--Green-green-500, #16B364)",
            }}
            startIcon={<ExportIcon fontSize="var(--icon-fontSize-sm)" />}  
          >
            <Typography variant="h7" sx={{ color: "var(--Colors-Base-00, #FFF)" }}>
              Export
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </Grid>


    <Grid container justifyContent="space-between" spacing={2} sx={{paddingTop:"1rem"}}>
      <Grid item xs={8}>
        <CustomTabs value={selectedTab} handleChange={handleTabChange}  />
      </Grid>
      <Grid item xs={4} container justifyContent="flex-end">
        <Grid item>
          <Button 
            btnType="secondaryGray"
            sx={{ 
              ...MuiButton.styleOverrides.sizeSmall,
              borderRadius: "6px",
              border: '1px solid var(--Grey-grey-200, #B3B8C2)',
              background: 'var(--Colors-Base-00, #FFF)',
            }}
            startIcon={<CalanderIcon />}
           
        >
       
            <Typography variant="h7" sx={{ color: "var(--Grey-grey-600, #606977)" }}>
            Select Date
            </Typography>
          </Button>
        </Grid>
        <Grid item>
          <Button
            btnType="secondaryGray"
            sx={{
              ...MuiButton.styleOverrides.sizeSmall,
              borderRadius: "6px",
              background: "var(--Colors-Base-00, #FFF)",
            }}
            startIcon={<FilterIcon fontSize="var(--icon-fontSize-sm)" />}  
          >
            <Typography variant="h7" sx={{ color: "var(--Grey-grey-600, #606977)" }}>
             
             Filters
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </Grid>

 
      
      <div>
   
          </div>
      <Grid container spacing={3} mt={3}>
      {/*   <Grid lg={4} sm={6} xs={12}>
          <CarbonPerMonth diff={12} trend="up" sx={{ height: '100%' }} value="548752" />
          </Grid> */}
        {/* <Grid lg={4} sm={6} xs={12}>
          <TotalEmissions diff={0.9} trend="down" sx={{ height: '100%' }} value="548752" />
        </Grid> */}
       {/*  <Grid lg={4} sm={6} xs={12}>
          <Reduction diff={1.4} trend="up" sx={{ height: '100%' }} value={200} />
        </Grid> */}
      {/*   <Grid lg={8} xs={12}>
          <CarbonEmissionsScope
            chartSeries={[
              { name: 'Scope 1', data: [20, 25, 30, 35, 40, 45, 50, 55, 60, 55, 50, 45] },
              { name: 'Scope 2', data: [30, 35, 40, 45, 50, 55, 60, 55, 50, 45, 40, 35] },
              { name: 'Scope 3', data: [40, 45, 50, 55, 60, 55, 50, 45, 40, 35, 30, 25] },
            ]}
            sx={{ height: '100%' }}
          />
        </Grid> */}
      {/*   <Grid lg={4} md={6} xs={12}>
          <Tasks sx={{ height: '100%' }} />
        </Grid> */}
        <Grid lg={7} md={6} xs={12}>

          <MonthlyCarbonEmissions sx={{ height: '100%' }} />
        </Grid>
        <Grid lg={5} md={12} xs={12}>
      
      <Scopes    />
    </Grid>
     
     {/*    <Grid lg={8} md={12} xs={12}>
          <EmissionLocation sx={{ height: '100%' }} />
        </Grid> */}
      {/*   <Grid lg={4} md={12} xs={12}>
          <EmissionByType sx={{ height: '100%' }} />
        </Grid> */}
       {/*  <Grid lg={7.5} md={6} xs={12}>
          <Footprints sx={{ height: '100%' }} />
        </Grid> */}
      {/*   <Grid lg={4.5} md={6} xs={12}>
          <TotalCO2 sx={{ height: '100%' }} />
        </Grid> */}
        <Grid lg={12} md={12} xs={12}> 
          <CarbonEmissionsCategory sx={{ height: '100%' }} showScopesTabs={true} value={selectedTab} handleChange={handleTabChange}  />
        </Grid>
      </Grid>
    </Box>
  );
}
