import React from 'react';
import GoogleIcon from '@/icons/GoogleIcon';
import { Button, Typography } from '@mui/material';

import { palette } from '@/styles/theme/colors';

const LoginWithGoogleButton = () => {
  // Function to handle login with Google
  const handleGoogleLogin = () => {
    // Add your Google login logic here
    console.log('Login with Google');
    // Implement Google authentication using your preferred method
  };

  return (
    <Button
      variant="outlined"
      startIcon={<GoogleIcon />}
      onClick={handleGoogleLogin}
      sx={{
        width: '100%',
        marginTop: 2,
        borderColor: palette.gray[200],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="button" sx={{ marginLeft: 1, color: palette.gray[600] }}>
        Login with Google
      </Typography>
    </Button>
  );
};

export default LoginWithGoogleButton;
