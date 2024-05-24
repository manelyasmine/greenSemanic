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
 
import { Pagination } from '@mui/material';
import {ModifyIcon,DeleteIcon} from "@/icons";

function noop(): void {
  // do nothing
}

export interface Customer {
  id: string;
  avatar: string;
  name: string;
  email: string; 
  phone: string;
  status:string;
  Role:string;
  createdAt: Date;
}

interface UsersTableProps {
  count?: number;
  page?: number;
  rows?: Customer[];
  rowsPerPage?: number;
}

export function UsersTable({ count = 100, rows = [], rowsPerPage = 5 }: UsersTableProps): React.JSX.Element {
  const rowIds = React.useMemo(() => {
    return rows.map((customer) => customer.id);
  }, [rows]);

  const { selectAll, deselectAll, selectOne, deselectOne, selected } = useSelection(rowIds);

  const selectedSome = (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
  const selectedAll = rows.length > 0 && selected?.size === rows.length;
 

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  return (
    <Card>
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
              <TableCell>Status</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Joined Date </TableCell>
              <TableCell>  </TableCell>
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
                  <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                      <Avatar src={row.avatar} />
                      <Typography variant="bodyB3" sx={{olor:"var(--Grey-grey-600, #606977)"}}>{row.name} </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                  <Typography variant="bodyB3">{row.status} </Typography>
                  </TableCell>
                  <TableCell>
                  <Stack sx={{ alignItems: 'flex-start',color:"var(--Green-green-500, #16B364)" }} direction="column" spacing={2}>
                      
                      <Typography variant="bodyP3" >{row.email} </Typography>
                          <Typography variant="bodyP3">{row.phone} </Typography>
                        </Stack>
                  </TableCell>
                  <TableCell> 

                  <Typography variant="bodyP3" sx={{color:"var(--Grey-grey-400, #88909F)"}}>{row.Role} </Typography>
                  </TableCell>
                  <TableCell> 
                  <Typography variant="bodyP3" sx={{color:"var(--Grey-grey-400, #88909F)"}}>{dayjs(row.joinedAt).format('MMM D, YYYY')} </Typography>
                  
                  </TableCell>
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
