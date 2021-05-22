import { useContext, useEffect, useMemo, useRef, useState } from 'react';
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
import { EpubReaderFC, EpubReaderStatusBarFC } from 'types/typings';
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
import constant from '@/constant';

const EpubReaderStatusBar: EpubReaderStatusBarFC = ({ title }) => {
  const getTime = () =>
    `${new Date()
      .getHours()
      .toString()
      .padStart(2, '0')}:${new Date()
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
  const [timeStr, setTimeStr] = useState(getTime());
  const setTime = memo((time: string) => {
    setTimeStr(time);
  });
  const timeTimerRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (timeTimerRef.current !== null) clearInterval(timeTimerRef.current);
    timeTimerRef.current = setInterval(() => setTime(getTime()), 1000);
    return () => {
      timeTimerRef.current !== null && clearInterval(timeTimerRef.current);
    };
  }, []);
  return (
    <>
      <Typography
        style={{
          flexGrow: 1,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          marginRight: '8px',
        }}
      >
        {title}
      </Typography>
      <Typography>{timeStr}</Typography>
    </>
  );
};

const EpubReader: EpubReaderFC = (props) => {
  const { OpenEpubComponent, SheetComponent, file: _file } = props;
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

  const closeDrawer = useCreation(
    () => () => ready && drawerVisibleActions.setFalse(),
    [],
  );

  const domRef = useRef<HTMLDivElement>(null);
  // 各种操作事件监听
  useReaderEvent({
    book,
    actions,
    drawerVisibleActions,
    domRef,
  });

  // 临时解决宽度超过 lg 后 epubjs 的分页判断问题
  const responsive = useResponsive();
  useEffect(() => {
    responsive.lg && file && setLoading(true);
  }, [responsive]);
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

  window.book = book;
  if (!loading && !file) return <OpenEpubComponent useBook={setFile} />;
  return (
    <ReaderContext.Provider
      value={{
        book,
        actions,
        closeDrawer,
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
            <EpubReaderStatusBar title={currentLocationInfo.currentTitle} />
          </div>
        </ButtonBase>
        <div id="epub-container">
          {responsive.lg && ready && BtnPrev}
          <Container maxWidth="lg" style={{ padding: 0, height: '100%' }}>
            <div id="epub" />
          </Container>
          {responsive.lg && ready && BtnNext}
        </div>
        {!responsive.lg && ready && (
          <div id="actions-container-bottom">
            <Container maxWidth="lg" style={{ padding: 0 }}>
              <div id="actions">
                {BtnPrev}
                {BtnNext}
              </div>
            </Container>
          </div>
        )}
        <SheetComponent
          visible={drawerVisible}
          onChange={(value) => drawerVisibleActions.toggle()}
        />
      </div>
      <Backdrop open={loading} style={{ zIndex: 10 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </ReaderContext.Provider>
  );
};

export default EpubReader;
