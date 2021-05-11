import { FC } from 'react';
import { Button, Container } from '@material-ui/core';
import ImportContactsRoundedIcon from '@material-ui/icons/ImportContactsRounded';
import EpubReader from '@/components/EpubReader';
import { EpubOpenFC } from 'types/typings';

const OpenBook: EpubOpenFC = ({ useBook }) => (
  <div
    style={{
      height: '100vh',
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
  return (
    <Container maxWidth="md" style={{ padding: 0 }}>
      <EpubReader OpenEpubComponent={OpenBook} />
    </Container>
  );
};

export default index;
