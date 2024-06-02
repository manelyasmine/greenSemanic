'use client';

import * as React from 'react';
import { Button, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

import { palette } from '@/styles/theme/colors';
import { MuiButton } from '@/styles/theme/components/button';

import { AccountDetailsForm } from './account-details-form';
import { PasswordChangesForm } from './passord-change-form';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export function TabsWrappedLabel() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Stack spacing={3}>
      <Box sx={{ width: '100%' }}>
        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{
              // Style the entire Tabs component
              display: 'flex',
              padding: '0rem 0.25rem 0.625rem 0.25rem',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '0.5rem',

              '& .MuiTab-root': {
                color: palette.gray[400],
                '&:hover': {
                  // Style on hover
                  background: palette.common.white,
                  color: 'var(--Green-green-500, #16B364)',
                },
              },
              '& .MuiTabs-indicator': {
                // Style the indicator
                backgroundColor: 'var(--Green-green-500, #16B364)',
                color: 'var(--Green-green-500, #16B364)',
                borderBottom: '2px solid var(--Green-green-500, #16B364)',
              },
            }}
          >
            <Tab
              label="My details"
              {...a11yProps(0)}
              sx={{
                color: palette.gray[400], // Default color
                '&.Mui-selected': {
                  // Style for selected tab
                  color: 'var(--Green-green-500, #16B364)',
                },
              }}
            />

            <Tab
              label="Account"
              {...a11yProps(1)}
              sx={{
                color: palette.gray[400], // Default color
                '&.Mui-selected': {
                  // Style for selected tab
                  color: 'var(--Green-green-500, #16B364)',
                },
              }}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <AccountDetailsForm />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <PasswordChangesForm />
        </CustomTabPanel>
      </Box>
    </Stack>
  );
}
