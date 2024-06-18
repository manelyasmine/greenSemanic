"use client";
import React, { useState, useEffect } from 'react'; 
import Typography from '@mui/material/Typography'; 
import { MuiButton } from '@/styles/theme/components/button';
import Stack from '@mui/material/Stack'; 
import Divider from '@mui/material/Divider'; 
import { Grid, Button, TextField } from '@mui/material'; 
import { CompanyLogo } from '../../commun/Inputs/CompanyLogo'; 
import { companyApis } from '@/lib/company/companyApis';
import { setCompany } from '@/lib/store/reducer/useCompany';
import { useDispatch, useSelector } from 'react-redux';
import { Company } from '@/types/company'; 

export function CompanyProfile() { 
  const [newCompany, setNewCompany] = useState<Company>({
    name: '',
    email: '',
    website: '',
    logo: '',
    size: '',
    headOffice: '',
    description: '',
    business: ''
  });

  const { company } = useSelector((state: any) => state.company);
  const [errorAlert, setErrorAlert] = useState('');
  const dispatch = useDispatch();
  const [selectedLogo, setSelectedLogo] = useState(null); // State to store uploaded logo

  const handleLogoChange = (file) => {
    setSelectedLogo(file); // Update state with the uploaded file

    // Optional: Perform additional actions like validation or processing
    if (file && file.type.startsWith('image/')) {
      // Handle valid image file
      console.log('Valid image uploaded:', file.name);
    } else {
      console.error('Invalid file type uploaded.');
      setSelectedLogo(null); // Reset state if invalid file
    }
  };

  const handleChange = (name: string, event: any) => {
    setNewCompany({ ...newCompany, [name]: event.target.value });
  };

  const handleCreateCompany = React.useCallback(async (): Promise<void> => {
    const { res, error } = await companyApis.createCompany(newCompany);
    if (error) {
      setErrorAlert(error);
      return;
    }
    dispatch(setCompany(res));
    setNewCompany(res);
    console.log("new and old", newCompany, company);
  }, [newCompany, dispatch]);

  const getCompany = React.useCallback(async (): Promise<void> => {
    const { error, res } = await companyApis.getCompany();
    if (error) {
      return;
    }

    console.log("new and old", newCompany, company);
    dispatch(setCompany(res));
    setNewCompany(res);
    console.log("get company api", res);
  }, [dispatch]);

  useEffect(() => {
    getCompany();
  }, [getCompany]);

  return (
    <Stack spacing={6}>
      <Grid container alignItems="center">
        <Grid item xs={6}>
          <Typography variant="h5" sx={{ color: 'var(--Gray-900, #101828)' }}>
            Company profile
          </Typography>
        </Grid>
        <Grid item xs={6} container justifyContent="flex-end" sx={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--12, 12px)' }}>
          <Button 
            sx={{
              ...MuiButton.styleOverrides.sizeSmall,
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
            sx={{
              ...MuiButton.styleOverrides.sizeSmall,
              borderRadius: "6px",
              justifyContent: 'flex-end',
              background: "var(--Green-green-500, #16B364)",
            }}
            onClick={handleCreateCompany}
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
      <Grid container>
        <Grid item xs={8}>
          <Typography variant="subtitle2">Company name</Typography>
          <TextField
            required
            value={newCompany?.name}
            onChange={(e) => handleChange('name', e)}
            margin="normal"
            fullWidth
          />
          <Typography variant="subtitle2">Business Field</Typography>
          <TextField
            required
            value={newCompany?.business}
            onChange={(e) => handleChange('business', e)}
            margin="normal"
            fullWidth
          />
          <Typography variant="subtitle2">Head office</Typography>
          <TextField
            required
            value={newCompany?.headOffice}
            onChange={(e) => handleChange('headOffice', e)}
            margin="normal"
            fullWidth
          />
          <Typography variant="subtitle2">Email</Typography>
          <TextField
            required
            value={newCompany?.email}
            onChange={(e) => handleChange('email', e)}
            margin="normal"
            fullWidth
          />
          <Typography variant="subtitle2">Company Website</Typography>
          <TextField
            required
            value={newCompany?.website}
            onChange={(e) => handleChange('website', e)}
            margin="normal"
            fullWidth
          />
          <Typography variant="subtitle2">Company Size</Typography>
          <TextField
            required
            value={newCompany?.size}
            onChange={(e) => handleChange('size', e)}
            margin="normal"
            fullWidth
          />
          <Typography variant="subtitle2">Description</Typography>
          <TextField
            required
            value={newCompany?.description}
            onChange={(e) => handleChange('description', e)}
            margin="normal"
            fullWidth
          />
        </Grid>
        <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', alignSelf: 'stretch',flexDirection:"column" }} />
    {/*     <CompanyLogo /> */}
    <CompanyLogo onLogoChange={handleLogoChange} hasLogo={false} />

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
