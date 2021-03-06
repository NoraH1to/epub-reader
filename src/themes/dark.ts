import constant from '@/common/constant';
import { createMuiTheme, ThemeOptions } from '@material-ui/core';
import { GlobalTheme } from 'types/typings';

const fontColor = '#999999 !important';

const mduiConfig: ThemeOptions = {
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    type: 'dark',
  },
  breakpoints: {
    values: constant.responsive,
  },
};

const theme: GlobalTheme = {
  name: 'dark',
  label: '夜间',
  className: 'darkTheme',
  mduiConfig,
  mdui: createMuiTheme(mduiConfig),
  epub: {
    body: {
      background: '#424242 !important',
      color: fontColor,
    },
    a: {
      color: fontColor,
    },
    p: {
      color: fontColor,
    },
    h1: {
      color: fontColor,
    },
    h2: {
      color: fontColor,
    },
    h3: {
      color: fontColor,
    },
    h4: {
      color: fontColor,
    },
    h5: {
      color: fontColor,
    },
  },
};

export default theme;
