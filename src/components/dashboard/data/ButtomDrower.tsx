import React, { useState } from 'react';
import { ShareIcon, VectorICon } from '@/icons';
import { Label } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Divider,
  Drawer,
  FormControl,
  Grid,
  IconButton,
  Input,
  MenuItem,
  Select,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from '@mui/material';
import Card from '@mui/material/Card';
import Slide from '@mui/material/Slide';
import { styled } from '@mui/material/styles';
import { Paperclip, X } from '@phosphor-icons/react/dist/ssr';
import { useDispatch, useSelector } from 'react-redux';

import { Target } from '@/types/target';
import { dataApis } from '@/lib/data/dataApis';
import DeleteConfirmation from '@/components/commun/Alerts/DeleteConfirmation';
import { Button } from '@/components/commun/Button';
import Toast from '@/components/commun/Toast/Toast';
import { body, FooterBody, FooterBox, header, HeaderBody } from '@/styles/theme/Bottom-drawer';
import { palette } from '@/styles/theme/colors';
import { MuiButton } from '@/styles/theme/components/button';
import { Filter } from '@/styles/theme/Filter';

import { CarbonEmissionsCategory } from '../overview/CarbonEmissionsCategory';
import { CarbonEmissionsScope } from '../overview/CarbonEmissionsScope';
import { CarbonPerMonth } from '../overview/CarbonPerMonth';
import { LatestOrders } from '../overview/latest-orders';
import { MonthlyCarbonEmissions } from '../overview/MonthlyCarbonEmissions';
import { Reduction } from '../overview/Reduction';
import Scopes from '../overview/Scopes';
import { Tasks } from '../overview/Tasks';
import { TotalEmissions } from '../overview/TotalEmissions';
import ExportStepOne from './steps/ExportStepOne';
import SwitchSteps from './steps/SwitchSteps';
import { setCloseToast, setOpenToast } from '@/lib/store/reducer/useGlobalActions';

const steps = [
  { value: 'Upload file', label: 'Step 01' },
  { value: 'Columns mapping', label: 'Step 02' },
  { value: 'Verification', label: 'Step 03' },
  { value: 'Preview', label: 'Step 04' },
];
interface ExportStep1Props {
  open: boolean;
  onClose: () => void;
  onUpdateTarget: (target: Target) => void; // Function to handle task creation
}

const ButtomDrower: React.FC<ExportStep1Props> = ({ open, onClose, onUpdateTarget }) => {
  const { data } = useSelector((state: any) => state.file);
 
  // const [openToast, setOpenToast] = React.useState(false);

  // const [type, setType] = useState<'success' | 'error'>('success');
  // const [message, setMessage] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();
  const handleStep = () => {
    setActiveStep(activeStep + 1);
  };

  const handleUpload = React.useCallback(async (): Promise<void> => {
    console.log('here upload');
    const { res, error } = await dataApis.uploadData(data);
    if (error) {
      console.log('error');
      dispatch(setOpenToast({message : error, type:'error'}))
      return;
    }
    dispatch(setOpenToast({message : 'Data Added Successfully', type:'success'}))
    onClose();
  }, [data]);

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

          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',

              padding: '38px 0px 37px 0px',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'stretch',
            }}
          >
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((step) => (
                <Step key={step.value}>
                  <StepLabel sx={{ variabt: 'BodyB4', display: 'flex', flexDirection: 'row' }}>
                    {step.label} {step.value}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>
          <Divider sx={{ backgroundColor: '#DBDBDB', height: '1px', width: '100%' }} />
          <SwitchSteps currentStep={activeStep} />

          <Divider sx={{ backgroundColor: '#DBDBDB', height: '1px', width: '100%' }} />

          <Grid sx={FooterBox}>
            <Grid sx={FooterBody}>
              <Button btnType={'secondary'} onClick={() => onClose()}>
                Cancel
              </Button>
              {activeStep > 0 && (
                <Button btnType={'secondary'} onClick={() => setActiveStep(activeStep - 1)}>
                  Back
                </Button>
              )}
              {activeStep < 3 && (
                <Button variant="contained" color="primary" onClick={handleStep}>
                  Next
                </Button>
              )}
              {activeStep == 3 && (
                <Button variant="contained" color="primary" onClick={handleUpload}>
                  Send
                </Button>
              )}
            </Grid>
          </Grid>
        </Box>
      </Slide>
     
    </Drawer>
  );
};

export default ButtomDrower;