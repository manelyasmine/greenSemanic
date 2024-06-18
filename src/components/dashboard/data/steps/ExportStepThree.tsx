import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { dataApis } from '@/lib/data/dataApis';
import { FilterEmptyRow, getEmission, isEmpty, isEmptyArray } from '@/lib/helper';
import { clearSelectedRow, setData } from '@/lib/store/reducer/useFile';
import { setOpenToast } from '@/lib/store/reducer/useGlobalActions';

import { DataTable } from '../Data-table';

export default function ExportStepThree() {
  const { file, columnMapped, dataDB } = useSelector((state: any) => state.file);
  const dispatch = useDispatch();
  const [rows, setRows] = useState([{}]);
  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = async function (e: any) {
        const fileContent = e.target.result;

        // Process the file content here
        let lines = fileContent.split('\n');
        const newRows = [{}];
        lines?.slice(1).map((line, index:number) => {
          const rowArray = line.split(',');
          if (!isEmptyArray(rowArray)) {
            console.log('year' + parseInt(rowArray[columnMapped['Date']]));
            //console.log('result emissio find=====<' +getEmission(dataDB , rowArray[columnMapped['Date']] , rowArray[columnMapped['Category']], rowArray[columnMapped['Location']] ))
            newRows.push({
              id: index,
              date: parseInt(rowArray[columnMapped['Date']]),
              location: rowArray[columnMapped['Location']],
              category: rowArray[columnMapped['Category']],
              quantity: rowArray[columnMapped['Quantity']],
              //emission_tracker: getEmission(dataDB , rowArray[columnMapped['Date']] , rowArray[columnMapped['Category']], rowArray[columnMapped['Location']] )
              //emission_tracker: rowArray[columnMapped['Emission Factor']],
            });
          }
        });
        console.log('newArray' + JSON.stringify(newRows));
        try {
          const { error, res } = await dataApis.generateRow(newRows.slice(1));
          if (error) {
            dispatch(setOpenToast({ message: 'something wrong', type: 'error' }));
            return;
          } else {
            console.log('DATTTTTTTTAAAA' + JSON.stringify(res));
            dispatch(setData(res));
            setRows(res);
          }
        } catch (e) {
          dispatch(setOpenToast({ message: 'something wrong', type: 'error' }));
        }
      };
      reader.readAsText(file);
    } else {
      console.log('No file selected');
    }
  }, [file]);
  const { selectedRow } = useSelector((state: any) => state.file);
  const handleDelete = () => {
    console.log('rpw'+ JSON.stringify(rows))
    const indexToRemove = rows.indexOf(selectedRow);
    const newData = rows.filter((_: any, i: any) => i !== indexToRemove);
    setRows(newData);
    dispatch(clearSelectedRow());
    return 'success';
  };
  const handleUpdate = (DataToUpdate : any) => {
    console.log('handle update'+ JSON.stringify(DataToUpdate))
    console.log('rpw'+ JSON.stringify(rows))
    const indexToUpdate = rows.indexOf(DataToUpdate);
    const newRows = rows.map((row) => {
      console.log(indexToUpdate)
      if (row.id === DataToUpdate.id) {
        console.log('here found' + JSON.stringify(DataToUpdate));
        return DataToUpdate;
      }else{

        return row;
      }

    });
    setRows(newRows);
    dispatch(clearSelectedRow());
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
        <DataTable
          page={1}
          rows={rows}
          rowsPerPage={4}
          importFunc={true}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
        />
      </Grid>
    </Grid>
  );
}
