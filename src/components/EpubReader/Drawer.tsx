import { Button, Drawer as MdDrawer } from '@material-ui/core';
import { useControllableValue } from 'ahooks';
import { FC, ReactElement, useCallback } from 'react';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import NavList from '@/components/NavList';
import ThemeList from '@/components/ThemeList';
import TabsPlus from '@/components/TabPlus';

export interface TabData {
  label?: string;
  value: any;
  Panel: FC<any>;
  icon?: ReactElement;
}

const Drawer: FC<{
  visible?: boolean;
  onChange?: (value: boolean) => void;
}> = (props) => {
  const [visible, setVisible] = useControllableValue<boolean>(props, {
    valuePropName: 'visible',
    defaultValuePropName: 'visible',
    defaultValue: false,
  });
  const TabValues = {
    NAV: 0,
    THEMES: 1,
  };

  const tabData: TabData[] = [
    { label: '目录', value: TabValues.NAV, Panel: useCallback(NavList, []) },
    {
      label: '主题',
      value: TabValues.THEMES,
      Panel: ThemeList,
    },
  ];
  return (
    <MdDrawer
      ModalProps={{
        keepMounted: true,
      }}
      open={visible}
      onClose={() => setVisible(false)}
      anchor={'bottom'}
    >
      <TabsPlus
        tabData={tabData}
        defaultTab={TabValues.NAV}
        style={{ height: '60vh' }}
      />
      <Button
        title="关闭菜单"
        fullWidth
        size="large"
        onClick={() => setVisible(false)}
      >
        <ExpandMoreRoundedIcon />
      </Button>
    </MdDrawer>
  );
};

export default Drawer;
