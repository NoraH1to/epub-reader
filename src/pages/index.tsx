import { FC, useCallback, useContext } from 'react';
import { Button } from '@material-ui/core';
import ImportContactsRoundedIcon from '@material-ui/icons/ImportContactsRounded';
import FullscreenRoundedIcon from '@material-ui/icons/FullscreenRounded';
import FullscreenExitRoundedIcon from '@material-ui/icons/FullscreenExitRounded';
import EpubReader from '@/components/EpubReader';
import { EpubOpenFC, TabData } from 'types/typings';
import useChildren from '@/hooks/useChildren';
import DrawerContainer from '@/components/EpubReader/DrawerContainer';
import TabsPlus from '@/components/TabPlus';
import { useFullscreen } from 'ahooks';
import NavList from '@/components/NavList';
import './index.scss';
import { themeContext } from '@/wrapper/Theme';
import ThemeList from '@/components/ThemeList';

const OpenBook: EpubOpenFC = ({ useBook }) => (
  <div
    style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <input
      id="file"
      type="file"
      onChange={(e) => {
        e.target.files?.[0] && useBook(e.target.files[0]);
      }}
      style={{ display: 'none' }}
    />
    <img
      src={require('@/assets/empty.svg')}
      style={{ marginBottom: '32px', width: '50%', maxWidth: '300px' }}
    />
    <label htmlFor="file">
      <Button
        disableElevation
        variant="contained"
        color="primary"
        component="span"
        size="large"
        startIcon={<ImportContactsRoundedIcon style={{ marginRight: '8px' }} />}
      >
        打开图书
      </Button>
    </label>
  </div>
);

const FullscreenBtn: FC = () => {
  const [isFullscreen, { setFull, exitFull, toggleFull }] = useFullscreen(
    document.documentElement,
  );

  const btnFullscreenIcon = isFullscreen ? (
    <FullscreenExitRoundedIcon />
  ) : (
    <FullscreenRoundedIcon />
  );

  const btnFullscreenTitle = isFullscreen ? '退出全屏' : '全屏';
  return (
    <Button
      title={btnFullscreenTitle}
      size="large"
      onClick={() => toggleFull()}
    >
      {btnFullscreenIcon}
    </Button>
  );
};

const TabValues = {
  NAV: 0,
  THEMES: 1,
};

const index: FC = () => {
  const { currentTheme, setCurrentTheme } = useContext(themeContext);

  const tabDatas: TabData[] = [
    { label: '目录', value: TabValues.NAV, Panel: useCallback(NavList, []) },
    {
      label: '主题',
      value: TabValues.THEMES,
      Panel: ThemeList,
    },
  ];

  const Drawer = useChildren({
    Compnent: DrawerContainer,
    Children: (
      <>
        <TabsPlus
          tabDatas={tabDatas}
          defaultTab={TabValues.NAV}
          style={{ height: '60vh' }}
        />
        <div>
          <FullscreenBtn />
        </div>
      </>
    ),
  });

  return (
    <div className={`main ${currentTheme?.className}`}>
      <EpubReader OpenEpubComponent={OpenBook} SheetComponent={Drawer} />
    </div>
  );
};

export default index;
