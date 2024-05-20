"use client";
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { MuiButton } from '@/styles/theme/components/button';
import { TextField } from '@mui/material';
import { palette } from '@/styles/theme/colors';
import Stack from '@mui/material/Stack';
import {GreneIcon,CameraIcon} from '@/icons';
import Divider from '@mui/material/Divider'; 
import {
  
  Grid,Button
  
} from '@mui/material';
import {Input} from '../../commun/Inputs/Input';
import { InputSelect } from '../../commun/Inputs/InputSelect';
import {CompanyLogo} from '../../commun/Inputs/CompanyLogo'; 

interface EmissionFactorProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}



 

export   function EmissionFactor() {
  const [value, setValue] = React.useState(0);
 

  return (
    <Stack spacing={3}   >
     <Grid container alignItems="center" >
  <Grid item xs={6}>
  <Typography variant="h5"   sx={{ color: 'var(--Gray-900, #101828)' }}>
      Company profile
    </Typography>

    
  
  </Grid>
  <Grid item xs={6} container justifyContent="flex-end"
         sx={{display: 'flex',
         
         alignItems: 'flex-start',
         gap: 'var(--12, 12px)',
         }}
        >
    
    <Button 
      btnType="Primary"
      sx={{ ...MuiButton.styleOverrides.sizeSmall,
            borderRadius: "6px",
            border: '1px solid var(--Grey-grey-200, #B3B8C2)',
            background: 'var(--Colors-Base-00, #FFF)',
            justifyContent: 'flex-end',
            
        }}
        >
    <Typography variant="h7" sx={{ color: "var(--Grey-grey-600, #606977)" }}>
        Cancel
      </Typography>
    </Button>

     
     
    <Button
      btnType="Primary"
      sx={{
        ...MuiButton.styleOverrides.sizeSmall,
        borderRadius: "6px",
        justifyContent: 'flex-end',
        background: "var(--Green-green-500, #16B364)",
      }}
    >
      <Typography variant="h7" sx={{ color: "var(--Colors-Base-00, #FFF)" }}>
        Save
      </Typography>
    </Button>
  </Grid>
  <Grid>
  <Typography variant="body3">
      Update your company photo and details here.
    </Typography>
    </Grid>
</Grid>
<Grid container   >
      <Grid item xs={8}>
        <Input labelText="Comany name" required={0} />
        <InputSelect labelText="Business Field" required={0} />
        <Input labelText="Head office" required={1}/>
        <Input labelText="Email" required={1}/>
        <Input labelText="Comany Website" required={1}/>
        <InputSelect labelText="Business Size" required={1} />
        <Input labelText="Description" required={1}/>
      </Grid>
      <Grid item xs={1} sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        alignSelf: 'stretch',
      }}/>

      
     
      <CompanyLogo />
      
      
          
       
</Grid>
<Divider />
 
  <Typography variant="body3" sx={{
        color: 'var(--Foundation-Grey-grey-400, #48494D)',
        fontFeatureSettings: '"cv04" on, "cv03" on, "cv02" on, "cv11" on, "clig" off, "liga" off',
          
      }}>
    All of the fields on this page are optional and can be deleted at any time, and by filling them out, you're giving us consent to share this data wherever your user profile appears. Please see our privacy statement to learn more about how we use this information.
  </Typography>
      
    </Stack>
  );
}
