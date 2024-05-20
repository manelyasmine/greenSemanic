"use client";

import React,{useState} from 'react'; 
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography'; 
import Box from '@mui/material/Box';
import { config } from '@/config';
import { TabsWrappedLabel } from '@/components/dashboard/settings/TabsWrappedLabel'; 

import Tabs from '@mui/material/Tabs';

import Tab from '@mui/material/Tab';
 
export default function Page(): React.JSX.Element {
  const [value, setValue] = useState('one');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h3">Settings</Typography>
        <Typography variant="body1">Welcome to the Carbon Footprint Settings page! Here, you can customize your carbon tracking experience to suit your needs and preferences.</Typography>
      </div>
      <TabsWrappedLabel  />

    {/*   <Notifications />
      <UpdatePasswordForm /> */}
    </Stack>
  );
}
