'use client';

import * as React from 'react';
import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import type { Icon } from '@phosphor-icons/react/dist/lib/types';
import { Desktop as DesktopIcon } from '@phosphor-icons/react/dist/ssr/Desktop';
import { DeviceTablet as DeviceTabletIcon } from '@phosphor-icons/react/dist/ssr/DeviceTablet';
import { Phone as PhoneIcon } from '@phosphor-icons/react/dist/ssr/Phone';
import type { ApexOptions } from 'apexcharts';

import { Button } from '@/components/commun/Button';
import { Chart } from '@/components/core/chart';
import { palette } from '@/styles/theme/colors';

import TaskItem from './TaskItem';

const iconMapping = { Desktop: DesktopIcon, Tablet: DeviceTabletIcon, Phone: PhoneIcon } as Record<string, Icon>;

export interface TrafficProps {
  sx?: SxProps;
}

export function Tasks({ sx }: TrafficProps): React.JSX.Element {
  return (
    <Card sx={sx}>
      <CardHeader
        action={
          <Box display="flex" alignItems="flex-end">
            <Button btnType="link" sx={{ color: palette.primary[500], fontWeight: 700 }}>
              Add Task
            </Button>
          </Box>
        }
        title={
          <Typography variant="h6" component="div" fontWeight={700}>
            Tasks
          </Typography>
        }
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      />
      <CardContent>
        <Stack spacing={2}>
          <TaskItem dueDate="18/02/2024" target="Reports - tagert01 task" />
          <TaskItem dueDate="18/02/2024" target="Reports - tagert01 task" />
          <TaskItem dueDate="18/02/2024" target="Reports - tagert01 task" />
          <TaskItem dueDate="18/02/2024" target="Reports - tagert01 task" />
          <TaskItem dueDate="18/02/2024" target="Reports - tagert01 task" />
        </Stack>
      </CardContent>
    </Card>
  );
}

function useChartOptions(labels: string[]): ApexOptions {
  const theme = useTheme();

  return {
    chart: { background: 'transparent' },
    colors: [theme.palette.primary.main, theme.palette.success.main, theme.palette.warning.main],
    dataLabels: { enabled: false },
    labels,
    legend: { show: false },
    plotOptions: { pie: { expandOnClick: false } },
    states: { active: { filter: { type: 'none' } }, hover: { filter: { type: 'none' } } },
    stroke: { width: 0 },
    theme: { mode: theme.palette.mode },
    tooltip: { fillSeriesColor: false },
  };
}
