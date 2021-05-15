import { useEffect, useState } from 'react';
import ePub from 'epubjs';
import Navigation from 'epubjs/types/navigation';
import Section from 'epubjs/types/section';
import { UseEpub } from 'types/typings';
import { useUpdateEffect } from 'ahooks';

const useEpub: UseEpub = ({ elId, file, options, theme }) => {
  const [book, setBook] = useState(ePub());
  const [navigation, setNavigation] = useState<Navigation>(book.navigation);
  const [loading, setLoading] = useState(false);
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
          theme && _book.rendition.themes.default(theme);
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
  useUpdateEffect(() => {
    if (elId && file && options) {
      book.rendition.themes.default(theme);
      book.rendition.clear();
      book.rendition.display(book.rendition.location.start.href);
    }
  }, [theme]);
  return { book, navigation, loading, setLoading };
};

export default useEpub;
