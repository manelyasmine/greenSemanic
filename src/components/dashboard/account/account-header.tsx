'use client';

import React from 'react';
import { CameraIcon, DZIcon } from '@/icons';
// import { styled } from '@mui/system';
// import { styled } from '@mui/material/styles';
import styled from '@emotion/styled';
import { Avatar, Box, IconButton as MuiIconButton, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { Button } from '@/components/commun/Button';
import { IconButton } from '@/components/commun/Button/IconButton';

const CoverImage = styled(Box)({
  height: '200px',
  backgroundImage: 'url(https://source.unsplash.com/random)', // Replace with your image URL
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'relative',
  borderRadius: '16px',
});

const ProfilePicture = styled(Avatar)({
  width: '160px',
  height: '160px',
  border: '3px solid white',
  //position: 'absolute',
  // bottom: '-50px',
  top: '-50px',
  left: '20px',
});

const iconButtonStyle = {
  width: '45px', // custom width
  height: '45px', // custom height
  '& .MuiSvgIcon-root': {
    fontSize: '40px', // custom icon size
  },
  border: '3px solid white',
  bottom: '-70px',
  left: '-30px',
};

interface ProfileHeaderProps {
  sx?: any;
}
const ProfileHeader = ({ sx }: ProfileHeaderProps) => {
  const { user } = useSelector((state: any) => state.user);
  return (
    <Box sx={sx}>
      <CoverImage>
        <Button
          variant="contained"
          btnType="primary"
          startIcon={<CameraIcon />}
          sx={{ position: 'absolute', top: '10px', right: '10px' }}
        >
          Change Cover
        </Button>
      </CoverImage>
      <Box sx={{ display: 'flex' }}>
        <ProfilePicture alt="Souhila Aouad" src="https://source.unsplash.com/random/100x100" />
        <IconButton btnType="primary" size="small" sx={iconButtonStyle}>
          <CameraIcon />
        </IconButton>

        <Box sx={{ marginLeft: '30px', marginTop: '20px' }}>
          <Typography variant="h3">{user.firstname + ' ' + user.lastname}</Typography>
          <Typography variant="body2">{user.email}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileHeader;
