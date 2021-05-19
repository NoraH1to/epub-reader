import { useKeyPress } from 'ahooks';
import { useEffect } from 'react';
import { UseReaderEvent } from 'types/typings';

const useReaderEvent: UseReaderEvent = ({
  book,
  actions,
  drawerVisibleActions,
  domRef,
}) => {
  const setIframeEvent = <K extends keyof DocumentEventMap>(
    type: K,
    listener: (this: Document, ev: DocumentEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions | undefined,
  ) => {
    const iframeList = document.getElementsByTagName('iframe');
    for (let i = 0; i < iframeList.length; i++) {
      iframeList[i].contentWindow?.document.addEventListener(
        type,
        listener,
        options,
      );
    }
  };

  // 空格、回车
  const toggleDrawKeys = [32, 13];
  // pageDown、arrowDown、arrowRight
  const nextKeys = [34, 39, 40];
  // pageUp、arrowUp、arrowLeft
  const prevKeys = [33, 38, 37];
  useKeyPress(
    toggleDrawKeys,
    () => drawerVisibleActions && drawerVisibleActions.toggle(),
  );
  useKeyPress(nextKeys, () => actions.next());
  useKeyPress(prevKeys, () => actions.prev());
  useEffect(() => {
    if (domRef.current) {
      domRef.current.onwheel = (e) =>
        e.wheelDelta < 0 ? actions.next() : actions.prev();
    }
  }, [domRef.current]);
  useEffect(() => {
    if (book.rendition && book.isOpen) {
      book.rendition.on('locationChanged', () => {
        // 设置滚动翻页事件
        setIframeEvent('wheel', (e) => {
          e.wheelDelta < 0 ? actions.next() : actions.prev();
        });
        setIframeEvent(
          'keydown',
          (e) => nextKeys.find((key) => key === e.keyCode) && actions.next(),
        );
        setIframeEvent(
          'keydown',
          (e) => prevKeys.find((key) => key === e.keyCode) && actions.prev(),
        );
        drawerVisibleActions &&
          setIframeEvent(
            'keydown',
            (e) =>
              toggleDrawKeys.find((key) => key === e.keyCode) &&
              drawerVisibleActions.toggle(),
          );
      });
    }
  }, [book.rendition]);
};

export default useReaderEvent;
