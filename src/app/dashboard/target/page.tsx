'use client';

import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';

import { Target } from '@/types/target';
import { setTargets } from '@/lib/store/reducer/useTarget';
import { targetApis } from '@/lib/target/targetApis';
import CustomTabs from '@/components/commun/Tabs/taskTabs';
import { ActionsTable } from '@/components/dashboard/targets/actions-table';
import { TargetsTable } from '@/components/dashboard/targets/targets-table';

import BottomDrawer from './BottomDrawer';

 

export default function Page(): React.JSX.Element {
  const [selectedTab, setSelectedTab] = React.useState<string>('Targets');
  // Function to handle tab changes
  const handleTabChange = (event: React.ChangeEvent<any>, newValue: string) => {
    setSelectedTab(newValue);
  };
  const [target, setTarget] = React.useState<Target>({});
  const dispatch = useDispatch();
  const { targets } = useSelector((state: any) => state.target);
  const page = 0;
  const rowsPerPage = 3;
  const [isNewTask, setIsNewTask] = useState(false);
  const [paginatedTarget, setPaginatedTarget] = useState<Target[]>([]);
 
  const handleNewTask = () => {
    setIsNewTask(!isNewTask);
  };
  const handleClose = () => {
    setIsNewTask(false);
  };

  const getTargets = React.useCallback(async (): Promise<void> => {
    const { error, res } = await targetApis.getTargets();
    if (error) {
      return;
    }
    dispatch(setTargets(res));
    setPaginatedTarget(applyPagination(res, page, rowsPerPage));
    setTarget(res);
  }, [page, rowsPerPage]);

  useEffect(() => {
    getTargets();
  }, [getTargets]);

  //getTargets()
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h3">Targets</Typography>
          <Typography
            variant="body2"
            sx={{
              alignSelf: 'stretch',
              color: 'var(--Grey-grey-400, #88909F)',
              fontFeatureSettings: '"cv04" on, "cv03" on, "cv02" on, "cv11" on, "clig" off, "liga" off',
            }}
          >
            Below is a list of tasks in your carbon emission. Please review and ensure alignment with your
            sustainability objectives.
           
          </Typography>

          <CustomTabs value={selectedTab} screen="target" handleChange={handleTabChange} />
        </Stack>
        <div>
          <Button
            startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
            variant="contained"
            style={{
              borderRadius: '0.375rem',
              background: 'var(--Green-green-500, #16B364)',
            }}
            onClick={handleNewTask}
          >
            Add Taregt
          </Button>
        </div>
      </Stack>

      <BottomDrawer open={isNewTask} onClose={handleClose} onCreateTask={() => console.log('ergb')} />

      {selectedTab === 'Targets' && (
        <TargetsTable count={paginatedTarget.length} page={page} rows={targets} rowsPerPage={rowsPerPage} />
      )}
      {selectedTab !== 'Targets' && targets.length > 0 && (
        <ActionsTable
          count={paginatedTarget.length}
          page={page}
          rows={targets}
          rowsPerPage={rowsPerPage}
        />
      )}
    </Stack>
  );
}

// function applyPagination(rows: Customer[], page: number, rowsPerPage: number): Customer[] {
//   return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
// }
function applyPagination(rows: any[], page: number, rowsPerPage: number): Target[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
