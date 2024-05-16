import { palette } from './colors';

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
  bottom: '50%',
  right: 16,
  minWidth: '150px',
  backgroundColor: palette.common.white,
  boxShadow: 1,
  borderRadius: '4px',
};
export const filterCalander = {
  position: 'absolute',
  bottom: '35%',
  right: '16%',
  minWidth: '150px',
  backgroundColor: palette.common.white,
  boxShadow: 1,
  borderRadius: '4px',
};
