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
   
  const rowsPerPage = 3;
  const [isNewTask, setIsNewTask] = useState(false);
  const [paginatedTarget, setPaginatedTarget] = useState<Target[]>([]);
  const [searchInput,setSearchInput]=useState('')
  const [searchDate,setSearchDate]=useState('')
  const [rows, setRows] = useState([{}]);
  const [page, setPage] = useState(1); // Start on page 1

  const [pages,setPages]=useState(1);
  const [totalRows,setTotalRows]=useState(1);
const [searchBaseYear,setSearchBaseYear]=useState('');

const [searchTargetYear,setSearchTargetYear]=useState('');
  const handleChangePage = ( newPage ) => {
    console.log("handle change page",page)
    setPage(newPage); 
  };
  const handleNewTask = () => {
    setIsNewTask(!isNewTask);
  };
  const handleClose = () => {
    setIsNewTask(false);
  };

  const getTargets = React.useCallback(async (): Promise<void> => {
    const filters = {
      /*  dueDate:searchDate, */
      start:searchBaseYear,
      end:searchTargetYear,
       page,  
       limit: rowsPerPage,  
       search:searchInput,
     };
     console.log("filllll",filters)
    const { error, res,total,totalPages  } = await targetApis.getTargets(filters);
    if (error) {
      return;
    }
    console.log("res",res,total,totalPages)
    dispatch(setTargets(res)); 
    setTarget(res);
    setRows(res);  
    setTotalRows(total);
    setPages(totalPages);
    
  }, [dispatch, page, rowsPerPage,pages,totalRows, searchInput,searchBaseYear],searchTargetYear);

  useEffect(() => {
    getTargets();
  }, [getTargets]);

  const onFilterByDate = (selectedDate) => {
    console.log("target table on filter date ==>",selectedDate[0],selectedDate[1])
    setSearchBaseYear(selectedDate[0])
    setSearchTargetYear(selectedDate[1]);
   /*  const selectedDateObj = new Date(selectedDate);
    const selectedDateObjFormat=dayjs(selectedDate).format('YYYY-MM-D');
    console.log("onfilterbydate====>",selectedDateObjFormat)
    setSearchDate(selectedDateObjFormat);
       */
        
      
    };
    const onFilterBySearch=(search)=>{ 
      console.log("onFilterBySearch=>",search)
      setSearchInput(search)
    }

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
        <TargetsTable   page={page} rows={rows} rowsPerPage={rowsPerPage} 
        
      onFilterBySearch={onFilterBySearch} onFilterByDate={onFilterByDate} pages={pages} handleChangePage={handleChangePage}
        />

 






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