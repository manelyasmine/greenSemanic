import React from 'react';
import { DashboardIcon, DataIcon, EmissionTrackingIcon, ReportIcon, TargetIcon, TasksIcon } from '@/icons';

import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems: NavItemConfig[] = [
  {
    key: 'Dashboard',
    title: 'Dashboard',
    href: paths.dashboard.overview,
    icon: DashboardIcon,
  },
  {
    key: 'Tasks',
    title: 'Tasks',
    href: paths.dashboard.customers,
    icon: TasksIcon,
  },
  {
    key: 'Emission Tracking',
    title: 'Emission Tracking',
    href: paths.dashboard.integrations,
    icon: EmissionTrackingIcon,
  },
  {
    key: 'Data',
    title: 'Data',
    href: paths.dashboard.settings,
    icon: DataIcon,
  },
  {
    key: 'Targets',
    title: 'Targets',
    href: paths.dashboard.account,
    icon: TargetIcon,
  },
  {
    key: 'Reports',
    title: 'Reports',
    href: paths.errors.notFound,
    icon: ReportIcon,
  },
];
