import { Book } from 'epubjs';
import Navigation from 'epubjs/types/navigation';
import { FC } from 'react';

declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}

interface UseEpubProps {
  elId: string;
  file: Book['Input'] | null;
  options: {
    flow?: 'paginated' | 'scrolled-doc' | 'auto';
    width?: string | number;
    height?: string | number;
    snap?: boolean;
    manager?: 'continuous' | any;
  };
}
interface UseEpubReturn {
  book: Book;
  navigation: Navigation;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  currentTitle: string;
}
interface UseEpub {
  (props: UseEpubProps): UseEpubReturn;
}
type EpubOpenFC = FC<{
  useBook: (file: Book['Input']) => void;
}>;
type EpubReaderFC = FC<{ OpenEpubComponent: EpubOpenFC }>;
type EpubActionTabPanelFC = FC<{ value: any }>;
interface EpubActionTabData {
  label: string;
  value: any;
  Panel: FC<any>;
  icon?: any;
}
interface ReaderContextContent {
  book?: Book;
  actions?: {
    next: () => void;
    prev: () => void;
    goto: (path: string) => void;
  };
  navigation?: Navigation;
  closeDrawer?: Function;
}
