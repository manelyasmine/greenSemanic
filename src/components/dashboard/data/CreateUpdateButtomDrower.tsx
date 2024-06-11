// import React, { useState } from 'react';
// import { ShareIcon, VectorICon } from '@/icons';
// import { Label } from '@mui/icons-material';
// import CloseIcon from '@mui/icons-material/Close';
// import {
//   Box,
//   Divider,
//   Drawer,
//   FormControl,
//   Grid,
//   IconButton,
//   Input,
//   MenuItem,
//   Select,
//   Stack,
//   Step,
//   StepLabel,
//   Stepper,
//   TextField,
//   Typography,
// } from '@mui/material';
// import Card from '@mui/material/Card';
// import Slide from '@mui/material/Slide';
// import { styled } from '@mui/material/styles';
// import { Paperclip, X } from '@phosphor-icons/react/dist/ssr';
// import { useDispatch, useSelector } from 'react-redux';

// import { Target } from '@/types/target';
// import { dataApis } from '@/lib/data/dataApis';
// import DeleteConfirmation from '@/components/commun/Alerts/DeleteConfirmation';
// import { Button } from '@/components/commun/Button';
// import { body, FooterBody, FooterBox, header, HeaderBody } from '@/styles/theme/Bottom-drawer';
// import { palette } from '@/styles/theme/colors';
// import { MuiButton } from '@/styles/theme/components/button';
// import { Filter } from '@/styles/theme/Filter';

// import { CarbonEmissionsCategory } from '../overview/CarbonEmissionsCategory';
// import { CarbonEmissionsScope } from '../overview/CarbonEmissionsScope';
// import { CarbonPerMonth } from '../overview/CarbonPerMonth';
// import { LatestOrders } from '../overview/latest-orders';
// import { MonthlyCarbonEmissions } from '../overview/MonthlyCarbonEmissions';
// import { Reduction } from '../overview/Reduction';
// import Scopes from '../overview/Scopes';
// import { Tasks } from '../overview/Tasks';
// import { TotalEmissions } from '../overview/TotalEmissions';
// import ExportStepOne from './steps/ExportStepOne';
// import SwitchSteps from './steps/switchSteps';
// import { Data } from '@/types/data';

// const steps = [
//   { value: 'Upload file', label: 'Step 01' },
//   { value: 'Columns mapping', label: 'Step 02' },
//   { value: 'Verification', label: 'Step 03' },
//   { value: 'Preview', label: 'Step 04' },
// ];
// interface ExportStep1Props {
//   open: boolean;
//   onClose: () => void;
//   onUpdateData: (data: Data) => void; // Function to handle task creation
// }

// const CreateUpdateButtomDrower: React.FC<ExportStep1Props> = ({ open, onClose, onUpdateData }) => {
//   const { data } = useSelector((state: any) => state.file);

//   const [dataToSend, setDataToSend] = useState<Data>(data);
//   const dispatch = useDispatch();
//   const [error, setError] = useState(false);

//   const handleChange = (name: string, event: any) => {
   
//     setDataToSend({ ...dataToSend, [name]: event });
//   };
//   const handleUpload = React.useCallback(async (): Promise<void> => {
//     console.log('here upload');
//     const { res, error } = await dataApis.uploadData(data);
//     if (error) {
//       console.log('error');
//       //setErrorAlert(error);
//       return;
//     }
//     onClose();
//     //dispatch(setTargets([...targets , res]))
//   }, [data]);

//   return (
//     <Drawer anchor="bottom" open={open} onClose={onClose}>
//       <Slide direction="up" in={open} mountOnEnter unmountOnExit>
//         <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
//           <Box sx={header}>
//             <Typography
//               variant="h4"
//               sx={{
//                 color: 'var(--Foundation-Grey-grey-700, #121417)',
//                 fontFeatureSettings: '"cv04" on, "cv03" on, "cv02" on, "cv11" on, "clig" off, "liga" off',
//               }}
//             >
//               {' '}
//               Update Target{' '}
//             </Typography>
//             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//               {/* <Typography variant="help">need help?</Typography> */}
//               <IconButton onClick={onClose} sx={{ marginLeft: 8 }}>
//                 <CloseIcon />
//               </IconButton>
//             </Box>
//           </Box>
//           <Grid sx={body}>
//             <Grid sx={{ width: '80%' }}>
//               <Grid sx={HeaderBody}>
//                 <Typography variant="h5">Update target </Typography>
//                 <Typography variant="body2">Update existant target </Typography>
//               </Grid>
//               <Typography variant="subtitle2">Target Name</Typography>
//               <TextField
//                 label="Target Name"
//                 value={updatedTarget.name}
//                 onChange={(e) => handleChange('name', e.target.value)}
//                 //onChange={(e) => setNewTask(e.target.value)}
//                 margin="normal"
//                 fullWidth
//               />
//               <Typography variant="subtitle2">Target Type</Typography>
//               <FormControl fullWidth>
//                 <Select
//                   labelId="demo-simple-select-label"
//                   id="demo-simple-select"
//                   value={updatedTarget.type}
//                   onChange={(e) => handleChange('type', e.target.value)}
//                   label="Select"
//                 >
//                   <MenuItem value="Company">Company</MenuItem>
//                   <MenuItem value="Intensity">Intensity</MenuItem>
//                   <MenuItem value="Facility">Facility</MenuItem>
//                 </Select>
//               </FormControl>
//               <Typography variant="subtitle2">Emission Reduction Target</Typography>
//               <TextField
//                 label="Emission"
//                 value={updatedTarget.emissionReduction}
//                 onChange={(e) => handleChange('emissionReduction', e.target.value)}
//                 margin="normal"
//                 fullWidth
//               />
//               <Typography variant="subtitle2">Base To Target Year</Typography>
//               <TextField
//                 label="Base To Target Year"
//                 value={updatedTarget.baseToTargetYear}
//                 onChange={(e) => handleChange('baseToTargetYear', e.target.value)}
//                 margin="normal"
//                 error={error}
//                 placeholder="YYYY - YYYY"
//                 fullWidth
//               />
//             </Grid>
//           </Grid>
//           <Grid sx={FooterBox}>
//             <Grid sx={FooterBody}>
//               <Button btnType={'secondary'} onClick={ () => onClose()} >
//                 Cancel
//               </Button>

//               <Button variant="contained" color="primary" onClick={ handleUpdateTarget }>
//                 Confirm
//               </Button>
//             </Grid>
//           </Grid>
//         </Box>
//       </Slide>
//     </Drawer>
//   );
// };

// export default CreateUpdateButtomDrower;
