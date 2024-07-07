import React,{useState,useEffect} from 'react';
import { VectorICon } from '@/icons';
import styled from '@emotion/styled'; 
import { Paperclip, X } from '@phosphor-icons/react';
import { useDispatch, useSelector } from 'react-redux';

import { clearFile, setFile } from '@/lib/store/reducer/useFile';
import { Button } from '@/components/commun/Button'; 
import { Target } from '@/types/target';
import { palette } from '@/styles/theme/colors';
import { MuiButton } from '@/styles/theme/components/button';
import {
  Box,
  Drawer,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Select,Stepper,Step,StepLabel,
  TextField,
  Typography,
  Divider,
} from '@mui/material';
import {getCategory } from '@/lib/helper';
import FilterDateComponent from '@/components/commun/Date/CustomDate';
import { setReport } from '@/lib/store/reducer/useReport';
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
type ExportStepOneProps = {
  handleSaveFile: () => void;
 
};
const scopes=[
  {label:'scope 01',value:'scope1'},

  {label:'scope 02',value:'scope2'},

  {label:'scope 03',value:'scope3'}
]

const typeOfReporting=[
  {value:'custom',label:'custom'},
  {value:'currentYear',label:'current year'},
  {value:'currentQuarter',label:'current quarter'},
  {value:'previousYear',label:'previous year'},
  {value:'previousQuarter',label:'previous quarter'},
 
  {value:'allTime',label:'all time'},
]
 
/* custom
current calendar year to date
current fiscal year to date
current quarter to date
previous calendar year
previous fiscal quarter
previous fiscal year
all time */
export default function ExportStepOne( ) {
  const { selectedRow, dataDB } = useSelector((state: any) => state.file);

  const { user } = useSelector((state: any) => state.user);
 /*  const [updatedTarget, setupdatedTarget] = useState<Target>(() => {
    const baseToTargetYear = target?.baseYear && target?.targetYear ? target.baseYear + '-' + target.targetYear : null;
    return { ...(target || {}), baseToTargetYear };
  }); */
/*   React.useEffect=()=>{
console.log("dbbbb=>",dataDB.length)
 } */
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  
  const [updatedTarget, setupdatedTarget] = useState<Target>();
  const [startFullDate, setStartFullDate] = useState<Date | null>(null);
  const [endFullDate, setEndFullDate] = useState<Date | null>(null);

  const { reportFile } = useSelector((state: any) => state.report);
  console.log("report file===>",reportFile)
  const [formattedSelectedDate, setFormattedSelectedDate] = useState('');
  const [category,setCategory]=useState([]);
  const [categoryOrScopes,setCategoryOrScopes]=useState([])
   const dispatch = useDispatch();
    const [error, setError] = useState(false);
    const handleNext = () => {
      console.log('handleNext') 
     // onNext(updatedTarget);
      //setupdatedTarget('');
      //onClose();
    };
    console.log("updatedTarget==>",updatedTarget )
    console.log("handle change",name,event)
    const handleChange = (name: string, event: any) => {
       if(name!="dateRange"){
      setupdatedTarget({ ...updatedTarget, [name]: event });
      
      
      dispatch(setReport(updatedTarget))
       }
    };
  
    const handleApply=(firstDate,endDate)=>{
      console.log("handleApply",firstDate,endDate)
      setIsCalendarOpen(!isCalendarOpen)
      setEndFullDate(endDate)
      setStartFullDate(firstDate)
      const formattedDate = `${(firstDate)} - ${(endDate)}`;
      setFormattedSelectedDate(formattedDate);

      setupdatedTarget({ ...updatedTarget, 'startDate':firstDate,'endDate':endDate,'createdBy':user._id  });
      dispatch(setReport(updatedTarget))
    
    }
    const handleCancel=()=>{
      console.log("handleCancel")
      setIsCalendarOpen(!isCalendarOpen)
      setEndFullDate('')
      setStartFullDate('')
    }
    const handleClear=()=>{
      console.log("handleClear")
      setFormattedSelectedDate('select Date')
      setEndFullDate('')
      setStartFullDate('')
       
    }

    const getScopesOrCategories=()=>{

    }
    useEffect(() => {
       
      console.log("updatedTarget?.type changed",updatedTarget?.type)
      if(updatedTarget?.type=="category"){
        setCategory(getCategory(dataDB));
        setCategoryOrScopes(getCategory(dataDB))
        console.log("const [category,setCategory]=useState([]);",category,scopes)
      }else{
        setCategoryOrScopes(scopes)
      }
      
    }, [updatedTarget?.type]);

   
  return (
    <Grid
      container
      xs={12}
      sx={{
        display: 'flex',
        flex: '1 0 0',
        padding: '24px 0px',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid item xs={10}>
        <Typography variant="h5" color="var(--Grey-grey-900, #1A1D21)" gutterBottom>
        Configuration
        </Typography>
        <Typography variant="body2" color="var(--Grey-grey-400, #888909F)">
        Control your report display by configuring the inputs of your reports.
          
        </Typography>

        <Grid
          container spacing={3} mt={3}  
           sx={{padding:"24px 32px",
            justifyContent:"flex-start",
            alignItems:"center",
            display: 'flex',
            marginTop: '8px',
            gap: '4px',
            alignSelf: 'stretch',
          }}
/*   sx={{
            display: 'flex',
            padding: '24px 32px',
            flexDirection: 'column',
            marginTop: '32px',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '22px',
            alignSelf: 'stretch',
            borderRadius: 'var(--Components-Pagination-Component-itemSizeSM, 24px)',
            border: '1px dashed var(--Foundation-Grey-grey-300, #787486)',
          }}  */         
        >
           
               
              <Typography variant="subtitle2">File Name</Typography>
              <TextField
                label="Categories"
                value={updatedTarget?.name || reportFile?.name}
                onChange={(e) => handleChange('name', e.target.value)}
                //onChange={(e) => setNewTask(e.target.value)}
                margin="normal"
                fullWidth
              />
              <Typography variant="subtitle2">Report Type</Typography>
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={updatedTarget?.type}
                  onChange={(e) => handleChange('type', e.target.value)}
                  label="Select"
                >
                  <MenuItem value="scopes">Scopes</MenuItem>
                  <MenuItem value="category">Category</MenuItem>
                  
                </Select>
              </FormControl>
              <Typography variant="subtitle2">Display</Typography>
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={updatedTarget?.display}
                  onChange={(e) => handleChange('display', e.target.value)}
                  label="Select"
                >  
                  <MenuItem value="all">All</MenuItem>
                   {categoryOrScopes.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
                </Select>
              </FormControl>

              <Typography variant="subtitle2">Type of Reporting</Typography>
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={updatedTarget?.typeReporting}
                  onChange={(e) => handleChange('typeReporting', e.target.value)}
                  label="Select"
                >
                  {typeOfReporting.map((item)=>(
                    <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                  ))}
                 
                 
                </Select>
              </FormControl>
 
              {updatedTarget?.typeReporting === 'custom' && (
                <>
                  <Typography variant="subtitle2">Date Range</Typography>
                  <TextField
                    label={formattedSelectedDate ? formattedSelectedDate : 'YYYY - YYYY'}
                    value={updatedTarget?.dateRange}
                    onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                    error={error}
                    placeholder="YYYY - YYYY"
                    fullWidth
                  />
                  {isCalendarOpen && (
                    <FilterDateComponent
                      handleApply={handleApply}
                      handleCancel={handleCancel}
                      handleClear={handleClear}
                    />
                  )}
                </>
              )}

        <Typography variant="subtitle2">Display Per</Typography>
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={updatedTarget?.displayPer}
                  onChange={(e) => handleChange('displayPer', e.target.value)}
                  label="Select"
                >
                  <MenuItem value="year">Year</MenuItem>
                  <MenuItem value="quarter">quarter</MenuItem>
                  <MenuItem value="month">month</MenuItem>
                  <MenuItem value="day">day</MenuItem>
                
                </Select>
              </FormControl>


              <Typography variant="subtitle2">File Type</Typography>
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={updatedTarget?.fileType}
                  onChange={(e) => handleChange('fileType', e.target.value)}
                  label="Select"
                >
                  <MenuItem value="pdf">pdf</MenuItem>
                  <MenuItem value="csv">csv</MenuItem> 
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
    
    
  );
}
