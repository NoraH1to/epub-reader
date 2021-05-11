import { useEffect, useMemo, useRef, useState } from 'react';
import ePub, { Book } from 'epubjs';
import Navigation from 'epubjs/types/navigation';
import Section from 'epubjs/types/section';
import { UseEpub } from 'types/typings';
import memoizeOne from 'memoize-one';

const useEpub: UseEpub = ({ elId, file, options }) => {
  const [book, setBook] = useState(ePub());
  const [navigation, setNavigation] = useState<Navigation>(book.navigation);
  const [loading, setLoading] = useState(false);
  const [currentTitle, setCurrentTitle] = useState('');
  const getCurrentTitle = memoizeOne((href: string, book: Book) => {
    if (href && book.navigation) {
      const title = book.navigation.toc.find((nav) => nav.href === href)?.label;
      !!title && setCurrentTitle(title);
      return title;
    }
  });
  const loadEpub = () => {
    if (!!file) {
      setLoading(true);
      book.rendition?.destroy();
      book.destroy();
      const _book = ePub();
      _book.open(file);
      _book.ready
        .then(() => {
          return _book.locations.generate();
        })
        .then(() => {
          _book.renderTo(elId, options);
          _book.rendition.on('locationChanged', (props: any) =>
            // 翻页查找当前标题，该方法有做缓存
            getCurrentTitle(props.href, _book),
          );
          return _book.rendition.display();
        })
        .then((section: Section) => {
          setNavigation(_book.navigation);
          setBook(_book);
          console.log('ready');
        })
        .finally(() => setLoading(false));
    }
  };
  useEffect(() => {
    if (elId && file && options) {
      loadEpub();
      console.log('loadfile', file);
    }
  }, [file, elId, ...Object.values(options)]);
  return { book, navigation, loading, setLoading, currentTitle };
};

export default useEpub;
