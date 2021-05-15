import { Button, Drawer } from '@material-ui/core';
import { useControllableValue } from 'ahooks';
import { FC } from 'react';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';

const DrawerContainer: FC<{
  visible?: boolean;
  onChange?: (value: boolean) => void;
}> = (props) => {
  const [visible, setVisible] = useControllableValue<boolean>(props, {
    valuePropName: 'visible',
    defaultValuePropName: 'visible',
    defaultValue: false,
  });
  return (
    <Drawer
      ModalProps={{
        keepMounted: true,
      }}
      open={visible}
      onClose={() => setVisible(false)}
      anchor={'bottom'}
    >
      {props.children}
      <Button
        title="关闭菜单"
        fullWidth
        size="large"
        onClick={() => setVisible(false)}
      >
        <ExpandMoreRoundedIcon />
      </Button>
    </Drawer>
  );
};

export default DrawerContainer;
