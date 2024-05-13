import React from 'react';
import { CardContent, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Chart from 'react-apexcharts';

import { palette } from '@/styles/theme/colors';

export interface FootprintsProps {
  sx?: any; // Define any custom styling props here
}

export function Footprints({ sx }: FootprintsProps): React.JSX.Element {
  const data = [
    { label: 'Electricity', value: 30 },
    { label: 'Heating', value: 40 },
    { label: 'Waste', value: 20 },
    { label: 'AC', value: 10 },
  ];
  const maxValue = Math.max(...data.map((item) => item.value));
  const options = {
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        distributed: true,
        horizontal: false,
        borderRadius: 6,
        columnWidth: '36%',
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
    xaxis: {
      categories: data.map((item) => item.label),
      labels: {
        style: {
          fontSize: '12px',
        },
      },
    },
    legend: {
      show: false, // Hide legend
    },
    yaxis: {
      title: {
        text: '',
      },
    },
    fill: {
      colors: data.map((item) => (item.value === maxValue ? '#3ccb7f' : '#d3f8df')),
    },
    // tooltip: {
    //   enabled: true,
    //   y: {
    //     formatter: function (val: any) {
    //       return val.toFixed(2); // Format tooltip value
    //     },
    //   },
    // },
  };

  const series = [
    {
      name: 'Value',
      data: data.map((item) => item.value),
    },
  ];

  return (
    <Card sx={sx}>
      <CardHeader title="Footprints" />
      <Typography variant="body2" sx={{marginX:3}} color="text.secondary">
          Activities
        </Typography>
      <CardContent>
        <Chart type="bar" series={series} options={options} height={350} />
      </CardContent>
    </Card>
  );
}
