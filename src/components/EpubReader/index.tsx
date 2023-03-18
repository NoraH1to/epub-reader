import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import './index.scss';
import useEpub from '@/hooks/useEpub';
import { Book } from 'epubjs';
import {
  Backdrop,
  Button,
  ButtonBase,
  CircularProgress,
  Container,
  Typography,
} from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded';
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import {
  useBoolean,
  useControllableValue,
  useCreation,
  useResponsive,
  useUpdateEffect,
} from 'ahooks';
import { ReaderContext } from '@/ReaderContext';
import memo from 'memoize-one';
import useCurrentLocationInfo from '@/hooks/useCurrentLocationInfo';
import useActions from '@/hooks/useActions';
import { themeContext } from '@/wrapper/Theme';
import useReaderEvent from '@/hooks/useReaderEvent';
import constant from '@/common/constant';
import Drawer from '@/components/EpubReader/Drawer';
import StatusBar from './StatusBar';

export type EpubOpenFC = FC<{
  useBook: (file: Book['Input']) => void;
}>;
export type EpubReaderFC = FC<{
  OpenEpubComponent: EpubOpenFC;
  file?: Book['Input'];
}>;
const EpubReader: EpubReaderFC = (props) => {
  const { OpenEpubComponent, file: _file } = props;
  const { currentTheme } = useContext(themeContext);
  const [file, setFile] = useControllableValue<Book['Input'] | null>(props, {
    valuePropName: 'file',
    defaultValuePropName: 'file',
    defaultValue: null,
  });
  const { book, navigation, loading, setLoading } = useEpub({
    elId: 'epub',
    file,
    options: {
      flow: 'paginated',
      width: '100%',
      height: '100%',
      snap: false,
      manager: 'continuous',
      minSpreadWidth: 1281,
    },
    theme: currentTheme?.epub,
  });
  const currentLocationInfo = useCurrentLocationInfo(book);
  const [drawerVisible, drawerVisibleActions] = useBoolean(false);
  const { actions } = useActions(book);
  const openMenu = () => {
    drawerVisibleActions.setTrue();
  };

  const domRef = useRef<HTMLDivElement>(null);
  // 各种操作事件监听
  useReaderEvent({
    book,
    actions,
    drawerVisibleActions,
    domRef,
  });

  // 临时解决宽度过渡 lg 后 epubjs 的分页判断问题
  const responsive = useResponsive();
  useUpdateEffect(() => {
    file && setLoading(true);
  }, [responsive.lg]);
  useUpdateEffect(() => {
    ready &&
      currentLocationInfo.currentRealHref &&
      book.rendition.display(currentLocationInfo.currentRealHref);
  }, [loading]);

  const BtnPrev = useMemo(
    () => (
      <Button
        title="上一页"
        onClickCapture={() => {
          actions.prev();
        }}
        fullWidth
      >
        <ChevronLeftRoundedIcon />
      </Button>
    ),
    [],
  );
  const BtnNext = useMemo(
    () => (
      <Button
        title="下一页"
        onClickCapture={() => {
          actions.next();
        }}
        fullWidth
      >
        <ChevronRightRoundedIcon />
      </Button>
    ),
    [],
  );

  const ready = useMemo(() => !loading && book, [loading, book]);

  if (!loading && !file) return <OpenEpubComponent useBook={setFile} />;
  return (
    <ReaderContext.Provider
      value={{
        book,
        actions,
        drawerVisibleActions,
      }}
    >
      <div
        className="epub-reader"
        onClickCapture={(e) => {
          if (!ready || !book) e.stopPropagation();
        }}
        ref={domRef}
      >
        <ButtonBase title="菜单" component="div">
          <div
            id="status-container"
            style={{ color: grey[500] }}
            onClickCapture={() => openMenu()}
          >
            <StatusBar title={currentLocationInfo.currentTitle} />
          </div>
        </ButtonBase>
        <div id="epub-container">
          {responsive.lg && ready && BtnPrev}
          <Container maxWidth="lg" style={{ padding: 0, height: '100%' }}>
            <div
              id="epub"
              style={{ maxWidth: constant.responsive.lg - 64 * 2 }}
            />
          </Container>
          {responsive.lg && ready && BtnNext}
        </div>
        {!responsive.lg && (
          <div id="actions-container-bottom">
            <Container maxWidth="lg" style={{ padding: 0 }}>
              <div id="actions">
                {BtnPrev}
                {BtnNext}
              </div>
            </Container>
          </div>
        )}
        <Drawer
          visible={drawerVisible}
          onChange={(v) =>
            v ? drawerVisibleActions.setTrue() : drawerVisibleActions.setFalse()
          }
        />
      </div>
      <Backdrop open={loading} style={{ zIndex: 10 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </ReaderContext.Provider>
  );
};

export default EpubReader;
