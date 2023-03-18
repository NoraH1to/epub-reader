import { Actions } from 'ahooks/lib/useBoolean';
import { Book } from 'epubjs';
import { createContext } from 'react';

export interface ReaderContextContent {
  book?: Book;
  actions?: {
    next: () => void;
    prev: () => void;
    goto: (path: string) => void;
  };
  drawerVisibleActions?: Actions;
}

export const ReaderContext = createContext<ReaderContextContent>({});
