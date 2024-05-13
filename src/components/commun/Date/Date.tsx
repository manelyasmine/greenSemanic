import * as React from 'react';
/* import { CalanderIcon } from '@/icons'; */
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
/* import { DatePicker } from '@mui/x-date-pickers/DatePicker'; */
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import DatePickerButton from './DatePickerButton';

/* import { MuiButton } from '@/styles/theme/components/button';

import { Button } from '../Button'; */

export default function BasicDatePicker() {
  return <DatePickerButton />;
}
