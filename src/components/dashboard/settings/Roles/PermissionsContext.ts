
import { createContext } from 'react';

interface Permissions {
  userManagementRead: boolean;
  userManagementWrite: boolean;
  userManagementCreate: boolean;
  emissionTrackingRead:boolean,
  emissionTrackingWrite:boolean,
  emissionTrackingCreate:boolean,
  TasksRead:boolean,
  TasksWrite:boolean,
  TasksCreate:boolean,
  TargetsRead:boolean,
  TargetsWrite:boolean,
  TargetsCreate:boolean,
  ReportsRead:boolean,
  ReportsWrite:boolean,
  ReportsCreate:boolean,
}
const defaultPermissions: Permissions = {
  userManagementRead: false,
  userManagementWrite: false,
  userManagementCreate: false,
  emissionTrackingRead:false,
  emissionTrackingWrite:false,
  emissionTrackingCreate:false,
  TasksRead:false,
  TasksWrite:false,
  TasksCreate:false,
  TargetsRead:false,
  TargetsWrite:false,
  TargetsCreate:false,
  ReportsRead:false,
  ReportsWrite:false,
  ReportsCreate:false,
};

const PermissionsContext = createContext<Permissions>(defaultPermissions);

export default PermissionsContext;