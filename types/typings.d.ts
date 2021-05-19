import { Theme, ThemeOptions } from '@material-ui/core';
import { Actions } from 'ahooks/lib/useBoolean';
import { Book } from 'epubjs';
import Navigation from 'epubjs/types/navigation';
import { FC, ReactElement } from 'react';

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
    minSpreadWidth?: number;
  };
  theme?: any;
}
interface UseEpubReturn {
  book: Book;
  navigation: Navigation;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
interface UseEpub {
  (props: UseEpubProps): UseEpubReturn;
}

type UseCurrentLocationInfoProps = Book | undefined;

interface UseCurrentLocationInfoReturn {
  currentTitle: string;
  currentRealHref: string;
}
interface UseCurrentLocationInfo {
  (props: UseCurrentLocationInfoProps): UseCurrentLocationInfoReturn;
}

interface UseActionsReturn {
  actions: {
    next: () => void;
    prev: () => void;
    goto: (path: string) => void;
  };
}
interface UseActions {
  (book: Book): UseActionsReturn;
}

interface UseReaderEventProps {
  book: Book;
  actions: UseActionsReturn['actions'];
  drawerVisibleActions?: Actions;
  domRef: React.RefObject<HTMLDivElement>;
}
interface UseReaderEvent {
  (props: UseReaderEventProps): void;
}

type UseChildrenProps = { Children: FC<any> | ReactElement; Compnent: FC<any> };
interface UseChildren {
  ({ Children, Compnent }: UseChildrenProps): FC<any>;
}

type EpubOpenFC = FC<{
  useBook: (file: Book['Input']) => void;
}>;
type EpubSheetFC = FC<{
  visible: boolean;
  onChange(value: boolean): void;
}>;
type EpubReaderFC = FC<{
  OpenEpubComponent: EpubOpenFC;
  SheetComponent: EpubSheetFC;
  file?: Book['Input'];
}>;
type TabPanelFC = FC<{ value: any }>;
interface TabData {
  label?: string;
  value: any;
  Panel: FC<any>;
  icon?: ReactElement;
}
type EpubReaderStatusBarFC = FC<{
  title: string;
}>;

interface ReaderContextContent {
  book?: Book;
  actions?: {
    next: () => void;
    prev: () => void;
    goto: (path: string) => void;
  };
  closeDrawer?: Function;
}
interface ThemeContextContent {
  currentTheme?: GlobalTheme;
  setCurrentTheme?: React.Dispatch<React.SetStateAction<GlobalTheme>>;
}

interface GlobalTheme {
  name: string;
  label: string;
  className?: string;
  mduiConfig: ThemeOptions;
  mdui: Theme;
  epub?: any;
}
