'use client';

import * as React from 'react';
import { CameraIcon } from '@/icons';
import styled from '@emotion/styled';
import { Avatar, Button, Grid } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles'; // Import for creating custom styles

import { useDispatch, useSelector } from 'react-redux';

import { companyApis } from '@/lib/company/companyApis';
import { setOpenToast } from '@/lib/store/reducer/useGlobalActions';

const useStyles = makeStyles((theme) => ({
  rowContainer: {
    display: 'flex',
    flexDirection: 'column', // Change to 'row' for horizontal arrangement
    justifyContent: 'center', // Center elements horizontally
    alignItems: 'center', // Center elements vertically (optional)
  },
}));
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

const ProfilePicture = styled(Avatar)({
  width: '160px',
  height: '160px',
  border: '3px solid white',
});
export const CompanyLogo = () => {
  const classes = useStyles(); // Use the custom styles
  const [image, setImage] = React.useState<any>(null);
  const dispatch = useDispatch();
  const { company } = useSelector((state: any) => state.company);

  React.useEffect(() => {
    getImage();
  }, [company]);

  const getImage = React.useCallback(async (): Promise<void> => {
    const { res, error } = await companyApis.getImage(company._id);

    const blob = new Blob([res.data], { type: 'image/jpeg' });
    const imageUrl = URL.createObjectURL(blob);
    setImage(imageUrl);
    if (error) {
      dispatch(setOpenToast({ message: error, type: 'error' }));
      return;
    }
  }, [company]);

  const handleClickImage = () => {
    const fileInput = document.getElementById('company-image-upload');
    if (fileInput) {
      fileInput.click(); // Simulate a click event on the file input
    }
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files[0]);
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const formData = new FormData();
      // formData.append('id', user.id);
      formData.append('image', file);

      // Use FileReader to set the preview
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result as string);
      reader.readAsDataURL(file);

      try {
        const { res, error } = await companyApis.uploadImage(formData, company._id);

        if (error) {
          dispatch(setOpenToast({ message: error, type: 'error' }));
          return;
        }
        dispatch(setOpenToast({ message: 'Image Added Successfully', type: 'success' }));
      } catch (error) {
        dispatch(setOpenToast({ message: 'Error uploading image', type: 'error' }));
      }
    }
  };
  return (
    <Grid
      item
      xs={3}
      sx={{
        display: 'flex',
        height: '14.4375rem',
        padding: '0rem 3.1875rem',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 'var(--12, 0.75rem)',
      }}
    >
      <Stack direction="column" className={classes.rowContainer}>
        <Typography
          variant="bodyB2"
          sx={{
            color: '#24292F',
            fontFeatureSettings: '"cv04" on, "cv03" on, "cv02" on, "cv11" on, "clig" off, "liga" off',
          }}
        >
          Company Logo
        </Typography>
        <span
          style={{
            display: 'flex',
            height: '4.4375rem',
            padding: '0rem 3.1875rem',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 'var(--12, 0.75rem)',
          }}
        ></span>
       
        <ProfilePicture
          src={image || ''}
          alt={company.name}
          //style={{ backgroundImage: `url(${selectedImageProfil || 'https://source.unsplash.com/random'})` }}
          // onClick={handleClickProfilImage}
        />
        {/* {hasLogo ? <GreneIcon /> : <GreneIcon />} */}

        <VisuallyHiddenInput
          type="file"
          id="company-image-upload"
          // onChange={handleLogoUpload}
          onChange={handleImageChange}
          accept=".jpg,.jpeg,.png"
        />
        <Button
          btnType="secondary"
          onClick={handleClickImage}
          variant="contained"
          style={{
            borderRadius: '2rem',
            background: 'var(--Green-green-400, #3CCB7F)',

            display: 'flex',
            width: '2.25rem',
            height: '2.25rem',
            padding: '0.5rem',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          {/* <input
            accept="image/*"
            id="company-image-upload"
            type="file"
            // onChange={handleProfilImageChange}
            onChange={(e) => handleImageChange(e, 'PROFILE')}
            hidden
            style={{ position: 'absolute', top: 0, left: 0, opacity: 0, width: '100%', height: '100%' }} // Position and style the input
          /> */}
          <CameraIcon />
        </Button>
      </Stack>
    </Grid>
  );
};
