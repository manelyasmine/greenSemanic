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
import { Task } from '@/types/task';
interface CustomersTableProps {
  count?: number;
  page?: number;
  rows?: Task[];
  rowsPerPage?: number;
 
  onFilterByDate: (date: any) => void;
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
  const [filteredData, setFilteredData] = useState(rows);  


  const onFilterByDate = (selectedDate) => { 
    console.log("selectedDate",new Date(selectedDate.$d), new Date(rows[0].dueDate))
       const filteredByDate = rows.filter(
      (item) => new Date(item.dueDate) === new Date(selectedDate.$d)
    );
    setFilteredData(filteredByDate);   
    console.log("filter data==================>",filteredData)
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  return (
    <Card>
     {/*  <FilterColumns onFilterByDate={onFilterByDate}/> */}
     <FilterColumns onFilterByDate={onFilterByDate} />

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
