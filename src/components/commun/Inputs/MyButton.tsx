import * as React from 'react';
import { Button, IconButton } from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import RefreshIcon from '@mui/icons-material/Refresh';

import {GreneIcon,CameraIcon} from '@/icons';
interface ButtonProps {
  variant?: 'contained' | 'outlined' | 'text'; // Optional for customizing variant
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'; // Optional for customizing color
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>; // Optional click handler
  children?: React.ReactNode; // Optional content for text-based buttons
  icon?: React.ReactElement; // Optional icon component for icon-only buttons
  leadingIcon?: React.ReactElement; // Optional leading icon
  trailingIcon?: React.ReactElement; // Optional trailing icon
  swapIcon?: string; // Optional key to swap leading/trailing icon based on state
  state?: 'default' | 'hover' | 'focused' | 'pressed' | 'disabled' | 'active'; // Optional state for styling adjustments
}

const MyButton = ({
  variant = 'text',
  color = 'secondary',
  disabled = false,
  onClick,
  children,
  icon,
  leadingIcon,
  trailingIcon,
  swapIcon,
  state = 'default',
}: ButtonProps) => {
  const [internalState, setInternalState] = React.useState(state);

  const handleIconSwap = () => {
    setInternalState((prevState) => (prevState === 'default' ? 'active' : 'default'));
  };

  const getIcon = () => {
    if (icon) {
      return icon;
    }

    if (leadingIcon && internalState === 'default') {
      return leadingIcon;
    }

    if (trailingIcon && internalState === 'active') {
      return trailingIcon;
    }

    return null;
  };

  return (
    <>
      {children && (
        <Button
          variant={variant}
          color={color}
          disabled={disabled}
          onClick={onClick}
          size="small"
          {...(state !== 'default' && { sx: { [`& MuiButton-root.${state}`]: { /* State-specific styles */ } } })}
        >
          {children}
        </Button>
      )}
      {!children && icon && (
        <IconButton size="small" color={color} disabled={disabled} onClick={onClick}>
          {getIcon()}
        </IconButton>
      )}
    </>
  );
};

export default MyButton;
