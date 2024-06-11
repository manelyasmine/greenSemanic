import React from 'react';
import { CalanderIcon } from '@/icons';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useSelector } from 'react-redux';

import { CalculateEmission, CalculateScopes, extractScops, getCarbonEmissionByCategory } from '@/lib/helper';
import { Button } from '@/components/commun/Button';
import CustomTabs from '@/components/commun/Tabs/tabs';
import { MuiButton } from '@/styles/theme/components/button';

import { CarbonEmissionsCategory } from '../../overview/CarbonEmissionsCategory';
import { CarbonEmissionsScope } from '../../overview/CarbonEmissionsScope';
import { CarbonPerMonth } from '../../overview/CarbonPerMonth';
import { CardBoard } from '../../overview/CardBoard';
import { MonthlyCarbonEmissions } from '../../overview/MonthlyCarbonEmissions';
import { Reduction } from '../../overview/Reduction';
import Scopes from '../../overview/Scopes';
import { TotalEmissions } from '../../overview/TotalEmissions';

export default function ExportStepFour() {
  const [selectedTab, setSelectedTab] = React.useState<string>('7 Days');
  const { dataDB } = useSelector((state: any) => state.file);
  const { scope1, scope2, scope3, sum } = CalculateScopes(dataDB);
  const { scope1Arr, scope2Arr, scope3Arr } = extractScops(dataDB);
  const emissionFactor = CalculateEmission(dataDB);
  const dataEmissionByCat = getCarbonEmissionByCategory(dataDB)
  const handleTabChange = () => {};
  return (
    <Grid
      container
      xs={12}
      sx={{
        display: 'flex',
        flex: '1 0 0',
        padding: '24px 0px',
        //flexDirection: 'column',
        justifyContent: 'center',
        //alignItems: 'center',
        width: '100%',
      }}
    >
      {/* <Box> */}
      <Grid container xs={8} spacing={2}>
        <Grid item xs={8}>
          <Typography variant="h3" color="var(--Grey-grey-900, #1A1D21)" gutterBottom>
            Preview
          </Typography>
          <Typography variant="bodyP2" color="var(--Grey-grey-400, #88909F)">
            you can see a preview of uploaded file to confirm that the data are correct
          </Typography>
        </Grid>

        <Grid xs={12} container justifyContent="flex-end">
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
        </Grid>
        <Grid container xs={12} spacing={1}>
          <Grid lg={4} sm={6} xs={12}>
            <CarbonPerMonth diff={12} trend="up" sx={{ height: '100%' }} value="548752" />
          </Grid>
          <Grid lg={4} sm={6} xs={12}>
            <CardBoard diff={1.4} trend="up" value={emissionFactor} color={'primaryLight'} title={'Total Emission'} />
          </Grid>
          <Grid lg={4} sm={6} xs={12}>
            <CardBoard diff={1.4} trend="up" value={sum} color={'gray'} title={'Total Scopes'} />
          </Grid>
        </Grid>
      </Grid>

      <Grid container xs={8} spacing={3} mt={3}>
        <Grid lg={7} md={6} xs={12}>
          <CarbonEmissionsScope
            chartSeries={[
              { name: 'Scope 1', data: scope1Arr.slice(0, 12) },
              { name: 'Scope 2', data: scope2Arr.slice(0, 12) },
              { name: 'Scope 3', data: scope3Arr.slice(0, 12) },
            ]}
          />
        </Grid>
        <Grid lg={5} md={12} xs={12}>
          <Scopes scope1={scope1} scope2={scope2} scope3={scope3} />
        </Grid>
        <Grid lg={7} md={6} xs={12}>
          <MonthlyCarbonEmissions sx={{ height: '100%' }} />
        </Grid>
        <Grid lg={5} md={12} xs={12}>
          <CarbonEmissionsCategory
            data={dataEmissionByCat}
            sx={{ height: '100%' }}
            showScopesTabs={false}
            value={selectedTab}
            handleChange={handleTabChange}
          />
        </Grid>
      </Grid>
      {/* </Box> */}
    </Grid>
  );
}
