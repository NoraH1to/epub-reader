import { createMuiTheme, ThemeOptions } from '@material-ui/core';
import { GlobalTheme } from 'types/typings';

const mduiConfig: ThemeOptions = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 400,
      md: 800,
      lg: 1280,
      xl: 1920,
    },
  },
};

const theme: GlobalTheme = {
  name: 'default',
  label: '默认',
  className: '',
  mduiConfig,
  mdui: createMuiTheme(mduiConfig),
  epub: {},
};

export default theme;
