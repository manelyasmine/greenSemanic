import React from 'react';
import { Pagination as MuiPagination, PaginationProps as MuiPaginationProps, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

import { palette } from '@/styles/theme/colors';

export type PaginationProps = MuiPaginationProps & {
  children?: React.ReactNode;
  paginatioType?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'gray'
    | 'primaryLight'
    | 'secondaryGray'
    | 'dashBorder'
    | 'link'
    | 'standard';
  size?: 'small' | 'medium' | 'large';
};

const StyledPagination = styled(MuiPagination, {
  shouldForwardProp: (prop) => prop !== 'paginatioType',
})<PaginationProps>(({ paginatioType }) => {
  let backgroundColor, color, borderColor, border, boxShadow;
  let borderRadius = '6px';
  let padding = '6px 12px';
  let justifyContent = 'center';
  let alignItems = 'center';

  switch (paginatioType) {
    case 'gray':
      //backgroundColor = palette.primary[500];
      //color = palette.common.white;
      boxShadow = 'none';
      border = '2px';
      break;
    // case 'secondary':
    //   backgroundColor = palette.common.white;
    //   //color = palette.primary[500];
    //   border = `1px solid ${palette.primary[400]}`;

    //   break;
    // case 'tertiary':
    //   backgroundColor = palette.common.white;
    //   //color = palette.gray[600];
    //   break;
    // case 'primaryLight':
    //   backgroundColor = palette.primary[50];
    //   //color = palette.primary[500];
    //   break;
    // case 'secondaryGray':
    //   backgroundColor = palette.common.white;
    //   //color = palette.gray[600];
    //   borderRadius = '8px';
    //   boxShadow = '0px 1px 2px 0px rgba(16, 24, 40, 0.05)';
    //   border= '1px solid var(--Grey-grey-200, #B3B8C2)';

    //   break;
    // case 'dashBorder':
    //   backgroundColor = 'transparent';
    //   //color = palette.gray[600];
    //   borderColor = palette.gray[300];
    //   break;
    // case 'link':
    //   backgroundColor = 'transparent';
    //   //color = palette.gray[600];
    //   break;
    // default:
    //   backgroundColor = 'inherit';
    //   //color = 'inherit';
  }

  return {
    backgroundColor,
    //color,
    borderColor,
    border,
    borderRadius,
    padding,
    justifyContent,
    alignItems,
    boxShadow,
    '& .MuiPaginationItem-root': {
      '&.Mui-selected': {
        backgroundColor: paginatioType == 'gray' ? palette.gray[800] : palette.common.white,
        color: paginatioType == 'gray' ? palette.common.white : palette.gray[500],
        '&:hover': {
          backgroundColor: paginatioType === 'gray' ? `${palette.gray[500]}cc` : `${palette.common.white}cc`,
        },
      },
    },
  };
});

export const Pagination: React.FC<PaginationProps> = ({ children, paginatioType = 'primary', ...props }) => {
  return (
    <Stack  sx={{ border: '1px solid #ddd', borderRadius:1 }} m={1}>
      <StyledPagination paginatioType={paginatioType} {...props} />
    </Stack>
  );
};
