import type { TypographyOptions } from '@mui/material/styles/createTypography';

export const typography = {
  fontFamily: ' Mulish',
  body1: { fontSize: '1rem', fontStyle: 'normal', fontWeight: 500, lineHeight: 1.5 },
  body2: { fontSize: '0.875rem', fontWeight: 400, lineHeight: 1.57 },
  body3: { fontSize: '0.875rem',fontStyle: 'normal',fontWeight: 500,lineHeight: 1.5},
  bodyB2: { fontSize: '1rem',fontStyle: 'normal',fontWeight: 700,lineHeight: 1.5},
  

  button: { fontWeight: 500 },
  caption: { fontSize: '0.75rem', fontWeight: 400, lineHeight: 1.66 },
  subtitle1: { fontSize: '1rem', fontWeight: 500, lineHeight: 1.57 },
  subtitle2: { fontSize: '0.875rem', fontWeight: 500, lineHeight: 1.57 },
  subtitle3:{
    color: 'var(--Foundation-Grey-grey-500, #1A1C20)',
 
    fontSize: '0.875rem',
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: 1.5,
letterSpacing: '-0.0125rem',
  },
  overline: {
    fontSize: '0.75rem',
    fontWeight: 500,
    letterSpacing: '0.03125rem',
    lineHeight: 2.5,
    textTransform: 'uppercase',
  },
  help:{
  color: 'var(--Green-green-500, #16B364)',
  fontFamily: 'Roboto',
  fontSize: '0.875rem',
  fontStyle: 'normal',
  fontWeight: '500',
  lineHeight: '1.25rem', /* 142.857% */
  letterSpacing: '0.00625rem',
  },

  h1: { fontSize: '3.5rem', fontWeight: 500, lineHeight: 1.2 },
  h2: { fontSize: '3rem', fontWeight: 500, lineHeight: 1.2 },
  h3: { fontSize: '2rem', fontWeight: 700, lineHeight: 1.25, fontStyle: 'normal' },
  h4: { fontSize: '1.71rem', fontWeight: 700, lineHeight: 1.2,fontStyle: 'normal' },
  h5: { fontSize: '1.25rem', fontWeight: 700, lineHeight: 1.2,fontStyle: 'normal' },
  h6: { fontSize: '1.125rem', fontWeight: 500, lineHeight: 1.2 },
  h7: {fontSize:'0.875rem',fontStyle: 'normal',fontWeight: 600,lineHeight: 1.5,letterSpacing:'-0.0125rem'}

   
} satisfies TypographyOptions;
