'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Checkbox from '@mui/material/Checkbox';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

export function Notifications(): React.JSX.Element {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Card>
        <CardHeader subheader="We may still send you important notifications about your account outside of your notification settings." title="Notification settings" />
        <Divider />
        <CardContent>
  <Grid container spacing={6} wrap="wrap" direction="column">
  <Grid item xs={12} >
  <Stack spacing={1} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: "flex-end" }}>
    <Typography variant="BodyB2" color="var(--Grey-grey-800, #3D434C)" sx={{alignSelf:"flex-start"  }}>General Notifications:</Typography>
    <FormGroup sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: "flex-end" }}>
     
     
      <FormControlLabel control={<Switch color="success" variant="solid" />} label="Email Notifications" />
      <FormControlLabel control={<Switch color="success" variant="solid" />} label="Notifications Push" />
    </FormGroup>
  </Stack>
  </Grid>
  <Divider />
    
    <Grid item xs={12}>
    <Stack spacing={1} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: "flex-end" }}>
    <Typography variant="BodyB2" color="var(--Grey-grey-800, #3D434C)" sx={{alignSelf:"flex-start"  }}>Alert Settings ::</Typography>
    <FormGroup sx={{ display: 'flex',justifyContent: 'flex-end', alignItems: "flex-end" }}>
     
     
    <FormControlLabel    control={<Switch color="success" variant="solid"   />} label="Targets Progress" />
      <FormControlLabel   control={<Switch color="success" variant="solid" />} label="Reduction Tips" />
      <FormControlLabel   control={<Switch color="success" variant="solid" />} label="High Emission Activities" />
      <FormControlLabel  control={<Switch color="success" variant="solid" />} label="Reach the target" />
    </FormGroup>
  </Stack>
    </Grid>
  </Grid>
  <Divider />
  <Grid item xs={12}>
    <Stack spacing={1} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: "flex-end" }}>
    <Typography variant="BodyB2" color="var(--Grey-grey-800, #3D434C)" sx={{alignSelf:"flex-start"  }}>Reminders</Typography>
    <Typography variant="BodyP3" color="var(--Grey-grey-800, #88909F)" sx={{alignSelf:"flex-start"  }}> These are notifications to remind you of updates you might have missed.</Typography>
   
    <FormGroup sx={{gap:"8px" , display: 'flex', justifyContent: 'flex-end', alignItems: "flex-end" }}>
     
     
    <FormControlLabel   control={<Switch color="success" variant="solid"   />} label="Push" />
      <FormControlLabel control={<Switch color="success" variant="solid" />} label="Email" />
      <FormControlLabel control={<Switch color="success" variant="solid" />} label="SMS" />
       </FormGroup>
   
   
  </Stack>
    </Grid>
  
</CardContent>

       {/*  <Divider /> */}
      {/*   <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained">Save changes</Button>
        </CardActions> */}
      </Card>
    </form>
  );
}
