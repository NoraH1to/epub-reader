import { CSSProperties, FC, useState } from 'react';
import { Tab, Tabs } from '@material-ui/core';
import { TabData, TabPanelFC } from 'types/typings';
import SwipeableViews from 'react-swipeable-views';

const TabsPlus: FC<{
  tabDatas: TabData[];
  defaultTab: any;
  style?: CSSProperties;
}> = ({ tabDatas, defaultTab, style }) => {
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
          {tabDatas.map((tab) => (
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
        {tabDatas.map((tab) => (
          <TabPanel key={tab.value} value={tab.value}>
            <tab.Panel />
          </TabPanel>
        ))}
      </SwipeableViews>
    </div>
  );
};

export default TabsPlus;
