'use client';

import React ,{useState} from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import dayjs from 'dayjs'; 
 
import CustomTabs from '@/components/commun/Tabs/taskTabs'; 
 
import BottomDrawer from './BottomDrawer';  
 
import dayjs from 'dayjs';
 
import BottomDrawer from './BottomDrawer'; 
import CustomTabs from '@/components/commun/Tabs/taskTabs'; 
 
import { CustomersTable } from '@/components/dashboard/customer/customers-table';
import { MyTasksTable } from '@/components/dashboard/customer/myTasks-table';
 
const customers = [
  {
    id: 'USR-010',
    name: 'Alcides Antonio',
    avatar: '/assets/avatar-10.png',
    email: 'alcides.antonio@devias.io',
    phone: '908-691-3242',
    address: { city: 'Madrid', country: 'Spain', state: 'Comunidad de Madrid', street: '4158 Hedge Street' },
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-009',
    name: 'Marcus Finn',
    avatar: '/assets/avatar-9.png',
    email: 'marcus.finn@devias.io',
    phone: '415-907-2647',
    address: { city: 'Carson City', country: 'USA', state: 'Nevada', street: '2188 Armbrester Drive' },
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-008',
    name: 'Jie Yan',
    avatar: '/assets/avatar-8.png',
    email: 'jie.yan.song@devias.io',
    phone: '770-635-2682',
    address: { city: 'North Canton', country: 'USA', state: 'Ohio', street: '4894 Lakeland Park Drive' },
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-007',
    name: 'Nasimiyu Danai',
    avatar: '/assets/avatar-7.png',
    email: 'nasimiyu.danai@devias.io',
    phone: '801-301-7894',
    address: { city: 'Salt Lake City', country: 'USA', state: 'Utah', street: '368 Lamberts Branch Road' },
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-006',
    name: 'Iulia Albu',
    avatar: '/assets/avatar-6.png',
    email: 'iulia.albu@devias.io',
    phone: '313-812-8947',
    address: { city: 'Murray', country: 'USA', state: 'Utah', street: '3934 Wildrose Lane' },
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-005',
    name: 'Fran Perez',
    avatar: '/assets/avatar-5.png',
    email: 'fran.perez@devias.io',
    phone: '712-351-5711',
    address: { city: 'Atlanta', country: 'USA', state: 'Georgia', street: '1865 Pleasant Hill Road' },
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },

  {
    id: 'USR-004',
    name: 'Penjani Inyene',
    avatar: '/assets/avatar-4.png',
    email: 'penjani.inyene@devias.io',
    phone: '858-602-3409',
    address: { city: 'Berkeley', country: 'USA', state: 'California', street: '317 Angus Road' },
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-003',
    name: 'Carson Darrin',
    avatar: '/assets/avatar-3.png',
    email: 'carson.darrin@devias.io',
    phone: '304-428-3097',
    address: { city: 'Cleveland', country: 'USA', state: 'Ohio', street: '2849 Fulton Street' },
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-002',
    name: 'Siegbert Gottfried',
    avatar: '/assets/avatar-2.png',
    email: 'siegbert.gottfried@devias.io',
    phone: '702-661-1654',
    address: { city: 'Los Angeles', country: 'USA', state: 'California', street: '1798 Hickory Ridge Drive' },
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-001',
    name: 'Miron Vitold',
    avatar: '/assets/avatar-1.png',
    email: 'miron.vitold@devias.io',
    phone: '972-333-4106',
    address: { city: 'San Diego', country: 'USA', state: 'California', street: '75247' },
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
] satisfies Customer[];

export default function Page(): React.JSX.Element {
  const [selectedTab, setSelectedTab] = React.useState<string>('All Tasks');
  // Function to handle tab changes
  const handleTabChange = (event: React.ChangeEvent<any>, newValue: string) => {
    setSelectedTab(newValue);
  };
  const page = 0;
  const rowsPerPage = 5;
  const [isNewTask,setIsNewTask]=useState(false);
  const paginatedCustomers = applyPagination(customers, page, rowsPerPage);
const handleNewTask=()=>{ 
  setIsNewTask(!isNewTask);
  console.log("is new task ?",isNewTask)
}
const handleClose=()=>{setIsNewTask(false)}
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h3">All Tasks</Typography>
          <Typography
            variant="body2"
            sx={{
              alignSelf: 'stretch',
              color: 'var(--Grey-grey-400, #88909F)',
              fontFeatureSettings: '"cv04" on, "cv03" on, "cv02" on, "cv11" on, "clig" off, "liga" off',
            }}
          >
            Below is a list of tasks in your carbon emission. Please review and ensure alignment with your
            sustainability objectives
          </Typography>

          <CustomTabs value={selectedTab} handleChange={handleTabChange} />
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
            New Task
          </Button>
        </div>
         
      </Stack>
 
           
      
              <BottomDrawer open={isNewTask} onClose={handleClose}/>
            
 
    
  <BottomDrawer open={isNewTask} onClose={handleClose}/>
            
 
      {selectedTab === 'All Tasks' && (
        <CustomersTable
          count={paginatedCustomers.length}
          page={page}
          rows={paginatedCustomers}
          rowsPerPage={rowsPerPage}
        />
      )}
      {selectedTab !== 'All Tasks' && (
        <MyTasksTable
          count={paginatedCustomers.length}
          page={page}
          rows={paginatedCustomers}
          rowsPerPage={rowsPerPage}
        />
      )}

      {/* <CustomersTable
        count={paginatedCustomers.length}
        page={page}
        rows={paginatedCustomers}
        rowsPerPage={rowsPerPage}
      /> */}
    </Stack>
  );
}

function applyPagination(rows: Customer[], page: number, rowsPerPage: number): Customer[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
