"use client";
import React, { useState } from 'react';
import { CameraIcon, DZIcon } from '@/icons';
import styled from '@emotion/styled';
import { Avatar, Box, IconButton as MuiIconButton, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { Button } from '@/components/commun/Button';
import { IconButton } from '@/components/commun/Button/IconButton';
import { userApis } from '@/lib/user/userApis';

const CoverImage = styled(Box)({
  height: '200px',
  backgroundImage: 'url(https://source.unsplash.com/random)', // Replace with placeholder or selected image
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
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageProfil, setSelectedImageProfil] = useState(null); 

 /*  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) =>setSelectedImage(e.target.result); // Update image preview with base64 URL
      reader.readAsDataURL(event.target.files[0]);
    }
  }; */

/*   const handleImageChange = async(event: React.ChangeEvent<HTMLInputElement>) => {
   
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('userId', user.id);

      const reader = new FileReader();
      
      formData.append('imageCover', event.target.files[0]);
        
    
      try {

      console.log("formdata==>",formData)
        const {res, error} = await userApis.uploadCoverImage(formData);
        const reader = new FileReader();
        reader.onload = (e) =>setSelectedImage(e.target.result); // Update image preview with base64 URL
        reader.readAsDataURL(event.target.files[0]);
      
        if (error) {
          console.log("Update error:", error);
          return; 
        } else {
          setSelectedImage(res.imageUrl);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };
   */
  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('id',user.id);
       formData.append('imageCover', file);
  
      // Use FileReader to set the preview
      const reader = new FileReader();
      reader.onload = (e) => setSelectedImage(e.target.result as string);
      reader.readAsDataURL(file);
  
      try { 
        const { res, error } = await userApis.uploadCoverImage(formData,user.id);
        
        if (error) {
          console.log("Update error:", error);
          return;
        }
        
        setSelectedImage(res.imageUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };
  

  const handleProfilImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) =>setSelectedImageProfil(e.target.result); // Update image preview with base64 URL
      reader.readAsDataURL(event.target.files[0]);
    }
  };



  const handleClickCoverImage = () => {
    const fileInput = document.getElementById('cover-image-upload');
    if (fileInput) {
      fileInput.click(); // Simulate a click event on the file input
    }
  };

  const handleClickProfilImage = () => {
    const fileInput = document.getElementById('profil-image-upload');
    if (fileInput) {
      fileInput.click(); // Simulate a click event on the file input
    }
  };

  return (
    <Box sx={sx}>
      <CoverImage   style={{ backgroundImage: `url(${selectedImage || 'https://source.unsplash.com/random'})` }}>
        
      <input
          accept="image/*"
          id="cover-image-upload"
          type="file"
          onChange={handleImageChange}
           hidden
        />
        <Button
          variant="contained"
          btnType="primary"
          onClick={handleClickCoverImage}
          startIcon={<CameraIcon />}
          sx={{ position: 'absolute', top: '10px', right: '10px' }}
        >
          Change Cover
        </Button>
       
        
      </CoverImage>
      <Box sx={{ display: 'flex' }}>
      <ProfilePicture alt="Souhila Aouad" style={{ backgroundImage: `url(${selectedImageProfil || 'https://source.unsplash.com/random'})` }} onClick={handleClickProfilImage} />
        <input
          accept="image/*"
          id="profil-image-upload"
          type="file"
          onChange={handleProfilImageChange}
          hidden
          style={{ position: 'absolute', top: 0, left: 0, opacity: 0, width: '100%', height: '100%' }} // Position and style the input
        />
        <IconButton onClick={handleClickProfilImage} btnType="primary" size="small" sx={iconButtonStyle} >
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
