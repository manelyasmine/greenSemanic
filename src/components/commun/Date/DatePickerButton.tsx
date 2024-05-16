import React, { useState } from 'react';
import { CalanderIcon, FilterIcon } from '@/icons'; // Assuming CalanderIcon is an icon component

import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

import { MuiButton } from '@/styles/theme/components/button';

import { Button } from '../Button';

interface DatePickerButtonProps {
  // No need for Date prop as we manage state internally
}

const DatePickerButton: React.FC<DatePickerButtonProps> = () => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (newDate: Date | null) => {
    console.log('handle change date');
    setSelectedDate(newDate);
  };

  const handleButtonClick = () => {
    setIsDatePickerOpen(!isDatePickerOpen); // Toggle date picker visibility
  };

  return <div></div>;
};

export default DatePickerButton;
