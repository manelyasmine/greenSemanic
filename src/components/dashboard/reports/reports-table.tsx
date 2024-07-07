'use client';

import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import dayjs from 'dayjs';

import usePagination from '@/hooks/use-pagination';
import { useSelection } from '@/hooks/use-selection';
import { Pagination } from '@/components/commun/Pagination/Pagination';
import { palette } from '@/styles/theme/colors';

import FilterColumns from '../../commun/Filters/FilterColumns';
import Others from './Others';

const useStyles = makeStyles((theme) => ({
  cardHeader: {
    backgroundColor: palette.common.white,
  },
}));

export interface Reports {
  id: string;
  name: string;
  period: string;
  status: string;
  createdBy: string;
  createdAt: Date;
}

interface ReportsTableProps {
  page?: number;
  rows?: object[];
  rowsPerPage?: number;
  importFunc?: boolean;
  handleDelete: any;
  handleUpdate: any;
  onFilterBySearch: any;
  onFilterByDate: any;
  pages: number;
  handleChangePage: any;
  onFilterByFiltering: any;
}

export function ReportsTable({
  rows = [],
  rowsPerPage = 5,
  importFunc = false,
  handleDelete,
  handleUpdate,
  onFilterBySearch,
  onFilterByDate,
  onFilterByFiltering,
  pages,
  handleChangePage,
}: ReportsTableProps): React.JSX.Element {
  const classes = useStyles();
  console.log('rows', rows);

  const [page, setPage] = useState(1); // Start on page 1
  const [totalPages, setTotalPages] = useState(10); // Replace with actual total pages
  const columns: Column[] = [
    { field: 'location', headerName: 'location', width: 150, filterable: true, type: 'string' },
    { field: 'category', headerName: 'category', width: 110, filterable: true, type: 'string' },
    { field: 'quantity', headerName: 'quantity', width: 160, filterable: true, type: 'number' },
    { field: 'emission_tracker', headerName: 'Emission Factor', width: 160, filterable: true, type: 'number' },
    { field: 'source', headerName: 'source', width: 160, filterable: true, type: 'string' },
  ];

  const paginatedRows = usePagination({ rows, page, pageSize: rowsPerPage });
  const updateChangePage = (event: any, newPage: any) => {
    console.log('update change data', newPage);
    setPage(newPage);
    handleChangePage(newPage);
  };

  const updateSearch = (search: string) => {
    console.log('updateSearch====>', search);
    onFilterBySearch(search);
  };
  const updateFiltering = (selectedValue: string, operator: string, value: string) => {
    console.log('update filtering from data table', selectedValue, operator, value);
    onFilterByFiltering(selectedValue, operator, value);
  };
  return (
    <Card>
      <Divider />
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell colSpan={12}>
                <Card variant="outlined" sx={{ border: '0' }}>
                  <CardHeader
                    title={
                      <FilterColumns
                        columns={columns}
                        onFilterByFiltering={updateFiltering}
                        onFilterByDate={onFilterByDate}
                        onFilterBySearch={updateSearch}
                        isYear={false}
                        isDate={false}
                        isFullDate={true}
                      />
                    }
                  />
                </Card>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell padding="checkbox"></TableCell>
              <TableCell>Report Name</TableCell>
              <TableCell>Reporting Period</TableCell>
              <TableCell>Created By</TableCell>
              <TableCell>Creation Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows &&
              paginatedRows.map((row) => {
              return (
                <TableRow hover key={row.id}>
                  <TableCell padding="checkbox"></TableCell>
                  <TableCell>
                    <Typography variant="bodyB3">{row.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="bodyP3">
                      {row.startDate}
                      {row.endDate}
                    </Typography>
                  </TableCell>

                  <TableCell>{row.createdBy}</TableCell>

                  <TableCell>{dayjs(row.createdAt).format('MMM D, YYYY')}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <Box
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '16px 24px',
                      borderBottom: '1px solid var(--Grey-25, #F4F5F6)',
                      alignSelf: 'stretch',
                    }}
                  >
                    <Others report={row} />
                  </Box>
                </TableRow>
              );
            })}
               {!paginatedRows ||
              (paginatedRows.length == 0 && (
                <TableRow>
                  <TableCell colSpan={10} padding="checkbox">
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginY: '2rem' }}>
                      <img src={'/assets/empty.png'} width={200} height={200} alt="My Image" />
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <Box style={{ display: 'flex', justifyContent: 'center' }}>
      <Pagination
          paginatioType="gray"
          // color='gray'
          //count={pages} // Total number of pages
          count={Math.ceil(rows.length / rowsPerPage)}
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
