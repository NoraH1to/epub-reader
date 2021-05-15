import { ReaderContext } from '@/ReaderContext';
import themes from '@/themes';
import { themeContext } from '@/wrapper/Theme';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { FC, useContext } from 'react';

const ThemeList: FC = () => {
  const { currentTheme, setCurrentTheme } = useContext(themeContext);
  const { actions, closeDrawer, book } = useContext(ReaderContext);

  return (
    <List>
      {Object.entries(themes).map(([index, theme]) => (
        <ListItem
          button
          key={index}
          selected={index === currentTheme?.name}
          onClick={() => {
            closeDrawer && closeDrawer();
            setCurrentTheme && setCurrentTheme(theme);
          }}
        >
          <ListItemText>{theme.label}</ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

export default ThemeList;
