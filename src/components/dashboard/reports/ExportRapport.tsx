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
import { ShareIcon } from '@/icons';
import DeleteConfirmation from '@/components/commun/Alerts/DeleteConfirmation';
const steps = [
    { value: 'Configuration', label: "Step 01" },
    { value: 'Preview', label: "Step 02" }
  ];
interface BottomDrawerProps {
  open: boolean;
  onClose: () => void;
  target : Target;
  activeStep:number;
  onUpdateTarget: (target: Target) => void; // Function to handle task creation
}

const UpdateBottomDrawer: React.FC<BottomDrawerProps> = ({ open, onClose, onUpdateTarget  ,activeStep=1  , target}) => {
  //const { target } = useSelector((state: any) => state.target);
 // const [updatedTarget, setupdatedTarget] = useState<Target>({...target , baseToTargetYear:target.baseYear+'-'+target.targetYear});
 const [updatedTarget, setupdatedTarget] = useState<Target>(() => {
  const baseToTargetYear = target?.baseYear && target?.targetYear ? target.baseYear + '-' + target.targetYear : null;
  return { ...(target || {}), baseToTargetYear };
});

const [isActiveShare,setIsActiveShare]=useState(false); 
 const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const handleUpdateTarget = () => {
    console.log('update')
    onUpdateTarget(updatedTarget);
    //setupdatedTarget('');
    //onClose();
  };
  const handleShare=()=>{
    setIsActiveShare(!isActiveShare);
  }
  const handleSendShare=()=>{

  }
  const handleClseShare=()=>{
    setIsActiveShare(false);


  }
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
        <Grid item xs={10}>
        <Typography variant="h3" color="var(--Grey-grey-900, #1A1D21)" gutterBottom>
        Preview
        </Typography>
        <Typography variant="bodyP2" color="var(--Grey-grey-400, #88909F)" >
        you can see a preview of uploaded file to confirm that the data are correct
        </Typography> 
      </Grid>
     
      <Grid item xs={2} container justifyContent="flex-end">
       
        <Grid item>
          <Button
            btnType="Primary"
            sx={{ 
              borderRadius: "6px",
              background: "var(--Green-green-500, #16B364)",
            }}  
            startIcon={<ShareIcon/>}
            onClick={handleShare}
          >
            <Typography variant="h7" sx={{ color: "var(--Colors-Base-00, #FFF)" }}>
            Share Report
            </Typography>
          </Button>
        </Grid>
      
    </Grid>
    {
      isActiveShare &&
      <DeleteConfirmation
      open={isActiveShare}
      setOpen={setIsActiveShare}
      title="Share this report"
      subtitle="You can use up to five email addresses separated by a comma"
      primary="Send"
      secondary="Cancel"
      primaryColor={{ backgroundColor: 'var(--Green-green-500, #16B364)' }}
    />

    }

    <Grid container spacing={3} mt={3}  sx={{gap:"20px",paddingBottom:"32px"}} >
        <Grid lg={3.5} sm={6} xs={12}  sx={{paddingLeft:"32px"}}>
          <CarbonPerMonth diff={12} trend="up" sx={{ height: '100%'  }} value="548752" />
        </Grid>
        <Grid lg={3.5} sm={6} xs={12}>
          <TotalEmissions diff={0.9} trend="down" sx={{ height: '100%'  }} value="548752" />
        </Grid>
        <Grid lg={3.5} sm={6} xs={12}>
          <Reduction diff={1.4} trend="up" sx={{ height: '100%'  }} value={200} />
        </Grid>  
       </Grid> 
     
    <Grid container spacing={3} mt={3}  sx={{gap:"20px ",paddingBottom:"32px"}} >
        <Grid lg={7} xs={12}   sx={{paddingLeft:"32px"}}>
          <CarbonEmissionsScope
            chartSeries={[
              { name: 'Scope 1', data: [20, 25, 30, 35, 40, 45, 50, 55, 60, 55, 50, 45] },
              { name: 'Scope 2', data: [30, 35, 40, 45, 50, 55, 60, 55, 50, 45, 40, 35] },
              { name: 'Scope 3', data: [40, 45, 50, 55, 60, 55, 50, 45, 40, 35, 30, 25] },
            ]}
            sx={{ height: '100%' }}
          />
        </Grid>
        <Grid lg={4} xs={12}>
      
      <Scopes    />
    </Grid>
    </Grid>

    <Grid container spacing={3} mt={3}  sx={{gap:"20px ",paddingBottom:"32px"}} >

        <Grid lg={6} sm={6} xs={12}  sx={{paddingLeft:"32px"}}>
          <MonthlyCarbonEmissions sx={{ height: '100%' }} />
        </Grid>
        <Grid lg={5} md={6} xs={12}>
          <CarbonEmissionsCategory sx={{ height: '100%' }} />
        </Grid>
        </Grid>
        </Grid>
        <Divider sx={{backgroundColor:"#DBDBDB",height:"1px",width:"100%" }}   />
      
     
    
        
          <Grid sx={FooterBox}>
            <Grid sx={FooterBody}>
              <Button btnType={'secondary'} onClick={ () => onClose()} >
                Cancel
              </Button>

              <Button variant="contained" color="primary" onClick={ handleUpdateTarget }>
                Confirm
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Slide>
    </Drawer>
  );
};

export default UpdateBottomDrawer;
