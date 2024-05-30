export const header = {
  display: 'flex',
  padding: '1.5rem',
  justifyContent: 'space-between',
  alignItems: 'center',
  alignSelf: 'stretch',
  borderBottom: '1px solid #DBDBDB',
};

export const body = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '2rem',
  flexShrink: 0,
  width: '709px', // Default width for larger screens
  height: '586px', // Default height
  '@media (max-width: 1024px)': {
    width: '80%', // Adjust width as needed for medium screens
  },
  '@media (max-width: 768px)': {
    width: '100%', // Ensure full width on small screens
  },
};

export const HeaderBody = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '0.5rem',
  alignSelf: 'stretch',
  '@media (max-width: 1024px)': {
    width: '80%', // Adjust width as needed for medium screens
  },
  '@media (max-width: 768px)': {
    width: '100%', // Ensure full width on small screens
  },
};

export const FooterBody = {
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'flex-start',
  gap: 'var(--12, 0.75rem)',
  alignSelf: 'stretch',
  '@media (max-width: 1024px)': {
    width: '80%', // Adjust width as needed for medium screens
  },
  '@media (max-width: 768px)': {
    width: '100%', // Ensure full width on small screens
  },
};
export const FooterBox = {
  display: 'flex',
  height: '5.875rem',
  padding: '1.6875rem 1.5rem',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  flexZhrink: 0,
  alignSelf: 'stretch',
  '@media (max-width: 1024px)': {
    width: '80%', // Adjust width as needed for medium screens
  },
  '@media (max-width: 768px)': {
    width: '100%', // Ensure full width on small screens
  },
};
