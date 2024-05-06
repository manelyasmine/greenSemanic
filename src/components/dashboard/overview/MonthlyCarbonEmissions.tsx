import React from 'react';
import { CardContent } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Chart from 'react-apexcharts';

export interface MonthlyCarbonEmissionsProps {
  sx?: any; // Define any custom styling props here
}

export function MonthlyCarbonEmissions({ sx }: MonthlyCarbonEmissionsProps): React.JSX.Element {
  const guestSeries = [
    {
      name: 'Carbon Emissions',
      data: [50, 60, 70, 80, 19, 120, 15, 40, 55, 90, 100, 110, 26], // replace "," with a valid number (e.g., 55)
    },
  ];
  const guestOption = {
    chart: {
      id: 'guest',
      group: 'social',
      animations: {
        speed: 100,
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    stroke: {
      curve: 'smooth', // Choose "smooth", "straight", "stepline", or "monotoneCubic"
    },
  };

  return (
    <Card sx={sx}>
      <CardHeader title="Monthly Carbon Emissions" />
      <CardContent>
        <Chart type="area" series={guestSeries} options={guestOption} height={350} />
      </CardContent>
    </Card>
  );
}
