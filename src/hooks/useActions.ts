import { useCallback, useRef } from 'react';
import { Book } from 'epubjs';
import { useDebounceFn } from 'ahooks';
import { UseActions } from 'types/typings';

const useActions: UseActions = (book: Book) => {
  // 对 book 的操作保持原子性，不然会出 bug 无法翻页
  let changeAbleRef = useRef(true);
  const needFlag = useCallback(
    (ref: React.MutableRefObject<any>, fn: () => Promise<any>) => {
      if (ref.current) {
        ref.current = false;
        return fn()?.finally(() => (ref.current = true));
      }
    },
    [],
  );
  const waitTime = 100;
  // 对书本的操作
  const actions = {
    next: useDebounceFn(
      () => {
        if (book.rendition) {
          needFlag(changeAbleRef, () => book.rendition?.next());
        }
      },
      {
        wait: waitTime,
      },
    ).run,
    prev: useDebounceFn(
      () => {
        if (book.rendition) {
          needFlag(changeAbleRef, () => book.rendition?.prev());
        }
      },
      {
        wait: waitTime,
      },
    ).run,
    goto: useDebounceFn(
      (path: string) => {
        if (book.rendition) {
          needFlag(changeAbleRef, () => book.rendition?.display(path));
        }
      },
      {
        wait: waitTime,
      },
    ).run,
  };

  return { actions };
};

export default useActions;
