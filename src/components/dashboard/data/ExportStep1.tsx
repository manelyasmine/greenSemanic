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

import { MuiButton } from '@/styles/theme/components/button';
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
import { ShareIcon,VectorICon } from '@/icons';
import DeleteConfirmation from '@/components/commun/Alerts/DeleteConfirmation';
const steps = [
    { value: 'Upload file', label: "Step 01" },
    { value: 'Columns mapping', label: "Step 02" },
    { value: 'Verification', label: "Step 03" },
    { value: 'Preview', label: "Step 04" }
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
        <Grid container xs={12} sx={{display:'flex',flex: '1 0 0',padding:"24px 0px",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        <Grid item xs={10}  >
        <Typography variant="h5" color="var(--Grey-grey-900, #1A1D21)" gutterBottom>
                Upload file
        </Typography>
        <Typography variant="bodyP3" color="var(--Grey-grey-400, #888909F)" >
        To add new entries to Grene and update data, import the file. Please consult our 
        <span style={{
                color: 'var(--Green-green-500, #16B364)', 
                fontFamily: 'Mulish',
                fontSize: '14px',
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: '150%',

                        }}> import guide  </span>or <span style={{
            color: 'var(--Green-green-500, #16B364)', 
            fontFamily: 'Mulish',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: '150%',
             
            
                    }}>download the template </span> to get started.
        
         </Typography> 

         <Grid item  sx={{

display: 'flex',padding: '32px',flexDirection: 'column',marginTop:"32px",
justifyContent: 'center',
alignItems: 'center',
gap: '22px',
alignSelf: 'stretch',
borderRadius: 'var(--Components-Pagination-Component-itemSizeSM, 24px)',
border: '1px dashed var(--Foundation-Grey-grey-300, #787486)',
 
      }}>
        <IconButton>
            <VectorICon />
        </IconButton>
<Grid sx={{display:"flex",alignItems:"center",justifyContent:"column",gap:"8px"}}>
        <Typography  sx={{
            color: 'var(--Foundation-Grey-grey-400, #48494D)',
            fontFamily: 'Inter',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: '20px',
        }}>
        Drag & Drop <span style={{
 color: 'var(--Foundation-Grey-grey-400, #48494D)',
fontFamily: 'Inter',
fontSize: '12px',
fontStyle: 'normal',
fontWeight: 400,
lineHeight: '20px',
        }}>a file here or </span>
        </Typography>


       <Button
            btnType="Primary"
            sx={{
              ...MuiButton.styleOverrides.sizeSmall,
              borderRadius: "6px",
              background: "var(--Green-green-500, #16B364)",
            }}
            >
            <Typography variant="h7" sx={{ color: "var(--Colors-Base-00, #FFF)" }}>
              Browse 
            </Typography>
          </Button>  
          </Grid>
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
