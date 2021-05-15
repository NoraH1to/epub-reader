import { Book } from 'epubjs';
import memoizeOne from 'memoize-one';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { UseCurrentLocationInfo } from 'types/typings';

const useCurrentLocationInfo: UseCurrentLocationInfo = (book) => {
  const [currentTitle, setCurrentTitle] = useState('');
  const [currentRealHref, setCurrentRealHref] = useState('');
  const hrefTitleMap = useRef<any>({});
  const hrefRealhrefMap = useRef<any>({});
  const initMap = (_book: Book) => {
    const tmpMap: any = {};
    _book.navigation.toc.forEach((nav) =>
      Object.assign(tmpMap, {
        [nav.href]: nav.label.trim(),
      }),
    );
    let oldLable = '';
    let oldRealHref = '';
    _book.spine.items.forEach(
      (item: {
        canonical: string;
        cfiBase: string;
        href: string;
        idref: string;
        index: number;
        linear: string;
        next: Function;
        prev: Function;
      }) => {
        Object.assign(hrefTitleMap.current, {
          [item.href]: tmpMap[item.href] || oldLable,
        });
        oldLable = tmpMap[item.href] || oldLable;
        Object.assign(hrefRealhrefMap.current, {
          [item.href]: tmpMap[item.href]
            ? item.href && (oldRealHref = item.href)
            : oldRealHref,
        });
      },
    );
  };
  const getCurrentTitle = (href: string) => {
    const title = hrefTitleMap.current[href];
    !!title && setCurrentTitle(title);
  };
  const getCurrentRealHref = (href: string) => {
    const title = hrefRealhrefMap.current[href];
    !!title && setCurrentRealHref(title);
  };

  useEffect(() => {
    if (!!book?.rendition) {
      book.rendition.on('locationChanged', (props: any) => {
        // 翻页查找当前标题
        getCurrentTitle(props.href);
        getCurrentRealHref(props.href);
      });
    }
  }, [book?.rendition]);

  useEffect(() => {
    if (!!book?.spine?.items) {
      initMap(book);
    }
  }, [book?.spine?.items]);

  return {
    currentTitle,
    currentRealHref,
  };
};

export default useCurrentLocationInfo;
