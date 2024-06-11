'use client';

import React,{useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead'; 
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { useSelection } from '@/hooks/use-selection'; 
import DropdownTableCell from '@/components/DropDown/DropdownTableCell';
import FilterColumns from '../../commun/Filters/FilterColumns';
import { Pagination } from '@mui/material';
import { Target } from '@/types/target';
function noop(): void {
  // do nothing
}

export interface Customer {
  id?:string;
  _id?:string;
  taskName?: string;
  targetName?: string;
  dueDate?:string;
  usersIds?: string;
  status?:string;
  createdBy?:string;
  progress?:string;
  createdAt?: string;
  timezone?: string; 
}

interface TasksTableProps {
  count?: number;
  page?: number;
  rows?: Customer[];
  rowsPerPage?: number;
}

export function TasksTable({ count = 100, rows = [], rowsPerPage = 5 }: TasksTableProps): React.JSX.Element {
  const rowIds = React.useMemo(() => {
    return rows.map((customer) => customer.id);
  }, [rows]);

  const { selectAll, deselectAll, selectOne, deselectOne, selected } = useSelection(rowIds);

  const selectedSome = (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
  const selectedAll = rows.length > 0 && selected?.size === rows.length;

  const [page, setPage] = useState(1); // Start on page 1
  const [totalPages, setTotalPages] = useState(10); // Replace with actual total pages

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  return (
    <Card>
      <FilterColumns />
      <Divider />
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={(event) => {
                    if (event.target.checked) {
                      selectAll();
                    } else {
                      deselectAll();
                    }
                  }}
                />
              </TableCell>
              <TableCell>Tasks</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Assigned Users</TableCell>
              <TableCell>Progress</TableCell>
              <TableCell>Target Name</TableCell>
              <TableCell>Base To Target Year </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              const isSelected = selected?.has(row.id);

              return (
                <TableRow hover key={row.id} selected={isSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={(event) => {
                        if (event.target.checked) {
                          selectOne(row.id);
                        } else {
                          deselectOne(row.id);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                     
                      <Typography variant="bodyB3">{row.taskName}</Typography>
                     
                  </TableCell>

                  <TableCell>{dayjs(row.dueDate).format('MMM D, YYYY')}</TableCell>
                 
                  <TableCell> 
                    {Array.isArray(row.usersIds) ? (
                      row.usersIds.map((user, index) => (
                        <span key={index}>{user.username}</span>
                      ))
                    ) : (
                      <span> </span>
                    )}
                  </TableCell>

                        <TableCell>70%</TableCell>
                  <TableCell>
                
                  <Typography variant="bodyP3">{row.targetName}</Typography>
                    </TableCell>
                 
                  <TableCell>2020-2023 </TableCell>
                 
                  <Box  style={{ display: 'flex',
                   justifyContent: 'center',alignItems:"center",marginTop:"2rem" }}>
                  <DropdownTableCell task={row}/>
                  
                  </Box>
                 
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <Box style={{ display: 'flex', justifyContent: 'center' }}>
      <Pagination
        count={count} // Total number of pages
        page={4} // Current page
        onChange={handleChangePage}  
        color="primary" // Set color
        size="medium"   
        showFirstButton  
        showLastButton 
        shape="rounded"
         
      />
      </Box>
    </Card>
  );
}
