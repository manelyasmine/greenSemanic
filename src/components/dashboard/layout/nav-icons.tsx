import { DashboardIcon, DataIcon, EmissionTrackingIcon, ReportIcon, TargetIcon, TasksIcon } from '@/icons';
import type { Icon } from '@phosphor-icons/react/dist/lib/types';
import { ChartPie as ChartPieIcon } from '@phosphor-icons/react/dist/ssr/ChartPie';
import { GearSix as GearSixIcon } from '@phosphor-icons/react/dist/ssr/GearSix';
import { PlugsConnected as PlugsConnectedIcon } from '@phosphor-icons/react/dist/ssr/PlugsConnected';
import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User';
import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';
import { XSquare } from '@phosphor-icons/react/dist/ssr/XSquare';

export const navIcons = {
  // 'chart-pie': ChartPieIcon,
  // 'gear-six': GearSixIcon,
  // 'plugs-connected': PlugsConnectedIcon,
  // 'x-square': XSquare,
  // user: UserIcon,
  // users: UsersIcon,
  dashboardIcon: DashboardIcon,
  dataIcon: DataIcon,
  emissionTrackingIcon: EmissionTrackingIcon,
  reportIcon: ReportIcon,
  targetIcon: TargetIcon,
  tasksIcon: TasksIcon,
} as Record<string, any>;
