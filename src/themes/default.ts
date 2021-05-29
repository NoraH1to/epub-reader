import { createMuiTheme, ThemeOptions } from '@material-ui/core';
import { GlobalTheme } from 'types/typings';
import constant from '@/common/constant';

const mduiConfig: ThemeOptions = {
  breakpoints: {
    values: constant.responsive,
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
