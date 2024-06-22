import React from 'react';
import { Table, TableBody, TableCell, TableRow } from '@mui/material';

function CustomTablePagination({ data, rowsPerPage }) {
  const limitedData = data.slice(0, rowsPerPage); // Slice data to desired limit

  return (
    <Table sx={{ minWidth: '600px' }}>
      {/* Add your table headers here */}
      <TableBody>
        {limitedData.map((row, index) => (
          <TableRow key={index}>
            {/* Map your table cells here based on row data */}
            <TableCell>{row.column1}</TableCell>
            <TableCell>{row.column2}</TableCell>
            {/* ... Add more table cells as needed */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default CustomTablePagination;
