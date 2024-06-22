import { SelectionBackground } from '@phosphor-icons/react/dist/ssr';
import { palette } from './colors';
import zIndex from '@mui/material/styles/zIndex';

export const Filter = {
  p: 2,
  display: 'flex',
  padding: 'var(--12, 12px) 16px',
  justifyContent: 'space-between',
  alignItems: 'center',
  alignSelf: 'stretch',
  gap: '8px',
  borderRadius: '12px',
  background: palette.common.white,
};
export const outlinedInput = {
  borderRadius: '6px',
  backgroundColor: 'var(--Grey-25, #F4F5F6)',
};

export const boxFilterDropDown = {
  position: 'absolute',
  /* bottom: '50%',
  right: 16, */
  right:'1rem',
  top:'-1rem',
  minWidth: '150px',
  backgroundColor: palette.common.white,
  boxShadow: 1,
  borderRadius: '4px',
  borderColor:"gray"
};
export const filterCalander = {
/*   position: 'absolute',
  bottom: '35%',
  right: '16%', */
  position:'fixed',
  minWidth: '150px',
   backgroundColor: palette.common.white,
  zIndex:20,
  boxShadow: 1,
  borderRadius: '4px',
 
};
