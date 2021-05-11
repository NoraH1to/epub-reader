import { FC } from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';

const MdUI: FC = ({ children }) => {
  return (
    <ThemeProvider
      theme={createMuiTheme({
        palette: {
          // primary: {
          //   light: '#ffffff',
          //   main: '#fafafa',
          //   dark: '#c7c7c7',
          //   contrastText: '#4fc3f7',
          // },
          // secondary: {
          //   light: '#ffffff',
          //   main: '#fafafa',
          //   dark: '#c7c7c7',
          //   contrastText: '#4fc3f7',
          // },
        },
        breakpoints: {
          values: {
            xs: 0,
            sm: 400,
            md: 750,
            lg: 1280,
            xl: 1920,
          },
        },
      })}
    >
      {children}
    </ThemeProvider>
  );
};

export default MdUI;
