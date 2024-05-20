import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';  // For scoped CSS


interface InputProps {
  children?: React.ReactNode;
  required: number;
  labelText: string;
}

// Define styles at the top level
const useStyles = makeStyles((theme) => ({
  outsiderStyle:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '0.375rem',
    alignSelf: 'stretch',
  },
  companyName: {
    width: '20rem',
    display: 'flex',
    alignItems: 'center',
    paddingTop: '1rem',
    
  },
  requiredStar: {
    color: "#EB5757", 
  },
}));

export const Input = ({labelText,required}) => {
  // useStyles is now defined
  const classes = useStyles();

  return (
    <Box className={classes.outsiderStyle} >
      <Typography variant="h7" className={classes.companyName}>
        {labelText}
        {required==0 ? (
        <span variant="h7" className={classes.requiredStar}>
          *
        </span>
        ) :(<></>)
      }
      </Typography>
      <TextField variant="outlined" fullWidth sx={{gap:'1rem'}} />
    </Box>
  );
};

export default Input;
