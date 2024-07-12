'use client';

import React, { useEffect, useState } from 'react';
import { CalanderIcon, ExportIcon, FilterIcon, ImportIcon } from '@/icons';
import { Box, Button, Divider, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';

import { dataApis } from '@/lib/data/dataApis';
import { reportApis } from '@/lib/report/reportApis';
import { setDataDB } from '@/lib/store/reducer/useFile';
import { setReport } from '@/lib/store/reducer/useReport';
import ButtomDrower from '@/components/dashboard/reports/ButtomDrower';
import { ReportsTable } from '@/components/dashboard/reports/reports-table';
import { MuiButton } from '@/styles/theme/components/button';

 
export default function Page(): React.JSX.Element { 
  
  const rowsPerPage = 3;
  const [isOpen, setIsOpen] = useState(false);
  const { report } = useSelector((state: any) => state.report);
  const [reports, setReports] = React.useState<Report>({}); 
  const [totalItems,setTotalItems]=useState(0);
  const [searchBaseYear,setSearchBaseYear]=useState('');
  const [searchInput,setSearchInput]=useState('')
  const [column,setColumn]=useState('');
  const [operator,setOperator]=useState('');
  const [value,setValue]=useState('');
  const [searchTargetYear,setSearchTargetYear]=useState('');
  const [page, setPage] = useState(1);  
  const [pages,setPages]=useState(1);
  const dispatch = useDispatch(); 
 
  const onFilterByDate = (selectedDate:Date) => { 
    setSearchBaseYear(selectedDate[0]);
    setSearchTargetYear(selectedDate[1]);
  
        
      
    };
    const onFilterBySearch=(search:String)=>{ 
      console.log("onFilterBySearch=>",search)
      setSearchInput(search)
    }
    const onFilterByFiltering=(selectedValue:String,operator:String,value)=>{
      console.log("searching equal page task==>",selectedValue,operator,value)
      setColumn(selectedValue);
        setOperator(operator);
        setValue(value)
      
    
    }
  function downloadCSV(data, filename = 'data.csv') {
    const csv = convertToCSV(data);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', filename);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  const handleChangePage = ( newPage :Number) => {
    console.log("handle change page",page)
    setPage(newPage); 
  };

  const handleExportClick = () => {
    setIsOpen(!isOpen);
  };
  function convertToCSV(data) {
    const csvRows = [];

    // Get headers
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(','));

    // Loop through rows
    for (const row of data) {
      const values = headers.map((header) => {
        const escaped = ('' + row[header]).replace(/"/g, '\\"'); // Escape double quotes
        return `"${escaped}"`;
      });
      csvRows.push(values.join(','));
    }

    return csvRows.join('\n');
  }

  const getReports = React.useCallback(async (): Promise<void> => {
    console.log("something change appel api ",searchInput)
     const filters = { 
      start:searchBaseYear,
      end:searchTargetYear,
       page,  
       limit: rowsPerPage,  
        search:searchInput,
       column:column,
        operator:operator,
        value:value, 
     }; 
   

    const { error, res,total,totalPages } = await reportApis.getReports(filters);
 
    if (error) {
      return;
    }
    dispatch(setReport(res));
    setReports(res);
    setPages(totalPages);
    setTotalItems(total);
    console.log("total pages",totalPages)
   
  }, [dispatch, page, rowsPerPage,pages, searchInput,searchBaseYear,searchTargetYear,column,operator,value]);

  const getData = React.useCallback(async (): Promise<void> => {
    const { error, res } = await dataApis.getData();
    if (error) {
      return;
    }

    dispatch(setDataDB(res));
  }, [ ]);

  useEffect(() => { 
    getReports();
  }, [getReports]);
  return (
    <Box>
      <Grid container justifyContent="space-between" spacing={2}>
        <Grid item xs={8}>
          <Typography variant="h3" color="var(--Grey-grey-900, #1A1D21)" gutterBottom>
            Reports
          </Typography>
          <Typography variant="bodyP2" color="var(--Grey-grey-400, #88909F)">
          Below is a list of tasks related to your carbon emissions. Please review them and ensure they align with your sustainability goals.
          </Typography>
          <Divider sx={{ backgroundColor: '#EAECF0', height: '1px', width: '100%', marginTop: '24px' }} />
        </Grid>

        <Grid item xs={4} container justifyContent="flex-end">
          <Grid item>
            <Button
              btnType="Primary"
              sx={{
                ...MuiButton.styleOverrides.sizeSmall,
                borderRadius: '6px',
                background: 'var(--Green-green-500, #16B364)',
              }}
              startIcon={<ExportIcon fontSize="var(--icon-fontSize-sm)" color="white" />}
              onClick={handleExportClick}
            >
              <Typography variant="h7" sx={{ color: 'var(--Colors-Base-00, #FFF)' }}>
                Export
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <ReportsTable   page={page} rows={report} rowsPerPage={rowsPerPage}
            onFilterBySearch={onFilterBySearch}  onFilterByFiltering={onFilterByFiltering} onFilterByDate={onFilterByDate} 
            pages={pages} handleChangePage={handleChangePage} total={totalItems}
     />

      {isOpen && (
        <ButtomDrower
          open={isOpen}
          onClose={() => {
            setIsOpen(!isOpen);
          }}
        />
      )}
    </Box>
  );
}
