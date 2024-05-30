import React from 'react'; // Use specific imports for better readability
import { PieChart } from '@mui/x-charts/PieChart';
import { CardContent, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
  
const originalData = [
  { label: 'Scope 1', value: "38.6%",color:"red" },
  { label: 'Scope 2', value: "38.5%" ,color:"#FF8F6B"},
  { label: 'Scope 3', value: "22.9%",color:"#FFD66B" },
];

const data = originalData.map((item) => ({
  label: item.label,
  value: parseFloat(item.value.slice(0, -1)),
}));
const colors = ['#73E2A3', '#FF8F6B', '#FFD66B'];


export default function Scopes() {
  // Define colors for each slice

  return (
   

    <Card sx={{ height: '100%' }}>
      <CardHeader title="Scopes" />
      <CardContent>
      <PieChart
    colors={colors}
      series={[
        {
          data,
          
          paddingAngle: 10, // Optional: Add separation between slices
          innerRadius: 70, // Optional: Set inner radius for a donut effect
          outerRadius: 50, // Optional: Set outer radius
          cornerRadius:20,
        },
        
      ]}
      margin={{ left: 10 }} // Optional: Set margin around the chart
      width={300}
      height={300}
      
    />
         </CardContent>
    </Card>
  );
}

