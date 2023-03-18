import useCurrentLocationInfo from '@/hooks/useCurrentLocationInfo';
import { ReaderContext } from '@/ReaderContext';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { FC, useContext } from 'react';

const NavList: FC = () => {
  const { actions, drawerVisibleActions, book } = useContext(ReaderContext);
  const { currentRealHref } = useCurrentLocationInfo(book);

  return (
    <List>
      {book?.navigation?.toc?.map((item) => (
        <ListItem
          selected={currentRealHref === item.href}
          key={item.id}
          button
          onClick={() => {
            actions?.goto(item.href);
            drawerVisibleActions?.setFalse();
          }}
        >
          <ListItemText>{item.label}</ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

export default NavList;
