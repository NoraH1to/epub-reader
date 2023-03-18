import { FC, useContext } from 'react';
import { Button } from '@material-ui/core';
import ImportContactsRoundedIcon from '@material-ui/icons/ImportContactsRounded';
import EpubReader, { EpubOpenFC } from '@/components/EpubReader';
import './index.scss';
import { themeContext } from '@/wrapper/Theme';
import { configResponsive } from 'ahooks';
import constant from '@/common/constant';

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

const index: FC = () => {
  const { currentTheme, setCurrentTheme } = useContext(themeContext);

  return (
    <div className={`main ${currentTheme?.className}`}>
      <EpubReader OpenEpubComponent={OpenBook} />
    </div>
  );
};

export default index;
