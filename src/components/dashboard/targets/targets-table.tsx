'use client';

import React, { useMemo, useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { Pagination } from '@mui/material';
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
import { useDispatch } from 'react-redux';

import { Target } from '@/types/target';
import { setTarget } from '@/lib/store/reducer/useTarget';
import { useSelection } from '@/hooks/use-selection';
import Chip from '@/components/commun/chip/Chip';
import ChipTrend from '@/components/commun/Chip/ChipTrend';
import DropdownTableCell from '@/components/DropDown/DropdownTableCell';
import { palette } from '@/styles/theme/colors';

import empty from '../../../../public/assets/empty.png';
import EmptySVG from '../../../../public/assets/svg/empty';
import FilterColumns from '../../commun/Filters/FilterColumns';

function noop(): void {
  // do nothing
}

export interface Customer {
  id: string;
  avatar: string;
  name: string;
  email: string;
  address: { city: string; state: string; country: string; street: string };
  phone: string;
  createdAt: Date;
}

interface TargetsTableProps {
  count?: number;
  page?: number;
  rows?: Target[];
  rowsPerPage?: number;
  
}

export function TargetsTable({ count = 100, rows = [], rowsPerPage = 5 }: TargetsTableProps): React.JSX.Element {
  const rowIds = React.useMemo(() => {
    return Array.isArray(rows) && rows?.map((customer) => customer.id);
  }, [rows]);

  const { selectAll, deselectAll, selectOne, deselectOne, selected } = useSelection(rowIds);

  const selectedSome = (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
  const selectedAll = rows.length > 0 && selected?.size === rows.length;

  const dispatch = useDispatch();

  const router = useRouter();
  const [page, setPage] = useState(1); // Start on page 1
  const [pageSize, setPageSize] = useState(rowsPerPage);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleClickRow = (event: any, data: any) => {
    if (
      !event.target.classList.contains('mui-wlbu0w-MuiTableCell-root') 
    ) {
      return;
    }
    //Row selected

    dispatch(setTarget(data));
    router.push('/dashboard/target/details');
  };
  // Calculate the current page's rows
  const paginatedRows = useMemo(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return Array.isArray(rows) && rows?.slice(start, end);
  }, [rows, page, pageSize]);

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
              <TableCell>Target Name</TableCell>
              <TableCell>Target Type</TableCell>
              <TableCell>Emission Reduction Target</TableCell>
              <TableCell>Base To Target Year</TableCell>

              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows &&
              paginatedRows.map((row, index) => {
                const isSelected = selected?.has(row.id);

                return (
                  <TableRow
                    hover
                    onClick={(e) => handleClickRow(e, row)}
                    key={row.id}
                    selected={isSelected}
                    //style={index % 2 ? { background: palette.gray[25] } : { background: 'white' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          event.stopPropagation();
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
                        {/* <Avatar src={row.avatar} /> */}
                        <Typography variant="subtitle2">{row.name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Chip chipType="primaryLight">{row.type}</Chip>
                    </TableCell>

                    <TableCell>{row.emissionReduction}</TableCell>
                    <TableCell>{dayjs(row.createdAt).format('MMM D, YYYY')}</TableCell>
                    <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2rem' }}>
                      <DropdownTableCell  target={row} />
                    </Box>
                  </TableRow>
                );
              })}

            {!paginatedRows || paginatedRows.length == 0  && (
              <TableRow>
                <TableCell colSpan={5} padding="checkbox">
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginY: '2rem' }}>
                    <img src={'/assets/empty.png'} width={200} height={200} alt="My Image" />
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <Box style={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination
          sx={{ marginY: 1 }}
          count={Math.ceil(rows.length / pageSize)}
          page={page}
          // count={count} // Total number of pages
          // page={4} // Current page
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
