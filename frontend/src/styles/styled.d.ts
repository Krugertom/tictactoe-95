import 'styled-components';
import type { Theme } from 'react95/dist/themes/types';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
