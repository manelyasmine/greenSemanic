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
import FilterColumns from '../../commun/Filters/FilterColumns';
 
import DropdownTableCell from '@/components/DropDown/DropdownTableCell';
import { useSelection } from '@/hooks/use-selection';
import { Pagination } from '@mui/material';
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

interface CustomersTableProps {
  count?: number;
  page?: number;
  rows?: Customer[];
  rowsPerPage?: number;
}

export function MyTasksTable({
  count = 0,
  rows = [],
   
  rowsPerPage = 0,
}: CustomersTableProps): React.JSX.Element {
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
              <TableCell>Progress</TableCell>
              <TableCell>status</TableCell>
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
                    <Typography variant="subtitle2">{row.taskName}</Typography>
                    
                  </TableCell>

                  <TableCell>{dayjs(row.dueDate).format('MMM D, YYYY')}</TableCell>
                  <TableCell>20%</TableCell>
                  <TableCell>{row.status}</TableCell>
                  
                  <DropdownTableCell task={row}/>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
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
    </Card>
  );
}
