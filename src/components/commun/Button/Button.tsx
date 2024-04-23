import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

import { palette } from '@/styles/theme/colors';

export type ButtonProps = MuiButtonProps & {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  btnType?: 'primary' | 'secondary' | 'tertiary' | 'primaryLight' | 'secondaryGray' | 'dashBorder' | 'link';
  size?: 'small' | 'medium' | 'large';
};

const StyledButton = styled(MuiButton, {
  shouldForwardProp: (prop) => prop !== 'btnType',
})<ButtonProps>(({ btnType }) => {
  let backgroundColor, color, borderColor, border, boxShadow;
  let borderRadius = '6px';
  let padding = '6px 12px';
  let justifyContent = 'center';
  let alignItems = 'center';

  switch (btnType) {
    case 'primary':
      backgroundColor = palette.primary[500];
      color = palette.common.white;
      boxShadow = 'none';
      break;
    case 'secondary':
      backgroundColor = palette.common.white;
      color = palette.primary[500];
      border = `1px solid ${palette.primary[400]}`;
      break;
    case 'tertiary':
      backgroundColor = palette.common.white;
      color = palette.gray[600];
      break;
    case 'primaryLight':
      backgroundColor = palette.primary[50];
      color = palette.primary[500];
      break;
    case 'secondaryGray':
      backgroundColor = palette.common.white;
      color = palette.gray[600];
      break;
    case 'dashBorder':
      backgroundColor = 'transparent';
      color = palette.gray[600];
      borderColor = palette.gray[300];
      break;
    case 'link':
      backgroundColor = 'transparent';
      color = palette.gray[600];
      break;
    default:
      backgroundColor = 'inherit';
      color = 'inherit';
  }

  return {
    backgroundColor,
    color,
    borderColor,
    border,
    borderRadius,
    padding,
    justifyContent,
    alignItems,
    boxShadow,
    '&:hover': {
      backgroundColor: btnType === 'link' ? 'transparent' : `${backgroundColor}80`,
    },
    '&:focus': {
      boxShadow: btnType === 'primary' ? '0px 1px 2px 0px #E8EDFF, 0px 0px 0px 3px #E8EDFF' : 'none',
    },
    '&:disabled': {
      backgroundColor: btnType === 'primary' ? palette.gray[100] : 'inherit',
      color: btnType === 'primary' ? palette.gray[400] : 'inherit',
    },
  };
});

export const Button: React.FC<ButtonProps> = ({ children, btnType = 'primary', type = 'button', ...props }) => {
  return (
    <StyledButton btnType={btnType} type={type} {...props}>
      {children}
    </StyledButton>
  );
};
