import { createContext, FC, useState } from 'react';
import themes from '@/themes';
import { ThemeContextContent } from 'types/typings';

export const themeContext = createContext<ThemeContextContent>({});

const Theme: FC = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(themes.default);
  return (
    <themeContext.Provider value={{ currentTheme, setCurrentTheme }}>
      {children}
    </themeContext.Provider>
  );
};

export default Theme;
