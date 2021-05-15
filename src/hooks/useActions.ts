import { useCallback, useMemo, useRef } from 'react';
import { Book } from 'epubjs';

const useActions = (book: Book) => {
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
  // 对书本的操作
  const actions = useMemo(
    () => ({
      next() {
        if (book.rendition) {
          needFlag(changeAbleRef, () => book.rendition?.next());
        }
      },
      prev() {
        if (book.rendition) {
          needFlag(changeAbleRef, () => book.rendition?.prev());
        }
      },
      goto(path: string) {
        if (book.rendition) {
          needFlag(changeAbleRef, () => book.rendition?.display(path));
        }
      },
    }),
    [book.rendition],
  );

  return { actions };
};

export default useActions;
