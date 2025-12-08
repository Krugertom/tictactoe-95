import React from 'react';
import ReactDOM from 'react-dom/client';
import isPropValid from '@emotion/is-prop-valid';
import {
  StyleSheetManager,
  createGlobalStyle,
  type ShouldForwardProp,
  ThemeProvider,
} from 'styled-components';
import { styleReset } from 'react95';
import original from 'react95/dist/themes/original';
import { App } from '@/App';
import { ensureReact95FontsLoaded } from '@/styles/fonts';

// Followed mostly from REACT95 Startup Guide - {https://www.npmjs.com/package/react95}
const GlobalStyles = createGlobalStyle`
  ${styleReset}

  *, *::before, *::after {
    box-sizing: border-box;
  }

  body, input, select, textarea {
    font-family: 'ms_sans_serif', Arial, sans-serif;
  }

  body {
    min-height: 100vh;
    margin: 0;
    background: ${({ theme }) => theme.desktopBackground};
    color: #000;
  }

  #root {
    height: 100vh;
  }
`;

// LLM NOTE: Had clade help me write this helper function to detail with difficulties with react95 package
// helper function created to filter style-only props from react95 components so they don't end up on DOM nodes.
const shouldForwardProp: ShouldForwardProp<'web'> = (prop, elementToBeStyled) =>
  typeof elementToBeStyled === 'string' ? isPropValid(prop) : true;
void ensureReact95FontsLoaded();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <ThemeProvider theme={original}>
        <GlobalStyles />
        <App />
      </ThemeProvider>
    </StyleSheetManager>
  </React.StrictMode>,
);
