"use client";
import React, {useState,useEffect} from 'react';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider'; 
import dayjs from 'dayjs';
import {Grid,Button} from '@mui/material';
import {EmissionFactorTable} from "./EmissionFactorTable";
import { useDispatch, useSelector } from 'react-redux';
import { Emission } from '@/types/emission';
import { setEmissions } from '@/lib/store/reducer/useEmission';
import { emissionApis } from '@/lib/emission/emissionApis';

interface EmissionFactorProps {
  children?: React.ReactNode;
  index: number;
  value: number;
} 


 

export   function EmissionFactor() { 
   
  const page = 0;
  const rowsPerPage = 5;  


  const [emission, setEmission] = React.useState<Emission>({});
  const dispatch = useDispatch(); 
   
  const [paginatedEmission, setPaginatedEmission] = useState<Emission[]>([]);



  const getEmissions = React.useCallback(async (): Promise<void> => {
    const { error, res } = await emissionApis.getEmissions();
    if (error) {
      return;
    }
    dispatch(setEmissions(res));
    setPaginatedEmission(applyPagination(res, page, rowsPerPage));
    //setEmission(res);
  }, [page, rowsPerPage]);

  useEffect(() => {
    getEmissions();
  }, [getEmissions]);

  return (
    <Stack spacing={3}   >
     <Grid container alignItems="center" >
      
      <EmissionFactorTable
        count={paginatedEmission.length}
        page={page}
        rows={paginatedEmission}
        rowsPerPage={rowsPerPage}
      />
     </Grid>
    <Divider />
    </Stack>
   
   

 
      
   
  );
}
function applyPagination(rows: any[], page: number, rowsPerPage: number): Emission[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}