import { FC, useCallback, useContext } from 'react';
import { Button } from '@material-ui/core';
import ImportContactsRoundedIcon from '@material-ui/icons/ImportContactsRounded';
import EpubReader from '@/components/EpubReader';
import { EpubOpenFC, TabData } from 'types/typings';
import useChildren from '@/hooks/useChildren';
import DrawerContainer from '@/components/EpubReader/DrawerContainer';
import TabsPlus from '@/components/TabPlus';
import NavList from '@/components/NavList';
import './index.scss';
import { themeContext } from '@/wrapper/Theme';
import ThemeList from '@/components/ThemeList';
import { configResponsive } from 'ahooks';
import constant from '@/constant';

configResponsive(constant.responsive);

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
      <TabsPlus
        tabDatas={tabDatas}
        defaultTab={TabValues.NAV}
        style={{ height: '60vh' }}
      />
    ),
  });

  return (
    <div className={`main ${currentTheme?.className}`}>
      <EpubReader OpenEpubComponent={OpenBook} SheetComponent={Drawer} />
    </div>
  );
};

export default index;
