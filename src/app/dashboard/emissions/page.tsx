'use client';

import * as React from 'react';
import { useEffect } from 'react';
import { CalanderIcon, ExportIcon, FilterIcon, ImportIcon } from '@/icons';
import { Box, Button, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useDispatch } from 'react-redux';

import { dataApis } from '@/lib/data/dataApis';
import { CalculateScopes, getCarbonEmission, getCarbonEmissionByCategory, getCarbonEmissionFromTarget } from '@/lib/helper';
import { setDataDB } from '@/lib/store/reducer/useFile';
import CustomTabs from '@/components/commun/Tabs/tabs';
import { CarbonEmissionsCategory } from '@/components/dashboard/overview/CarbonEmissionsCategory';
import { MonthlyCarbonEmissions } from '@/components/dashboard/overview/MonthlyCarbonEmissions';
import Scopes from '@/components/dashboard/overview/Scopes';
import { MuiButton } from '@/styles/theme/components/button';
import { setTargets } from '@/lib/store/reducer/useTarget';
import { Target } from '@/types/target';
import { targetApis } from '@/lib/target/targetApis';

interface Scopes {
  scope1?: number;
  scope2?: number;
  scope3?: number;
  sum?: number;
}
export default function Page(): React.JSX.Element {
  const [selectedTab, setSelectedTab] = React.useState<string>('7 Days');
  const dispatch = useDispatch();
  const [myScope, setMyScope] = React.useState<Scopes>({});
  const [dataEmissionByCat , setDataEmissionByCat] = React.useState([]);
  const [dataEmission , setDataEmission] = React.useState([]);
  const [dataEmissionTarget, setDataEmissionTarget] = React.useState([]);
  const [target, setTarget] = React.useState<Target>({});
  const getTargets = React.useCallback(async (): Promise<void> => {
    const { error, res } = await targetApis.getTargets();
    if (error) {
      return;
    }
    dispatch(setTargets(res));
    setTarget(res);
    setDataEmissionTarget(getCarbonEmissionFromTarget(res))
  }, []);


  const getData = React.useCallback(async (): Promise<void> => {
    const { error, res } = await dataApis.getData();
    if (error) {
      return;
    }
    dispatch(setDataDB(res));
    setMyScope(CalculateScopes(res));
    setDataEmissionByCat(getCarbonEmissionByCategory(res))
    setDataEmission(getCarbonEmission(res))
  }, []);

  useEffect(() => {
    getTargets()
    getData();
  }, [getData , getTargets]);

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
          <Typography variant="bodyP2" color="var(--Grey-grey-400, #88909F)">
            Welcome to Emission Tracking, Your effortless tool for monitoring and managing your carbon footprint.
          </Typography>
        </Grid>
        <Grid item xs={4} container justifyContent="flex-end">
          <Grid item>
            <Button
              btnType="secondaryGray"
              sx={{
                ...MuiButton.styleOverrides.sizeSmall,
                borderRadius: '6px',
                border: '1px solid var(--Grey-grey-200, #B3B8C2)',
                background: 'var(--Colors-Base-00, #FFF)',
              }}
              startIcon={<ImportIcon />}
            >
              <Typography variant="h7" sx={{ color: 'var(--Grey-grey-600, #606977)' }}>
                Import
              </Typography>
            </Button>
          </Grid>
          <Grid item>
            <Button
              btnType="Primary"
              sx={{
                ...MuiButton.styleOverrides.sizeSmall,
                borderRadius: '6px',
                background: 'var(--Green-green-500, #16B364)',
              }}
              startIcon={<ExportIcon fontSize="var(--icon-fontSize-sm)" />}
            >
              <Typography variant="h7" sx={{ color: 'var(--Colors-Base-00, #FFF)' }}>
                Export
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid container justifyContent="space-between" spacing={2} sx={{ paddingTop: '1rem' }}>
        <Grid item xs={8}>
          <CustomTabs value={selectedTab} handleChange={handleTabChange} />
        </Grid>
        <Grid item xs={4} container justifyContent="flex-end">
          <Grid item>
            <Button
              btnType="secondaryGray"
              sx={{
                ...MuiButton.styleOverrides.sizeSmall,
                borderRadius: '6px',
                border: '1px solid var(--Grey-grey-200, #B3B8C2)',
                background: 'var(--Colors-Base-00, #FFF)',
              }}
              startIcon={<CalanderIcon />}
            >
              <Typography variant="h7" sx={{ color: 'var(--Grey-grey-600, #606977)' }}>
                Select Date
              </Typography>
            </Button>
          </Grid>
          <Grid item>
            <Button
              btnType="secondaryGray"
              sx={{
                ...MuiButton.styleOverrides.sizeSmall,
                borderRadius: '6px',
                background: 'var(--Colors-Base-00, #FFF)',
              }}
              startIcon={<FilterIcon fontSize="var(--icon-fontSize-sm)" />}
            >
              <Typography variant="h7" sx={{ color: 'var(--Grey-grey-600, #606977)' }}>
                Filters
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={3} mt={3}>
        <Grid lg={7} md={6} xs={12}>
          <MonthlyCarbonEmissions sx={{ height: '100%' }} dataEmission={dataEmission} dataEmissionTarget={dataEmissionTarget}/>
        </Grid>
        <Grid lg={5} md={12} xs={12}>
          <Scopes scope1={myScope.scope1} scope2={myScope.scope2} scope3={myScope.scope3} />
        </Grid>

        <Grid lg={12} md={12} xs={12}>
          <CarbonEmissionsCategory
            data={dataEmissionByCat}
            sx={{ height: '100%' }}
            showScopesTabs={true}
            value={selectedTab}
            handleChange={handleTabChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
