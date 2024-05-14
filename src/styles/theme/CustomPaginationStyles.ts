import { styled } from '@mui/material/styles';
import { TablePagination } from '@mui/material';
import { Select, MenuItem, IconButton } from '@mui/material'; // Import additional components

const CustomPaginationStyles = styled(TablePagination)(({ theme }) => ({
  // Use existing Pagination styles from the theme
  ...theme.components.pagination,
  '&': {
    display: 'flex',
    justifyContent: 'center', // Center align pagination elements (optional)
  },
  '& .MuiTablePagination-spacer': {
    display: 'none', // Hide the default spacer element
  },
  '& .MuiTablePagination-menuItem.Mui-selected': {
    color: theme.palette.primary.main, // Highlight selected item
  },
  // Add any additional custom styles here (optional)
}));

export default CustomPaginationStyles;
