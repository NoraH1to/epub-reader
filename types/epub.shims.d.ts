import { BookOptions } from 'epubjs/types/book';
import Section from 'epubjs/types/section';

declare module 'epubjs' {
  export default function (
    url: string | ArrayBuffer,
    options?: BookOptions,
  ): Book;
  export class Book {
    Input: ArrayBuffer | string | File;
    open(input: Book['Input'], what?: string): Promise<object>;
  }
  export class Locations {
    generate(): Promise<Array<string>>;
  }
  export class Rendition {
    display(target?: string): Promise<Section>;
    display(target?: number): Promise<Section>;
  }
}
