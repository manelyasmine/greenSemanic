import type { ColorSystemOptions } from '@mui/material/styles';

import { palette } from './colors';
import type { ColorScheme } from './types';

export const colorSchemes: Partial<Record<ColorScheme, ColorSystemOptions>> = {
  // dark: {
  //   palette: {
  //     action: { disabledBackground: 'rgba(0, 0, 0, 0.12)' },
  //     background: {
  //       default: gray[900],
  //       defaultChannel: '9 10 11',
  //       paper: gray[900],
  //       level1: gray[800],
  //       level2: gray[700],
  //       level3: gray[600],
  //     },
  //     common: { black: common.black, white: common.white },
  //     divider: gray[700],
  //     dividerChannel: '50 56 62',
  //     error: {
  //       ...danger,
  //       light: danger[300],
  //       main: danger[500],
  //       dark: danger[500],
  //       contrastText: common.white,
  //     },
  //     info: {
  //       ...info,
  //       light: info[300],
  //       main: info[300],
  //       dark: info[500],
  //       contrastText: common.white,
  //     },
  //     neutral: { ...gray },
  //     primary: {
  //       ...primary,
  //       light: primary[300],
  //       main: primary[400],
  //       dark: primary[500],
  //       contrastText: common.black,
  //     },
  //     secondary: {
  //       ...gray,
  //       light: gray[100],
  //       main: gray[200],
  //       dark: gray[300],
  //       contrastText: common.black,
  //     },
  //     success: {
  //       ...success,
  //       light: success[300],
  //       main: success[300],
  //       dark: success[500],
  //       contrastText: common.black,
  //     },
  //     text: {
  //       primary: gray[100],
  //       primaryChannel: '240 244 248',
  //       secondary: gray[400],
  //       secondaryChannel: '159 166 173',
  //       disabled: gray[600],
  //     },
  //     warning: {
  //       ...warning,
  //       light: warning[300],
  //       main: warning[300],
  //       dark: warning[500],
  //       contrastText: common.black,
  //     },
  //   },
  // },
  // light: {
  //   palette: {
  //     action: { disabledBackground: 'rgba(0, 0, 0, 0.06)' },
  //     background: {
  //       default: common.white,
  //       defaultChannel: '255 255 255',
  //       paper: common.white,
  //       level1: gray[50],
  //       level2: gray[100],
  //       level3: gray[200],
  //     },
  //     common: { black: common.black, white: common.white },
  //     divider: gray[200],
  //     dividerChannel: '220 223 228',
  //     error: {
  //       ...danger,
  //       main: danger[500],
  //       contrastText: common.white,
  //     },
  //     info: {
  //       ...info,
  //       contrastText: common.white,
  //     },
  //     neutral: { ...gray },
  //     primary: {
  //       ...primary,
  //       light: primary[400],
  //       main: primary[500],
  //       dark: primary[600],
  //       contrastText: common.white,
  //     },
  //     secondary: {
  //       ...gray,
  //       light: gray[600],
  //       main: gray[700],
  //       dark: gray[800],
  //       contrastText: common.white,
  //     },
  //     success: {
  //       ...success,
  //       main: success[500],
  //       contrastText: common.white,
  //     },
  //     text: {
  //       primary: gray[900],
  //       primaryChannel: '33 38 54',
  //       secondary: gray[500],
  //       secondaryChannel: '102 112 133',
  //       disabled: gray[400],
  //     },
  //     warning: {
  //       ...warning,
  //       light: warning[100],
  //       main: warning[300],
  //       dark: warning[500],
  //       contrastText: common.white,
  //     },
  //   },
  // },
};
