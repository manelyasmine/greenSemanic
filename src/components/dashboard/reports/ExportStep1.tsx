import React, { useState } from 'react';
import { Label } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
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
import Card from '@mui/material/Card';
import Slide from '@mui/material/Slide';
import { useDispatch, useSelector } from 'react-redux';

import { body, FooterBody, FooterBox, header, HeaderBody } from '@/styles/theme/Bottom-drawer';
import { Filter } from '@/styles/theme/Filter';
import { Button } from '@/components/commun/Button';
import { Target } from '@/types/target';
import { CarbonEmissionsCategory } from '../overview/CarbonEmissionsCategory';
import { LatestOrders } from '../overview/latest-orders';
import { MonthlyCarbonEmissions } from '../overview/MonthlyCarbonEmissions';
import { CarbonEmissionsScope } from '../overview/CarbonEmissionsScope';
import { Tasks } from '../overview/Tasks';
import { Reduction } from '../overview/Reduction';
import { TotalEmissions } from '../overview/TotalEmissions';
import { CarbonPerMonth } from '../overview/CarbonPerMonth';
import Scopes from '../overview/Scopes';
const steps = [
    { value: 'Configuration', label: "Step 01" },
    { value: 'Preview', label: "Step 02" }
  ];
interface BottomDrawerProps {
  open: boolean;
  onClose: () => void;
  target : Target
  activeStep:number;
  onUpdateTarget: (target: Target) => void; // Function to handle task creation
  onNext:(target:Target)=>void;
} 
const UpdateBottomDrawer: React.FC<BottomDrawerProps> = ({ open, onClose, onUpdateTarget  ,activeStep=0, target,onNext}) => {
  //const { target } = useSelector((state: any) => state.target);
 // const [updatedTarget, setupdatedTarget] = useState<Target>({...target , baseToTargetYear:target.baseYear+'-'+target.targetYear});
 const [updatedTarget, setupdatedTarget] = useState<Target>(() => {
  const baseToTargetYear = target?.baseYear && target?.targetYear ? target.baseYear + '-' + target.targetYear : null;
  return { ...(target || {}), baseToTargetYear };
});

 
 const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const handleNext = () => {
    console.log('handleNext') 
    onNext(updatedTarget);
    //setupdatedTarget('');
    //onClose();
  };

  const handleChange = (name: string, event: any) => {
    const regex = /^\d{4}-\d{4}$/;
    if (name == 'baseToTargetYear') {
      console.log('see year to ' + event);
      if (!regex.test(event)) {
        setError(true);
        setupdatedTarget({ ...updatedTarget, [name]: event });
      } else {
        const newString = event?.split('-');
        console.log('Update new string '+ newString[0])
        setupdatedTarget({ ...updatedTarget, baseYear: newString[0], targetYear: newString[1] , [name]: event });
        setError(false);
      }
    }else{
      setupdatedTarget({ ...updatedTarget, [name]: event });
    }
  };
  return (
    <Drawer anchor="bottom" open={open} onClose={onClose}>
      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={header}>
            <Typography
              variant="h4"
              sx={{
                color: 'var(--Foundation-Grey-grey-700, #121417)',
                fontFeatureSettings: '"cv04" on, "cv03" on, "cv02" on, "cv11" on, "clig" off, "liga" off',
              }}
            >
              {' '}
              Export report
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
               <Typography variant="help">need help?</Typography>  
              <IconButton onClick={onClose} sx={{ marginLeft: 8 }}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>

          <Grid item xs={12} sx={{display: 'flex',
 
 padding: '38px 0px 37px 0px',
 justifyContent: 'center',
 alignItems: 'center',
 alignSelf: 'stretch',}}>
          <Stepper activeStep={activeStep}  alternativeLabel>
      
          {steps.map((step) => (
            <Step key={step.value}>
            <StepLabel sx={{variabt:"BodyB4", display:"flex",flexDirection:"row"}}>{step.label} {step.value}</StepLabel>
            </Step>
        ))}

        
        </Stepper>
        </Grid>
        <Divider sx={{backgroundColor:"#DBDBDB",height:"1px",width:"100%" }}   />
        <Grid container xs={12} sx={{padding:"24px 32px",justifyContent:"center",alignItems:"center"}}>
        <Grid item xs={6} mt={3}>
        <Typography variant="h3" color="var(--Grey-grey-900, #1A1D21)" gutterBottom>
        Configuration
        </Typography>
        <Typography variant="bodyP2" color="var(--Grey-grey-400, #88909F)" >
        Control your report display by configuring the inputs of your reports.
        </Typography> 
      </Grid>
     
      

    <Grid container spacing={3} mt={3}   sx={{padding:"24px 32px",justifyContent:"center",alignItems:"center"}} >
     
            <Grid xs={8}>
              
              <Typography variant="subtitle2">File Name</Typography>
              <TextField
                label="Categories"
                value={updatedTarget.name}
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
                  value={updatedTarget.type}
                  onChange={(e) => handleChange('type', e.target.value)}
                  label="Select"
                >
                  <MenuItem value="Company">Company</MenuItem>
                  <MenuItem value="Intensity">Intensity</MenuItem>
                  <MenuItem value="Facility">Facility</MenuItem>
                </Select>
              </FormControl>
              <Typography variant="subtitle2">Display</Typography>
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={updatedTarget.type}
                  onChange={(e) => handleChange('type', e.target.value)}
                  label="Select"
                >
                  <MenuItem value="Company">Company</MenuItem>
                  <MenuItem value="Intensity">Intensity</MenuItem>
                  <MenuItem value="Facility">Facility</MenuItem>
                </Select>
              </FormControl>

              <Typography variant="subtitle2">Type of Reporting</Typography>
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={updatedTarget.type}
                  onChange={(e) => handleChange('type', e.target.value)}
                  label="Select"
                >
                  <MenuItem value="Company">Company</MenuItem>
                  <MenuItem value="Intensity">Intensity</MenuItem>
                  <MenuItem value="Facility">Facility</MenuItem>
                </Select>
              </FormControl>
 
              <Typography variant="subtitle2">Date Range</Typography>
              <TextField
                label="Base To Target Year"
                value={updatedTarget.baseToTargetYear}
                onChange={(e) => handleChange('baseToTargetYear', e.target.value)}
                margin="normal"
                error={error}
                placeholder="YYYY - YYYY"
                fullWidth
              />

        <Typography variant="subtitle2">Display Per</Typography>
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={updatedTarget.type}
                  onChange={(e) => handleChange('type', e.target.value)}
                  label="Select"
                >
                  <MenuItem value="Company">Company</MenuItem>
                  <MenuItem value="Intensity">Intensity</MenuItem>
                  <MenuItem value="Facility">Facility</MenuItem>
                </Select>
              </FormControl>


              <Typography variant="subtitle2">File Type</Typography>
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={updatedTarget.type}
                  onChange={(e) => handleChange('type', e.target.value)}
                  label="Select"
                >
                  <MenuItem value="Company">Company</MenuItem>
                  <MenuItem value="Intensity">Intensity</MenuItem>
                  <MenuItem value="Facility">Facility</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        
        <Divider sx={{backgroundColor:"#DBDBDB",height:"1px",width:"100%" }}   />
      
     
    
        
          <Grid sx={FooterBox}>
            <Grid sx={FooterBody}>
              <Button btnType={'secondary'} onClick={ () => onClose()} >
                Cancel
              </Button>

              <Button variant="contained" color="primary" onClick={ handleNext }>
                Next
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Slide>
    </Drawer>
  );
};

export default UpdateBottomDrawer;
