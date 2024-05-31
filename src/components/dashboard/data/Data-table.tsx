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
import FilterColumns from '../../commun/Filters/FilterColumns';
import { Pagination } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import { makeStyles } from '@mui/styles';
import { palette } from '@/styles/theme/colors';

import {ModifyIcon,DeleteIcon} from "@/icons";

const useStyles = makeStyles((theme) => ({
    cardHeader: {
      backgroundColor: palette.common.white,
       
       
      
    },
     
  }));

export interface Reports {
  id: string;
  Date: Date;
  Location: string; 
  Category: string;
  Qunatity:string;
  EmissionFactor: string;
  SourceType:string;
  IntegrationSource:string;
}

interface DataTableProps {
  count?: number;
  page?: number;
  rows?: Reports[];
  rowsPerPage?: number;
}

export function DataTable({ count = 100, rows = [], rowsPerPage = 5 }: DataTableProps): React.JSX.Element {
  const rowIds = React.useMemo(() => {
    return rows.map((Reports) => Reports.id);
  }, [rows]);
  const classes = useStyles();

  const { selectAll, deselectAll, selectOne, deselectOne, selected } = useSelection(rowIds);

  const selectedSome = (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
  const selectedAll = rows.length > 0 && selected?.size === rows.length;

  const [page, setPage] = useState(1); // Start on page 1
  const [totalPages, setTotalPages] = useState(10); // Replace with actual total pages

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  return (
    <Card   >
      
      <Divider />
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
   


<TableHead  >
        <TableRow  >
          <TableCell colSpan={12}   >
            <Card variant="outlined" sx={{border:"0"  }}>
              <CardHeader   title={<FilterColumns  /> }  />
          
      
            </Card>
          </TableCell>
        </TableRow>
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
              <TableCell>Date</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Qunatity</TableCell>
              <TableCell>Emission Factor</TableCell>
              <TableCell>Source Type</TableCell>
              <TableCell>Integration Source</TableCell>
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
                   
                      <Typography variant="bodyB3">{dayjs(row.Date).format('MMM D, YYYY')}</Typography>
                   
                  </TableCell>
                  <TableCell>
                  <Typography variant="bodyP3">{row.Location}</Typography>
                    </TableCell>
                 
                  <TableCell>{row.Category}</TableCell>
                 {/*  <TableCell>{dayjs(row.createdAt).format('MMM D, YYYY')}</TableCell>
                 */}   
                  <TableCell>{row.Qunatity}</TableCell>
                  <TableCell>{row.EmissionFactor}</TableCell>

                  <TableCell>{row.SourceType}</TableCell>
                  <TableCell>{row.IntegrationSource}</TableCell>   
                  <TableCell>
                    <Stack  sx={{display: 'flex',alignItems: 'flex-end',gap: "var(--12, 12px), "}} direction="row">
                    <ModifyIcon/>
                    <DeleteIcon/>
                    </Stack>
                     </TableCell>
                 
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
