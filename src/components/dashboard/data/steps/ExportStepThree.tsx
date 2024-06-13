import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { FilterEmptyRow, isEmpty, isEmptyArray } from '@/lib/helper';
import { setData } from '@/lib/store/reducer/useFile';

import { DataTable } from '../Data-table';

const reports = [
  {
    id: 'USR-010',
    Date: '12/01/2022',
    Location: 'Location 01',
    Category: 'Transportation',
    Qunatity: '500 milles',
    EmissionFactor: '0.2 Kg CO2e/mile',
    SourceType: 'Manual',
    IntegrationSource: 'GreenAPI',
  },
  {
    id: 'USR-010',
    Date: '12/01/2022',
    Location: 'Location 02',
    Category: 'Building',
    Qunatity: '500 milles',
    EmissionFactor: '0.2 Kg CO2e/mile',
    SourceType: 'Manual',
    IntegrationSource: 'GreenAPI',
  },
];
export default function ExportStepThree() {
  const { file, columnMapped } = useSelector((state: any) => state.file);
  const dispatch = useDispatch();
  const [rows, setRows] = useState([{}]);
  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e: any) {
        const fileContent = e.target.result;

        // Process the file content here
        let lines = fileContent.split('\n');
        const newRows = [{}];
        //lines = FilterEmptyRow(lines);
        console.log('lines' + JSON.stringify(lines));
        lines?.slice(1).map((line, index) => {
          const rowArray = line.split(',');
          if (!isEmptyArray(rowArray)) {
            console.log('rowarrar' + rowArray);
            newRows.push({
              id: index,
              date: rowArray[columnMapped['Date']],
              location: rowArray[columnMapped['Location']],
              category: rowArray[columnMapped['Category']],
              quantity: rowArray[columnMapped['Quantity']],
              emission_tracker: rowArray[columnMapped['Emission Factor']],
            });
          }
        });
        console.log('newArray' + JSON.stringify(newRows));
        dispatch(setData(newRows.slice(1)));
        setRows(newRows.slice(1));
      };
      reader.readAsText(file);
    } else {
      console.log('No file selected');
    }
  }, [file]);
  const { selectedRow } = useSelector((state: any) => state.file);
  const handleDelete = () => {
    const indexToRemove = rows.indexOf(selectedRow);
    const newData = rows.filter((_: any, i: any) => i !== indexToRemove);
    setRows(newData);
    return 'success';
  };
  return (
    <Grid
      container
      xs={12}
      sx={{
        display: 'flex',
        flex: '1 0 0',
        padding: '24px 0px',
        //flexDirection: 'column',
        justifyContent: 'center',
        //alignItems: 'center',
        width: '100%',
      }}
    >
      <Grid item xs={8}>
        <Typography variant="h5" color="var(--Grey-grey-900, #1A1D21)" gutterBottom>
          Verification
        </Typography>
        <Typography variant="body2" color="var(--Grey-grey-400, #888909F)">
          Verify that your file doesn’t contain any issue to be able to complete the process of import data
        </Typography>
      </Grid>

      <Grid item xs={8}>
        <DataTable page={1} rows={rows} rowsPerPage={4} importFunc={true} handleDelete={handleDelete} />
      </Grid>
    </Grid>
  );
}
