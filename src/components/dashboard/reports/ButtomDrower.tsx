import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Divider, Drawer, Grid, IconButton, Step, StepLabel, Stepper, Typography } from '@mui/material';
import Slide from '@mui/material/Slide';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useDispatch, useSelector } from 'react-redux';

import { reportApis } from '@/lib/report/reportApis';
import { setCloseToast, setOpenToast } from '@/lib/store/reducer/useGlobalActions';
import { setReport } from '@/lib/store/reducer/useReport';
import { Button } from '@/components/commun/Button';
import { FooterBody, FooterBox, header } from '@/styles/theme/Bottom-drawer';

import SwitchSteps from './SwitchSteps';

const steps = [
  { value: 'Configuration', label: 'Step 01' },
  { value: 'Preview', label: 'Step 02' },
];
interface ExportStep1Props {
  open: boolean;
  onClose: () => void;
}

const ButtomDrower: React.FC<ExportStep1Props> = ({ open, onClose }) => {
  const { report, reportToSend } = useSelector((state: any) => state.report);
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();
  const handleStep = () => {
    setActiveStep(activeStep + 1);
  };

  const handleCreateReport = React.useCallback(async (): Promise<void> => {
    const input = document.getElementById('export-content');
    html2canvas(input as HTMLElement)
      .then(async (canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const width = pdf.internal.pageSize.getWidth();
        const height = pdf.internal.pageSize.getHeight();
        pdf.addImage(imgData, 'PNG', 0, 0, width, height);
        const pdfBlob = pdf.output('blob');
        const formData = new FormData();
        formData.append('file', pdfBlob, 'report.pdf');
        Object.keys(reportToSend).forEach((key) => {
          formData.append(key, reportToSend[key]);
        });
        const { res, error } = await reportApis.createReport(formData);
        pdf.save('download.pdf');
        if (error) {
          dispatch(setOpenToast({ message: 'Something wrong ' + error, type: 'error' }));
          return;
        }
        if (res) {
          dispatch(setOpenToast({ message: 'Report Added Successfully', type: 'success' }));
          dispatch(setReport([...report, res]));
          onClose();
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }, [reportToSend]);

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
              {activeStep < 1 && (
                <Button variant="contained" color="primary" onClick={handleStep}>
                  Next
                </Button>
              )}
              {activeStep == 1 && (
                <Button variant="contained" color="primary" onClick={handleCreateReport}>
                  Export
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
