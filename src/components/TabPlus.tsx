import { CSSProperties, FC, useState } from 'react';
import { Tab, Tabs } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import { TabData } from './EpubReader/Drawer';

export type TabPanelFC = FC<{ value: any }>;

const TabsPlus: FC<{
  tabData: TabData[];
  defaultTab: any;
  style?: CSSProperties;
}> = ({ tabData, defaultTab, style }) => {
  const [_value, setValue] = useState(defaultTab);

  const TabPanel: TabPanelFC = ({ value, children }) => {
    return <div hidden={value !== _value}>{children}</div>;
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        ...style,
      }}
    >
      <header>
        <Tabs
          value={_value}
          variant="scrollable"
          onChange={(e, newValue) => {
            setValue(newValue);
          }}
          scrollButtons="auto"
          indicatorColor="primary"
          textColor="primary"
          style={{
            position: 'sticky',
            bottom: 0,
            left: 0,
            width: '100%',
            zIndex: 10,
          }}
        >
          {tabData.map((tab) => (
            <Tab key={tab.value} label={tab.label} value={tab.value} />
          ))}
        </Tabs>
      </header>
      <SwipeableViews
        index={_value}
        onChangeIndex={(value: any) => {
          setValue(value);
        }}
        style={{ height: '100%' }}
      >
        {tabData.map((tab) => (
          <TabPanel key={tab.value} value={tab.value}>
            <tab.Panel />
          </TabPanel>
        ))}
      </SwipeableViews>
    </div>
  );
};

export default TabsPlus;
