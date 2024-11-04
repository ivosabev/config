import '@total-typescript/ts-reset';
import '@total-typescript/ts-reset/dom';

import 'react';

declare module 'react' {
  // support css variables
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}
declare module '*.css' {
  const styles: {[className: string]: string};
  export default styles;
}
declare module '*.svg' {
  import type * as React from 'react';
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & {title?: string}>;
}
