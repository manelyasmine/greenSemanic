'use client';

import React,{useState} from 'react'; 
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider'; 
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead'; 
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { useSelection } from '@/hooks/use-selection'; 
import Header from './Header';
import { Pagination } from '@mui/material';
import { Emission } from '@/types/emission';

function noop(): void {
  // do nothing
}

 

interface CustomersTableProps {
  count?: number;
  page?: number;
  rows?: Emission[];
  rowsPerPage?: number;
}

export function EmissionFactorTable({ count = 100, rows = [], rowsPerPage = 5 }: CustomersTableProps): React.JSX.Element {
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
       <Header/>
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
            <TableCell>Name</TableCell> 
              <TableCell>Category</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell>Source</TableCell>
              <TableCell>  Year </TableCell>
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
                   
                    <Typography variant="bodyB3">{row.Name}</Typography>
                   
                </TableCell>
                <TableCell>
              
              <Typography variant="bodyP3">{row.Category}</Typography>
                </TableCell>

                <TableCell>
              
              <Typography variant="bodyP3">{row.Unit}</Typography>
                </TableCell>

                <TableCell>
              
              <Typography variant="bodyP3">{row.Source}</Typography>
                </TableCell>
                <TableCell>{dayjs(row.Year).format('MMM D, YYYY')}</TableCell>
               
                 
                
                
                 
               
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
