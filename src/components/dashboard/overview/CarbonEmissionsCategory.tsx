import React from 'react';
import { CardContent, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Chart from 'react-apexcharts';

import ScopesTabs from '@/components/commun/Tabs/scopesTabs';
import { palette } from '@/styles/theme/colors';

export interface CarbonEmissionsCategoryProps {
  sx?: any; // Define any custom styling props here
  showScopesTabs?: boolean;
  value?:string;
  data?:[];
  handleChange: (event: React.ChangeEvent<any>, value: string) => void;
 
}

export function CarbonEmissionsCategory({ sx, showScopesTabs,value,handleChange , data = []}: CarbonEmissionsCategoryProps): React.JSX.Element {
  // const data = [
  //   { label: 'Transportation', value: 30 },
  //   { label: 'Energy', value: 10 },
  //   { label: 'Waste (food)', value: 50 },
  //   { label: 'Manufacturing', value: 20 },
  //   { label: 'Building', value: 10 },
  // ];
  //   const maxValue = Math.max(...data.map((item) => item.value));
  const options = {
    chart: {
      height: 200,
    },
    plotOptions: {
      bar: {
        distributed: true,
        horizontal: true,
        borderRadius: 2,
        columnWidth: 10,
        barHeight: 16,
      },
    },
    dataLabels: {
      enabled: false,
      formatter: function (val: any) {
        return val.toFixed(2); // Format data label value
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ['#3ccb7f'],
      },
    },
    grid: {
   //   position: 'back', // Position of grid behind bars
      xaxis: {
        lines: {
          show: true, // Display vertical grid lines
        },
      },
      yaxis: {
        lines: {
          show: false, // Display vertical grid lines
        },
      },// Set to false to hide the grid lines
    },
    xaxis: {
      categories: data.map((item) => item.label),
      labels: {
        style: {
          fontSize: '12px',
        },
        formatter: (value: any) => (value > 0 ? `${value}t` : `${value}`),
      },
    },
    legend: {
      show: false, // Hide legend
    },
    yaxis: {
      tickAmount: 3,
      title: {
        text: '',
      },
    },
    fill: {
      colors: ['#3ccb7f'],
    },
  };

  const series = [
    {
      name: 'Value',
      data: data.map((item) => item.value),
    },
  ];

  return (
    <Card sx={{ height: 200, ...sx }}>
      <CardHeader title="Carbon Emissions by Category"
      action={showScopesTabs && <ScopesTabs value={value} handleChange={handleChange} />}
    
      />
      <Typography variant="body2" sx={{ marginX: 3 }} color="text.secondary">
        Activities
      </Typography>
      <CardContent>
        <Chart type="bar" series={series} options={options} height={242} />
      </CardContent>
    </Card>
  );
}
