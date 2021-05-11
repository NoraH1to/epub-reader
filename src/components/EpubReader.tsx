import { FC, useContext, useRef, useState } from 'react';
import './index.scss';
import useEpub from '@/hooks/useEpub';
import { Book } from 'epubjs';
import {
  Backdrop,
  Button,
  CircularProgress,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded';
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import DehazeRoundedIcon from '@material-ui/icons/DehazeRounded';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import {
  EpubActionTabData,
  EpubActionTabPanelFC,
  EpubReaderFC,
  ReaderContextContent,
} from 'types/typings';
import { useBoolean } from 'ahooks';
import SwipeableViews from 'react-swipeable-views';
import { ReaderContext } from '@/ReaderContext';

enum TabValues {
  NAV,
  SETTINGS,
}

const Nav: FC<ReaderContextContent> = ({
  book,
  actions,
  navigation,
  closeDrawer,
}) => (
  <List>
    {navigation?.toc?.map((item) => (
      <ListItem
        key={item.label}
        button
        onClick={() => {
          actions?.goto(item.href);
          closeDrawer?.();
        }}
      >
        <ListItemText>{item.label}</ListItemText>
      </ListItem>
    ))}
  </List>
);

const Settings: FC = () => {
  return <div>settings</div>;
};

const TabDatas: EpubActionTabData[] = [
  { label: '目录', value: TabValues.NAV, Panel: Nav },
];

const _Tabs: FC = () => {
  const [_value, setValue] = useState(TabValues.NAV);

  const context = useContext(ReaderContext);

  const TabPanel: EpubActionTabPanelFC = ({ value, children }) => {
    return <div hidden={value !== _value}>{children}</div>;
  };

  const result = (
    <div style={{ height: '60vh' }}>
      <Tabs
        value={_value}
        variant="scrollable"
        onChange={(e, newValue) => setValue(newValue)}
        scrollButtons="auto"
        indicatorColor="primary"
        textColor="primary"
        style={{
          position: 'sticky',
          bottom: 0,
          left: 0,
          width: '100%',
          zIndex: 10,
          background: 'white',
        }}
      >
        {TabDatas.map((tab) => (
          <Tab key={tab.value} label={tab.label} value={tab.value} />
        ))}
      </Tabs>
      <SwipeableViews
        index={_value}
        onChangeIndex={(value: any) => setValue(value)}
      >
        {TabDatas.map((tab) => (
          <TabPanel key={tab.value} value={tab.value}>
            <tab.Panel {...context} />
          </TabPanel>
        ))}
      </SwipeableViews>
      <Button fullWidth size="large">
        <ExpandMoreRoundedIcon />
      </Button>
    </div>
  );

  return result;
};

const EpubReader: EpubReaderFC = ({ OpenEpubComponent }) => {
  const [file, setFile] = useState<Book['Input'] | null>(null);
  const { book, navigation, loading, currentTitle } = useEpub({
    elId: 'epub',
    file,
    options: {
      flow: 'paginated',
      width: '100%',
      height: 'calc(100vh - 70px)',
      snap: true,
      manager: 'continuous',
    },
  });
  const [drawerVisible, drawerVisibleActions] = useBoolean(false);
  // 对 book 的操作保持原子性，不然会出 bug 无法翻页
  let changeAbleRef = useRef(true);
  const needFlag = (
    ref: React.MutableRefObject<any>,
    fn: () => Promise<any>,
  ) => {
    if (ref.current) {
      ref.current = false;
      return fn()?.finally(() => (ref.current = true));
    }
  };
  // 对书本的操作
  const actions = {
    next() {
      if (book) {
        needFlag(changeAbleRef, () => book.rendition?.next());
      }
    },
    prev() {
      if (book) {
        needFlag(changeAbleRef, () => book.rendition?.prev());
      }
    },
    goto(path: string) {
      if (book) {
        needFlag(changeAbleRef, () => book.rendition?.display(path));
      }
    },
    openMenu() {
      drawerVisibleActions.setTrue();
    },
  };

  const _Drawer = (
    <Drawer
      ModalProps={{
        keepMounted: true,
      }}
      open={drawerVisible}
      onClose={() => drawerVisibleActions.setFalse()}
      anchor={'bottom'}
    >
      <_Tabs />
    </Drawer>
  );
  window.book = book;
  if (!loading && !file) return <OpenEpubComponent useBook={setFile} />;
  return (
    <ReaderContext.Provider
      value={{
        book,
        navigation,
        actions,
        closeDrawer: () => drawerVisibleActions.setFalse(),
      }}
    >
      <div
        onClickCapture={(e) => {
          if (loading || !book) e.stopPropagation();
        }}
      >
        <div id="status" style={{ color: grey[500] }}>
          <Typography
            style={{
              flexGrow: 1,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              marginRight: '8px',
            }}
          >
            {currentTitle}
          </Typography>
          <Typography>{`${new Date().getHours()}:${new Date().getMinutes()}`}</Typography>
        </div>
        <div id="epub" />
        <div id="actions-container">
          <Container maxWidth="md" style={{ padding: 0 }}>
            <div id="actions">
              <Button
                onClickCapture={() => {
                  actions.prev();
                }}
                fullWidth
              >
                <ChevronLeftRoundedIcon />
              </Button>
              <Button
                onClickCapture={() => {
                  actions.openMenu();
                }}
              >
                <DehazeRoundedIcon />
              </Button>
              <Button
                onClickCapture={() => {
                  actions.next();
                }}
                fullWidth
              >
                <ChevronRightRoundedIcon />
              </Button>
            </div>
          </Container>
        </div>
        {_Drawer}
      </div>
      <Backdrop open={loading} style={{ zIndex: 10 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </ReaderContext.Provider>
  );
};

export default EpubReader;
