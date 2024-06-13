'use client';

import React, { useState } from 'react';
import { DeleteIcon, ModifyIcon } from '@/icons';
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
import { useDispatch, useSelector } from 'react-redux';

import { dataApis } from '@/lib/data/dataApis';
import { setDataDB, setSelectedRow } from '@/lib/store/reducer/useFile';
import usePagination from '@/hooks/use-pagination';
import { useSelection } from '@/hooks/use-selection';
import { IconButton } from '@/components/commun/Button/IconButton';
import DeleteModal from '@/components/commun/Modal/DeleteModal';
// import { Pagination } from '@mui/material';
import { Pagination } from '@/components/commun/Pagination/Pagination';
import { palette } from '@/styles/theme/colors';

import FilterColumns from '../../commun/Filters/FilterColumns';

export interface Reports {
  id: string;
  Date: Date;
  Location: string;
  Category: string;
  Qunatity: string;
  EmissionFactor: string;
  SourceType: string;
  IntegrationSource: string;
}

interface DataTableProps {
  page?: number;
  rows?: object[];
  rowsPerPage?: number;
  importFunc?: boolean;
  handleDelete: any
}

export function DataTable({ rows = [], rowsPerPage = 5, importFunc = false , handleDelete }: DataTableProps): React.JSX.Element {
  const rowIds = React.useMemo(() => {
    return rows.map((Reports) => Reports.id);
  }, [rows]);

  const { selectAll, deselectAll, selectOne, deselectOne, selected } = useSelection(rowIds);
  const dispatch = useDispatch();
  const selectedSome = (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
  const selectedAll = rows.length > 0 && selected?.size === rows.length;

  const [page, setPage] = useState(1); // Start on page 1
  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };
  const [isDelModal, setIsDelModal] = useState(false);
  const paginatedRows = usePagination({ rows, page, pageSize: rowsPerPage });
  const { selectedRow ,dataDB } = useSelector((state: any) => state.file);
  const deleteRow = () => { 
    
    const {error , result} = handleDelete()
    if(error) { 
      return
    }
    setIsDelModal(false);
    setIsDelModal(false);
  }
  // const handleDelete = React.useCallback(async (): Promise<void> => {
  //   const { error, res } = await dataApis.deleteData(selectedRow._id);
  //   console.log('see'+selectedRow)
  //   if (error) {
  //     return;
  //   }
  //   const indexToRemove = dataDB.indexOf(selectedRow);
  //   const newData = dataDB.filter((_: any, i: any) => i !== indexToRemove);
  //   setIsDelModal(false);
  //   dispatch(setDataDB(newData));
  //   setIsDelModal(false);
  // }, [selectedRow]);

  return (
    <Card>
      <Divider />
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell colSpan={12}>
                <Card variant="outlined" sx={{ border: '0' }}>
                  <CardHeader title={<FilterColumns />} />
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
              {!importFunc && <TableCell>Source Type</TableCell>}
              {!importFunc && <TableCell>Integration Source</TableCell>}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows &&
              paginatedRows.map((row) => {
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
                      <Typography variant="bodyB3">{dayjs(row.date).format('MMM D, YYYY')}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="bodyP3">{row.location}</Typography>
                    </TableCell>

                    <TableCell>{row.category}</TableCell>

                    <TableCell>{row.quantity}</TableCell>
                    <TableCell>{row.emission_tracker}</TableCell>

                    {!importFunc && <TableCell>{row.source}</TableCell>}
                    {!importFunc && <TableCell>{row.IntegrationSource}</TableCell>}
                    <TableCell>
                      <Stack sx={{ display: 'flex', alignItems: 'flex-end', gap: 'var(--12, 12px), ' }} direction="row">
                        <IconButton btnType="tertiary">
                          <ModifyIcon />
                        </IconButton>
                        <IconButton
                          btnType="tertiary"
                          onClick={() => {
                            dispatch(setSelectedRow(row)), setIsDelModal(true);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </TableCell>
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
          count={Math.ceil(rows.length / rowsPerPage)} // Total number of pages
          page={page}
          onChange={handleChangePage}
          size="small"
          showFirstButton
          showLastButton
          shape="rounded"
        />
      </Box>
      <DeleteModal
        onClose={() => setIsDelModal(!isDelModal)}
        handleDelete={deleteRow}
        open={isDelModal}
        title={'Do you want to delete this?'}
        subtitle={'Are you sure you want to delete this data.'}
      />
    </Card>
  );
}
