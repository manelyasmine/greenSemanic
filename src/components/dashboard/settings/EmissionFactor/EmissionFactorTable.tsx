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
import usePagination from '@/hooks/use-pagination';
interface CustomersTableProps {
   page?: number;
  rows?: object[];
  rowsPerPage?: number;
  onFilterBySearch:any;
  
  pages:number,
  handleChangePage:any;
}

export function EmissionFactorTable({   rows = [], rowsPerPage = 5,  onFilterBySearch,
 
  pages,
  handleChangePage, }: CustomersTableProps): React.JSX.Element {
  const [page, setPage] = useState(1); // Start on page 1
  console.log("rows from table",rows)
  const paginatedRows = usePagination({ rows, page, pageSize: rowsPerPage });
  
  
  const updateChangePage = (event: any, newPage: any) => {
    console.log("update change data",newPage)
    setPage(newPage);
    handleChangePage(newPage);
  };
  const updateSearch=(search:string)=>{
    console.log("search",search)
    onFilterBySearch(search);
  }
  return (
    <Card>
       <Header   onFilterBySearch={updateSearch}/>
     <Divider />
    <Box sx={{ overflowX: 'auto' }}>
      <Table sx={{ minWidth: '800px' }}>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              {/* <Checkbox
                checked={selectedAll}
                indeterminate={selectedSome}
                onChange={(event) => {
                  if (event.target.checked) {
                    selectAll();
                  } else {
                    deselectAll();
                  }
                }}
              /> */}
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
        {rows &&
              rows.map((row) => {
          //  const isSelected = selected?.has(row.id);

            return (
              <TableRow hover key={row.id} /* selected={isSelected} */>
                <TableCell padding="checkbox">
                {/*   <Checkbox
                    checked={isSelected}
                    onChange={(event) => {
                      if (event.target.checked) {
                        selectOne(row.id);
                      } else {
                        deselectOne(row.id);
                      }
                    }}
                  /> */}
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
          paginatioType="gray"
          // color='gray'
          count={pages} // Total number of pages
          page={page}
          onChange={updateChangePage}
          size="small"
          showFirstButton
          showLastButton
          shape="rounded"
        />
    </Box>
  </Card>
  );
}
