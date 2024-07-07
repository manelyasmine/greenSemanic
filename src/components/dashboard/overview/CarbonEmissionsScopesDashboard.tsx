import * as React from 'react';
import { Box, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import type { SxProps } from '@mui/material/styles';
import type { ApexOptions } from 'apexcharts';

import { Chart } from '@/components/core/chart';
import { palette } from '@/styles/theme/colors';
import { getCarbonEmissionScopesChartDashboard } from '@/lib/helper';
import { LegendToggleTwoTone } from '@mui/icons-material';

export interface SalesProps {
  sx?: SxProps;
  
  data: any;
  displayPer: string;
  typeReporting: string;
  startDate: string;
  endDate: string;
}

let categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];



export function CarbonEmissionsScope({ sx, data, displayPer,  startDate, endDate }: SalesProps): React.JSX.Element {
 let selected=""
    if(startDate && endDate){
        selected="custom"
    
}else{
       selected=displayPer
     
}

const processedData = getCarbonEmissionScopesChartDashboard( data,  selected, startDate,endDate );

  
  categories = processedData.groupedData?.map(group => group.name);
 
  //const categories = Object.keys(processedData.groupedData);
  const transformedChartData = {
    scope1: [],
    scope2: [],
    scope3: [],
  };
  /*  processedData.groupedData.forEach(group => {
    transformedChartData.scope1.push(group.data[0]);
    transformedChartData.scope2.push(group.data[1]);
    transformedChartData.scope3.push(group.data[2]);
  }); */
  
    processedData.groupedData.forEach(group => {
      transformedChartData.scope1.push(group.data[0]);
      transformedChartData.scope2.push(group.data[1]);
      transformedChartData.scope3.push(group.data[2]);
    })
 

  const chartOptions = useChartOptions(categories);

  const chartData = displayPer === 'alltime'
  ? [
      { name: 'Scope 1', data: processedData.scope1Arr },
      { name: 'Scope 2', data: processedData.scope2Arr },
      { name: 'Scope 3', data: processedData.scope3Arr },
    ] 
  : 
  [    { name: 'Scope 1', data: transformedChartData.scope1 },
      { name: 'Scope 2', data: transformedChartData.scope2 },
      { name: 'Scope 3', data: transformedChartData.scope3 },
  ] 

  


  console.log("chartData===>", categories,chartData,transformedChartData);




  function useChartOptions(): ApexOptions {
    const theme = useTheme();
  
    return {
      chart: { background: 'transparent', stacked: true, toolbar: { show: false } },
      colors: ['#73E2A3', '#FF8F6B', '#FFD66B'],
      dataLabels: { enabled: false },
      fill: { opacity: 1, type: 'solid' },
      grid: {
        borderColor: theme.palette.divider,
        strokeDashArray: 2,
        xaxis: { lines: { show: false } },
        yaxis: { lines: { show: true } },
      },
      legend: {
        show: true,
        labels: {
          colors: theme.palette.text.primary,
        },
        position: 'bottom',
        markers: {
          width: 12,
          height: 12,
          radius: 4,
        },
        offsetY: 10,
      },
      plotOptions: { bar: { columnWidth: '20px', borderRadius: 6 } },
      stroke: { colors: ['transparent'], show: true, width: 2 },
      theme: { mode: theme.palette.mode },
      xaxis: {
        axisBorder: { color: theme.palette.divider, show: true },
        axisTicks: { color: theme.palette.divider, show: true },
        categories: categories,
        labels: { offsetY: 5, style: { colors: theme.palette.text.secondary } },
      },
      yaxis: {
        title: {
          text: 'Equivalent CO2 (t)',
          style: { color: theme.palette.text.secondary },
        },
        labels: {
          formatter: (value) => (value > 0 ? `${value}t` : `${value}`),
          style: { colors: theme.palette.text.secondary },
        },
      },
    };
  }
  return (

    <Card sx={sx}>
      <CardHeader
        action={
          <Box display="flex" alignItems="flex-end">
            <Typography
              fontWeight={700}
              sx={{
                color: palette.common.black,
                fontSize: '16px',
              }}
            >
             scoepees
            </Typography>
            <Typography variant="caption">tCO2e</Typography>
          </Box>
        }
        title={
          <Typography variant="h6" component="div">
            Carbon Emissions by Scope
          </Typography>
        }
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      />
      <CardContent>
        {chartData.length > 0 ? (
          <Chart height={350} options={chartOptions} series={chartData} type="bar" width="100%" />
        ) : (
          <Typography variant="body2" color="text.secondary" align="center">
            No data to display
          </Typography>
        )}
      </CardContent>
      <Divider />
    </Card>
  );
}