import { FC, useContext } from 'react';
import { ThemeProvider } from '@material-ui/core';
import { themeContext } from './Theme';

const MdUI: FC = ({ children }) => {
  const { currentTheme } = useContext(themeContext);
  return (
    <ThemeProvider theme={currentTheme?.mdui || {}}>{children}</ThemeProvider>
  );
};

export default MdUI;
