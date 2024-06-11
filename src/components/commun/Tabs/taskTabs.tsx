import React, { FC } from 'react';
import { useTheme } from '@mui/material';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { palette } from '@/styles/theme/colors';

interface TabOption {
  label: string;
  value: string;
}

interface CustomTabsProps {
  value: string;
  handleChange: (event: React.ChangeEvent<any>, value: string) => void;
}

const CustomTabs: FC<CustomTabsProps> = ({ value, handleChange,screen }) => {
/*   const tabOptions: TabOption[] = [
    { label: 'All Tasks', value: 'All Tasks' },
    { label: 'my Tasks', value: 'my Tasks' },
  ]; */
  const tabOptions = screen === 'target'
  ? [
    { label: 'Targets', value: 'Targets' },
    { label: 'Actions', value: 'Actions' },
    ]
  : [
    
    { label: 'All Tasks', value: 'All Tasks' },
    { label: 'My Tasks', value: 'My Tasks' },
    ];
  const theme = useTheme();

  const styles = {
    tabs: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '1rem',
      alignSelf: 'stretch',
    },
    tab: {
      padding: '0rem 0.25rem 0.625rem 0.25rem',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '0.5',
      /* '&:first-child': {
        borderTopLeftRadius: '5px',
        borderBottomLeftRadius: '5px',
      },
      '&:last-child': {
        borderTopRightRadius: '5px',
        borderBottomRightRadius: '5px',
      },
      '&.MuiButtonBase-root': {
        margin: 0,
      }, */
      '&.Mui-selected': {
        color: 'var(--Green-green-500, #16B364)',
        fontFeatureSettings: '"cv04" on, "cv03" on, "cv02" on, "cv11" on, "clig" off, "liga" off',

        /* Body/B2 */
        fontFamily: 'Mulish',
        fontSize: '1rem',
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: '1.5' /* 1.5rem */,
        borderBottom: '2px solid var(--Green-green-500, #16B364)',
      },
    },
  };

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      aria-label="tabs"
      sx={styles.tabs}
      TabIndicatorProps={{
        style: {
          backgroundColor: 'transparent',
        },
      }}
    >
      {tabOptions.map((option) => (
        <Tab key={option.value} label={option.label} value={option.value} sx={styles.tab} />
      ))}
    </Tabs>
  );
};

export default CustomTabs;
