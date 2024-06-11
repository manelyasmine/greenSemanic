import React, { useEffect, useState } from 'react';
import FileIcon from '@/icons/FileIcon';
import { Grid, MenuItem, Select, Stack, Typography } from '@mui/material';
import { ArrowRight } from '@phosphor-icons/react';
import { useDispatch, useSelector } from 'react-redux';

import { setColumnMapped } from '@/lib/store/reducer/useFile';
import { IconButton } from '@/components/commun/Button/IconButton';

interface RowTableProps {
  title: string;
}
export default function rowTable({ title }: RowTableProps) {
  const { file, columnMapped } = useSelector((state: any) => state.file);
  const [columnFile, setColumnFile] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e: any) {
        const fileContent = e.target.result;

        // Process the file content here
        const lines = fileContent.split('\n');
        //console.log(lines[0].split(','));
        setColumnFile(lines[0].split(','));
      };
      reader.readAsText(file);
    } else {
      console.log('No file selected');
    }
  }, [file]);

  const handleChange = (event: any) => {
    dispatch(setColumnMapped({  ...columnMapped ,[title]: event.target.value}));
  };
  return (
    <Stack direction={'row'} spacing={2} marginTop={2}>
      <Grid xs={6} justifyItems={'center'}>
        <Stack direction={'row'} justifyContent={'space-between'}>
          {' '}
          <Stack direction={'row'} spacing={2}>
            <FileIcon />
            <Typography gutterBottom variant="body/P2">
              {title}
            </Typography>
          </Stack>
          <IconButton btnType="primaryLight">
            <ArrowRight />
          </IconButton>
        </Stack>
      </Grid>
      <Grid xs={6}>
        <Select
          size="small"
          sx={{ width: '100%' }}
          //value={'Date'}
          label="Age"
          onChange={handleChange}
        >
          {columnFile && columnFile.map((col: any, index: any) => <MenuItem value={index}>{col}</MenuItem>)}
        </Select>
      </Grid>
    </Stack>
  );
}
